module.exports = async function($) {

  const { values = {} } = $.params

  return await $.db('model').create(values)
}