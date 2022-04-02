module.exports = async function($) {

  const { query = {} } = $.params

  return await $.db('project').create(query)
}

