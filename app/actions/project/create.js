module.exports = async function($) {
  await $.validate({
    values: {
      title: {
        required: true
      }
    }
  })
  const { values = {} } = $.params

  return await $.db('project').create(values)
}
