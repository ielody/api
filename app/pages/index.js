module.exports = async function($) {
  $.page.title = 'Create incredible web apps'

  return /* html */`
    <form onsubmit="return false">
      <label for="title">Title</label>
      <input id="title" type="text" name="title">
      <em class="error-title"></em>
      <button onclick="handleSubmit(this)">Save</button>
    </form>

    <script>
    // Set up the Waveorb client
    var api = waveorb('https://waveorb.com/api')

    // Define your submit function
    function handleSubmit(btn) {
    // Using the Haka form serializer to gather the data
    var values = serialize(btn.form)

    // Send the data to the action
    var result = await api({ action: 'project/create', values })
    if (result.error) {
    // Join all the errors and display under the right input
        Object.keys(result.values).forEach(function(key) {
        text(`.error-${key}`, result.values[key].join(', '))
      })
      } else {
    // Redirect to project list
        window.location = '/projects'
      }
    }
    </script>
  `
}