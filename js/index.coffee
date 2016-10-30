Q = require './q'
service = require './utils/service'
page = require './page'
alertMessages = require './alertMessages'
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
  .alert {
    padding: 0;
    margin-bottom: 0;
    height: 0;
    transition: all .15s linear
  }
  .alert.in {
    padding: 15px;
    margin-bottom: 20px;
    height: auto;
  }
"

document.title = 'سامانه جذب داتین'

alertMessages.do()

service.getUser()
service.autoPing()

page()