module.exports = async function($) {

  const { query = {}, values = {} } = $.params

  return await $.db('project').update(query, values)
}