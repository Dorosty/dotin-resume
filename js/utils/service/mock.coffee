Q = require '../../q'

applications = [{
  id: 0
  firstName: 'علی'
  lastName: 'درستی'
  phoneNumber: '09121234567'
  email: 'dorosty@doin.ir'
  birthday: '1340/1/2'
  jobs: 'Java developer - Javascript developer'
  resumeUrl: ''
  picture: null
  createdAt: 1473132854116
  notes: []
  state: 0
}, {
  id: 1
  firstName: 'سعید'
  lastName: 'قیومیه'
  phoneNumber: '09121234567'
  email: 'ghayoomi@dotin.ir'
  birthday: '1343/4/5'
  jobs: 'UX designer'
  resumeUrl: ''
  picture: null
  createdAt: 1373132854116
  notes: ['aaaaaaaaaaaa']
  state: 1
}]

user =
  picture: 'assets/img/profile.jpg'
  name: 'حامد حسینی‌نژاد'
  type: 'hr'

# user = undefined

exports.ping = ->
  Q {applications}

exports.getUser = ->
  Q {user}

exports.login = ({email}) ->
  Q.delay 1000 + 2000 * Math.floor Math.random()
  .then ->
    switch email
      when 'hosseininejad@dotin.ir'
        user: user =
          name: 'حامد حسینی‌نژاد'
          type: 'hr'
        applications: applications
      when 'mohammadkhani@dotin.ir'
        user: user =
          name: 'روح‌الله محمد‌خانی'
          type: 'manager'
        applications: applications
      when 'dorosty@dotin.ir'
        user: user =
          name: 'علی درستی'
          type: 'applicant'
      else
        throw 'invalid'

exports.logout = ({email, password}) ->
  Q.delay 1000 + 2000 * Math.floor Math.random()
  .then -> loggedOut: true

exports.addJob = ->
  Q.delay 1000 + 2000 * Math.floor Math.random()
  .then -> {}