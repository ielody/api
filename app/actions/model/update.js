module.exports = async function($) {

  const { query = {}, values = {} } = $.params

  return await $.db('model').update(query, values)
}