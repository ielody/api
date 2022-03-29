module.exports = async function($) {

  const { query = {} } = $.params

  return await $.db('model').delete(query)
}