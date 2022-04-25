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
    return `<li>
    ${todo.task}
    <button id="delbtn" onclick="deleteTodo(this)" data-id="${todo.id}"><i class="fa fa-trash"></i></button></button><button id="updbtn" onclick="updateTodo(this)" data-id="${todo.id}"><i class="fa fa-edit"></i></button>
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
   <fieldset>
   <h1>Todo app</h1>
    <div class="createtodo">
      <form onsubmit="return false">
        <label for="task">Task</label>
        <div class="flex">
          <input id="task" type="text" maxlength="150" placeholder="Add a new task here..." name="task">
          <button onclick="handleSubmit(this)">Save</button>
        </div>
        <em class="task-errors"></em>
      </form>
    </div>
    <div class="todolist">
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