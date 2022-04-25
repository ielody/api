module.exports = async function($) {

  await $.validate({
    query: {
      id: {
        required: true,
        is: 'id',
      }
    }
  })

  const { query = {}, values = {} } = $.params

  return await $.db('todo').update(query, values)
}