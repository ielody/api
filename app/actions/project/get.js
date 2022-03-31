module.exports = async function($) {

  const { query = {}, fields = {} } = $.params

  return await $.db('project').get(query)
}