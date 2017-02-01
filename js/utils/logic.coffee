exports.passwordIsValid = (password) -> password.length >= 6

exports.statuses = [
  'ثبت شده'
  'درخواست مصاحبه تلفنی'
  'در انتظار مصاحبه تلفنی'
  'مکالمه تلفنی انجام شد'
  'درخواست مصاحبه عمومی'
  'درخواست مصاحبه فنی'
  'در انتظار تکمیل اطلاعات'
  'در انتظار مصاحبه فنی'
  'در انتظار مصاحبه عمومی'
  'جذب'
  'بایگانی'
]

exports.actionToText = (action) ->
  return 'to be implemented'
  switch action
    when 0
      'درخواست مصاحبه فنی'
    when 1
      'تغییر وضعیت به مصاحبه فنی'

exports.actionModifiable = (action) ->
  return true
  switch action
    when 0
      true
    when 1
      false