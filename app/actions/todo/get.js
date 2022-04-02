module.exports = async function($) {

  const { query = {}, fields = {} } = $.params

  return await $.db('todo').get(query)
}