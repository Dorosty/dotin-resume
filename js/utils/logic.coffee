exports.passwordIsValid = (password) -> password.length >= 6

exports.statuses = [
  'ثبت شده'
  'درخواست مصاحبه تلفنی'
  'در انتظار مصاحبه تلفنی'
  'مصاحبه تلفنی انجام شد'
  'درخواست مصاحبه عمومی'
  'درخواست مصاحبه فنی'
  'در انتظار تکمیل اطلاعات برای مصاحبه فنی'
  'در انتظار تکمیل اطلاعات برای مصاحبه عمومی'
  'در انتظار مصاحبه فنی'
  'در انتظار مصاحبه عمومی'
  'مراحل اداری'
  'جذب'
  'بایگانی'
]

exports.actions = [1 .. 100].map -> 'to be implemented'

exports.actionModifiable = (action) ->
  return true
  switch action
    when 0
      true
    when 1
      false