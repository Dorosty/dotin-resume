exports.passwordIsValid = (password) -> password.length >= 6

exports.getApplicantStatus = ({applicantsHRStatus, applicantData}) ->
  if applicantsHRStatus.length
    switch applicantsHRStatus[applicantsHRStatus.length - 1].status
      when -1
        'بایگانی'
      when 0
        if applicantData
          'اطلاعات تکمیل شده'
        else
          'در انتظار تکمیل اطلاعات'
      when 1
        'در انتظار مصاحبه تلفنی'
      when 2
        'در انتظار مصاحبه فنی'
      when 3
        'در انتظار مصاحبه عمومی'
      when 4
        'در انتظار تصمیم‌گیری'
      when 5
        'مراحل اداری '
      when 6
        'جذب شده'
  else
    'ثبت شده'