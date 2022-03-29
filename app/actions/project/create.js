module.exports = async function($) {
  await $.validate({
    values: {
      title: {
        required: true
      }
    }
  })
  return { status: 'OK' }
}
