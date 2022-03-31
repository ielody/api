module.exports = async function($) {
  $.page.title = 'Create incredible web apps'

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
    <form onsubmit="return false">
      <label for="title">Title</label>
      <input id="title" type="text" name="title">
      <em class="title-errors"></em>
      <button onclick="handleSubmit(this)">Save</button>
    </form>
    <script>
      ${handleSubmit}
    </script>
  `
}