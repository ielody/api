const { input } = require("extras")
const { find } = require("waveorb/lib/functions")

module.exports = async function($) {
  $.page.title = 'Organize your life with this todo list'

  // Define your submit function
  async function handleSubmit(btn) {
    // Using the Haka form serializer to gather the data
    const values = serialize(btn.form)
    console.log(values)

    // Send the data to the action
    const result = await api({
      action: 'todo/create',
      values
    })
    console.log(result)
    if (!showErrors(result)) {
      cookie('flash', 'Todo was added to list')
      // Redirect to project list
      window.location = '/'
    }
  }

  function renderTodo(todo) {
    return `<li><div class="square"></div>
    ${todo.task}
    <button id="delbtn" onclick="deleteTodo(this)" data-id="${todo.id}"><i class="fa fa-trash"></i></button></button><button id="updbtn" onclick="updateTodo(this)" data-id="${todo.id}"><i class="fa fa-edit"></div></i></button>
    <div class="checkboxdone">
      <form onsubmit="return false">
        <label for="checkbox">Weekly challenge:</label>
        <br>

     <input type="checkbox" id="monday" name="weekday" value="monday">
     <label for="monday">M</label>

     <input type="checkbox" id="tuesday" name="weekday" value="tuesday">
     <label for="tuesday">T</label>

     <input type="checkbox" id="wednesday" name="weekday" value="wednesday">
     <label for="wednesday">W</label>

     <input type="checkbox" id="thursday" name="weekday" value="thursday">
     <label for="thursday">T</label>

     <input type="checkbox" id="friday" name="weekday" value="friday">
     <label for="friday">F</label>

     <input type="checkbox" id="saturday" name="weekday" value="saturday">
     <label for="saturday">S</label>

     <input type="checkbox" id="sunday" name="weekday" value="sunday">
     <label for="sunday">S</label>
    </li>`
  }


  async function renderTodos() {
    const todos = await api({
      action: 'todo/find'
    })
    console.log(todos)

    const list = `<ul>${todos.map(renderTodo).join('')}</ul>`
    html('.todolist', list)
  }

  async function deleteTodo(btn) {
    if (confirm('Are you sure you want to delete the todo?')) {
      const id = btn.getAttribute('data-id')
      const result = await api({
        action: 'todo/delete',
        query: {
          id
        }
      })
      console.log(result)

      if(!showErrors(result)) {
        cookie('flash', 'Todo was deleted from list')
        window.location = '/'
      }
    }
  }

  async function deleteTodos() {
    const todo = await api({
      action: 'todo/find'
    })
    const result = await api({
      action: 'todo/delete',
      query: {
        id: todo.id
      }
    })
    console.log(result)

    if(!showErrors(result)) {
      cookie('flash', 'Todo was deleted from list')
      window.location = '/'
    }
  }

  async function updateTodo(btn) {
    const message = prompt('What do you want replace your todo with?')
    const id = btn.getAttribute('data-id')
    const updated = await api({
      action: 'todo/update',
      query: {
        id
      },
      values: {
       task: message
      }
    })

    if (!showErrors(updated)) {
      cookie('flash', 'Todo was updated')
      window.location = '/'
    }
  }

  async function updateTodos() {
    const todos = await api({
      action: 'todo/find'
    })
    const updated = await api({
      action: 'todo/update',
      query: {
        id: todo.id
      },
      values: {
       task: message
      }
    })

    const result = `<ul>${message}${todos.map(updateTodo).join('')}</ul>`
    html('.todolist', result)

    if (!showErrors(updated)) {
    cookie('flash', 'Todo was updated')
    window.location = '/'
    }
  }


  return /* html */`
  <style>

  </style>

  <fieldset>
   <h1>Todo list</h1>
    <div class="createtodo">
      <form onsubmit="return false">
        <label for="task"></label>
        <div class="flex">
          <input id="task" type="text" maxlength="150" placeholder="Add a new task here..." name="task">
          <button onclick="handleSubmit(this)">Save</button>
        </div>
        <em class="task-errors"></em>
      </form>
    </div>
    <div class="todolist">
    </div>
    </div>
  </fieldset>


    <script>
      ${renderTodo}
      ${renderTodos}
      ${handleSubmit}
      ${deleteTodo}
      ${deleteTodos}
      ${updateTodo}
      ${updateTodos}
      renderTodos()

    </script>
  `
}