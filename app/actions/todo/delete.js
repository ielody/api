module.exports = async function($) {

  await $.validate({
    query: {
      id: {
        required: true,
        is: 'id',
      }
    }
  })

  const { query } = $.params

  return await $.db('todo').delete( { id: query.id } )
}
