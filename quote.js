module.exports = async function($) {
  $.page.title = 'Quote break'
  $.page.description = 'Enjoy a quote with your morning coffee'

  async function loadQuotes() {
    const endpoint = 'https://type.fit/api/quotes'
    try {
      const response = await fetch(endpoint)
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const json = await response.json()
      console.log(json)
      quotes = json
    } catch (err) {
      console.log(err)
      alert('Failed to fetch new quote')
    }
  }

  function renderQuote() {
    while(!quote || typeof quote.text != {}) //boolean
    var index = Math.floor(Math.random()) * (quotes.length())
    var quote = quotes[index - 1]

    html('#quote', /*html */`
      <b>${quote.text}</b><br>-<i>${quote.author || 'Anonymous'}</i>
      `)
    }

  return /* html */`
    <q id="quote"></q>
    <button type="button" id="js-new-quote" class="new-quote button" onclick="renderQuote()">Generate a new quote</button>

    <script>
      var quotes = []

      ${loadQuotes}
      ${renderQuote}
      loadQuotes()
    </script>
  `
}