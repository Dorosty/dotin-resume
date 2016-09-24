exports.emailIsValid = (email) -> /^.+@.+\..+$/.test email
exports.passwordIsValid = (password) -> password.length >= 6

exports.stateToPersian = (state) ->
  switch state
    when 0
      'ثبت شده'
    when 1
      'تایید اولیه توسط مدیر'
    when 2
      'مصاحبه تلفنی انجام شده'
    when 3
      'اطلاعات تکمیل شده'
    when 4
      'آزمون‌های شخصیت‌شناسی داده شده'
    when 5
      'مصاحبه فنی برگزار شده'
    when 6
      'کمیته جذب برگزار شده'
    when 7
      'جذب شده'
    when 8
      'بایگانی'