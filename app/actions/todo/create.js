module.exports = async function($) {

  await $.validate({
    values: {
      task: {
        required: true,
        min: 2,
      }
    }
  })
  const { values = {} } = $.params

  return await $.db('todo').create(values)
}

