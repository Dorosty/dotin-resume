# return

Q = require '../../q'

applicants = [{
  userId: 0
  firstName: 'علی'
  lastName: 'درستی'
  phoneNumber: '09121234567'
  email: 'dorosty@doin.ir'
  birthday: '1340/1/2'
  selectedJobsString: 'Java developer - Javascript developer'
  resume: null
  personalPic: null
  modificationTime: 1473132854116
  createdAt: 1473132854116
  notes: []
  state: 0
}, {
  userId: 1
  firstName: 'سعید'
  lastName: 'قیومیه'
  phoneNumber: '09121234567'
  email: 'ghayoomi@dotin.ir'
  birthday: '1343/4/5'
  selectedJobsString: 'UX designer'
  resume: null
  personalPic: null
  modificationTime: 1373132854116
  createdAt: 1373132854116
  notes: ['aaaaaaaaaaaa']
  state: 1
}]

user =
  personalPic: null
  name: 'حامد حسینی‌نژاد'
  userType: 2

# user = undefined

exports.ping = ->
  Q {user, applicants}

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
        applicants: applicants
      when 'mohammadkhani@dotin.ir'
        user: user =
          name: 'روح‌الله محمد‌خانی'
          type: 'manager'
        applicants: applicants
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