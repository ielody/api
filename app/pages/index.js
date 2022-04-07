const { find } = require("waveorb/lib/functions")

module.exports = async function($) {
  $.page.title = 'Organize your life with this todo list'

  // Define your submit function
  async function handleSubmit(btn) {
    // Using the Haka form serializer to gather the data
    let values = serialize(btn.form)
    console.log(values)

    // Send the data to the action
    let result = await api({
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

  async function renderTodos() {
    let todos = await api({
      action: 'todo/find'
    })
    console.log(todos)

    let list = `<ul>${todos.map(todo => `<li>${todo.task}</li>`).join('')}</ul>`
    html('.todolist', list)
  }

  async function deleteTodos() {
    let deleted = await api({
      action: 'todo/delete'
    })
    console.log(deleted)
    if(!showErrors(deleted)) {
      cookie('flash', 'Todo was deleted from list')
      window.location = '/'
    }
  }

  return /* html */`
    <h1>Todo app</h1>
    <div class="createtodo">
      <form onsubmit="return false">
        <label for="task">Task</label>
        <div class="flex">
          <input id="task" type="text" placeholder="Add a new task here..." name="task">
          <button onclick="handleSubmit(this)">Save</button>
        </div>
        <em class="task-errors"></em>
      </form>
    </div>
    <div class="todolist">
    </div>
      <div id="buttons">
        <button onclick="deleteTodos(this)">Delete</button>
      </div>
    <script>
      ${renderTodos}
      ${handleSubmit}
      ${deleteTodos}
      renderTodos()
    </script>
  `
}