module.exports = async function($) {
  $.page.title = 'Organize your life with this todo list'

  // Define your submit function
  async function handleSubmit(btn) {
    // Using the Haka form serializer to gather the data
    var values = serialize(btn.form)

    // Send the data to the action
    var result = await api({
      action: 'project/create',
      values
    })
    console.log(result)
    if (!showErrors(result)) {
      cookie('flash', 'Project created')
      // Redirect to project list
      window.location = '/'
    }
  }

  return /* html */`
    <h1>Todo app</h1>
    <div class="createtodo">
      <form onsubmit="return false">
        <label for="title">Todo app</label>
        <div class="flex">
          <input id="title" type="text" name="title">
          <button onclick="handleSubmit(this)">Save</button>
        </div>
        <em class="title-errors"></em>
      </form>
    </div>
    <div class="todolist">
      No todos found
    </div>
    <script>
      ${handleSubmit}
    </script>
  `
}