Q = require './q'
service = require './utils/service'
page = require './page'
{addPageCSS, addPageStyle} = require './utils/dom'

Q.longStackSupport = true

addPageCSS 'font-awesome/css/font-awesome.css'
addPageCSS 'bootstrap.css'
addPageCSS 'bootstrap-rtl.css'

addPageStyle "
  @font-face {
    font-family: iransans;
    src:url('assets/fonts/eot/IRANSansWeb.eot') format('eot'),
        url('assets/fonts/eot/IRANSansWeb_Bold.eot') format('eot'),
        url('assets/fonts/ttf/IRANSansWeb.ttf') format('truetype'),
        url('assets/fonts/ttf/IRANSansWeb_Bold.ttf') format('truetype'),
        url('assets/fonts/woff/IRANSansWeb.woff') format('woff'),
        url('assets/fonts/woff/IRANSansWeb_Bold.woff') format('woff'),
        url('assets/fonts/woff2/IRANSansWeb.woff2') format('woff2'),
        url('assets/fonts/woff2/IRANSansWeb_Bold.woff2') format('woff2');
  }
  * {
    font-family: 'iransans', tahoma;
    direction: rtl;
  }
  .hidden {
    display: none;
  }

  input::selection {
    background: #ddd;
  }

  .alert {
    transition: all .15s linear;
    opacity: 0;
    visibility: hidden;
  }
  .alert.in {
    opacity: 1;
    visibility: visible;
  }
"

document.title = 'سامانه جذب داتین'

service.autoPing()

service.getUser()
.then ->
  page()