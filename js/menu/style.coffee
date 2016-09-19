{extend} = require '../utils'

exports.menu =
  backgroundColor: '#FFF8E6'

exports.cover =
  backgroundColor: 'white'
  zIndex: 1000
  position: 'absolute'
  top: 0
  left: 0
  right: 0
  bottom: 0
  # transition: '0.5s'
  visibility: 'hidden'
  opacity: 0

exports.logo =
  href: 'Home'
  textDecoration: 'none'
  color: '#1D7453'
  fontSize: 14
  position: 'relative'
  top: 10
  right: 10

exports.logoImg =
  src: 'img/logo.png'
  position: 'relative'
  bottom: 2

exports.en =
  href: 'en.dotin.ir'
  textDecoration: 'none'
  position: 'absolute'
  color: '#78C19D'
  top: 5
  left: 100

exports.contact =
  href: '#'
  textDecoration: 'none'
  position: 'absolute'
  color: '#78C19D'
  top: 5
  left: 10

exports.login = exports.logout =
  cursor: 'pointer'
  textDecoration: 'none'
  position: 'absolute'
  color: '#78C19D'
  top: 30
  left: 10

exports.username =
  position: 'absolute'
  color: '#636363'
  top: 30
  left: 100

exports.links =
  position: 'absolute'

exports.link =
  textDecoration: 'none'
  display: 'inline-block'
  padding: '0 20px'
  height: 63
  lineHeight: 63
  color: '#636363'
  fontSize: 14
  fontWeight: 'bold'
  borderTop: '2px solid #FFF8E6'
  transition: '0.5s'

exports.linkHover = extend {}, exports.link,
  color: '#78C19D'
  borderTop: '2px solid #78C19D'

# width dependent

exports.menu = extend exports.menu,
  height: 65

# exports.logo = extend exports.logo,
#   top: 0

exports.links = extend exports.links,
  display: 'block'
  top: 0
  right: 350