const { find } = require("waveorb/lib/functions")

module.exports = async function($) {
  $.page.title = 'Organize your life with this todo list'

  // Define your submit function
  async function handleSubmit(btn) {
    // Using the Haka form serializer to gather the data
    var values = serialize(btn.form)
    console.log(values)

    // Send the data to the action
    var result = await api({
      action: 'todo/create',
      values
    })
    console.log(result)
    if (!showErrors(result)) {
      cookie('flash', 'Todo created')
      // Redirect to project list
      window.location = '/'
    }
  }

  async function renderTodos() {
    var todos = await api({
      action: 'todo/find'
    })
    console.log(todos)

    var list = `<ul>${todos.map(todo => `<li>${todo.task}</li>`).join('')}</ul>`
    html('.todolist', list)
  }

  return /* html */`
    <h1>Todo app</h1>
    <div class="createtodo"
      <form onsubmit="return false">
        <label for="task">Task</label>
        <div class="flex">
          <input id="task" type="text" name="task">
          <button onclick="handleSubmit(this)">Save</button>
        </div>
        <em class="task-errors"></em>
      </form>
    </div>
    <div class="todolist">

    </div>
    <script>
      ${renderTodos}
      ${handleSubmit}
      renderTodos()
    </script>
  `
}