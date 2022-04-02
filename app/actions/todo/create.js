module.exports = async function($) {

  const { values = {} } = $.params

  return await $.db('todo').create(values)
}

