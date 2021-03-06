module.exports = async function($) {

  await $.validate({
    query: {
      id: {
        required: true,
        is: 'id',
      },
      values: {
          task: {
            required: true,
            min: 2
        }
      }
    }
  })

  const { query = {}, values = {} } = $.params

  return await $.db('todo').update(query, values)
}