exports.gets = [
  'getCaptcha'
  'getUser'
]

exports.posts = [
  'login'
  'addJob'
  'loadInterview'
  'loadApplicantHistory'
]

exports.cruds = [  
  {name: 'person', persianName: 'شخص'}
]

exports.others = [
  'logout'
  'submitProfileData'
  'changeHRStatus'
  'editHRStatus'
  'deleteHRStatus'
  'changeManagerStatus'
  'clearAllNotifications'
  'createMultipleHRStatus'
]

exports.states = [
  'user'
  'applicants'
  'notifications'
  'managers'
  'hrUsers'
  'jobs'
]