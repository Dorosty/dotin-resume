require './utils/mockService'
{addPageStyle} = require './utils/dom'
page = require './page'

window.onerror = ->
  document.body.innerText = document.body.innerHTML = JSON.stringify [].slice.call arguments
  document.body.style.background = 'red'

addPageStyle "
  * {
    direction: rtl;
    font-family: 'yekan', tahoma;
  }
  .hidden {
    display: none;
  }
"

page()