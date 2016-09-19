{addPageStyle} = require './utils/dom'
page = require './page'

window.onerror = ->
  document.body.innerText = document.body.innerHTML = JSON.stringify [].slice.call arguments
  document.body.style.background = 'red'

addPageStyle "
  @font-face {
    font-family: iransans;
    src:url('fonts/eot/IRANSansWeb.eot') format('eot'),
      url('fonts/eot/IRANSansWeb_Bold.eot') format('eot'),
      url('fonts/ttf/IRANSansWeb.ttf') format('truetype'),
      url('fonts/ttf/IRANSansWeb_Bold.ttf') format('truetype'),
      url('fonts/woff/IRANSansWeb.woff') format('woff'),
      url('fonts/woff/IRANSansWeb_Bold.woff') format('woff'),
      url('fonts/woff2/IRANSansWeb.woff2') format('woff2'),
      url('fonts/woff2/IRANSansWeb_Bold.woff2') format('woff2');
  }
  * {
    font-family: 'iransans', tahoma;
    direction: rtl;
  }
  .hidden {
    display: none;
  }
"

page()