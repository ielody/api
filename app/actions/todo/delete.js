module.exports = async function($) {

  const { query = {} } = $.params

  return await $.db('todo').delete(query)
}