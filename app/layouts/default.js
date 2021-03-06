module.exports = async function($) {
  const host = process.env.NODE_ENV == 'production'
    ? 'https://waveorb.com/api'
    : 'http://localhost:5000'

  return /* html */`
    <!doctype html>
    <html lang="${$.lang}">
      <head>
        <meta http-equiv="content-type" content="text/html;charset=utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="description" content="Incredible waveorb app">
        <title>${$.page.title || '♥'} - Todo list app</title>
        <link rel="icon" type="image/png" href="/img/todo-favicon.png">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        ${$.script('/bundle.js')}
        ${$.style('/bundle.css')}
        <script>window.api = waveorb('${host}')</script>
        ${process.env.NODE_ENV == 'development' ? $.script('/js/dev.js') : ''}
      </head>
      <body>
        <script>
          toggleVisibility()
          setActiveLink()
        </script>
        <div id="flash"></div>
        <main>${$.page.content}</main>
        <script>flash()</script>
      </body>
    </html>
  `
}
