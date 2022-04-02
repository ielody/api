module.exports = async function($) {

  const { query = {}, values = {} } = $.params

  return await $.db('todo').update(query, values)
}