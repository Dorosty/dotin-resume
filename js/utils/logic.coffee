exports.passwordIsValid = (password) -> password.length >= 6

exports.getApplicantStatus = ({applicantsHRStatus, applicantData}) ->
  if applicantsHRStatus.length
    switch applicantsHRStatus[applicantsHRStatus.length - 1].status
      when -1
        'بایگانی'
      when 0
        if applicantData && applicantData.trim()
          try
            JSON.parse applicantData
            'اطلاعات تکمیل شده'
          catch
            'در انتظار تکمیل اطلاعات'
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

exports.actionToText = (action) ->
  #############################################
  switch action
    when 0
      'درخواست مصاحبه فنی'
    when 1
      'تغییر وضعیت به مصاحبه فنی'

exports.actionModifiable = (action) ->
  switch action
    when 0
      true
    when 1
      false