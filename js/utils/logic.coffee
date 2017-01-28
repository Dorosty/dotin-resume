exports.passwordIsValid = (password) -> password.length >= 6

exports.getApplicantStatus = ({applicantsHRStatus, applicantsManagerStatus, applicantData}) ->
  if applicantsHRStatus.length
    switch applicantsHRStatus[applicantsHRStatus.length - 1].status
      when -1
        'بایگانی'
      else
        if applicantData && applicantData.trim()
          try
            JSON.parse applicantData
            switch applicantsHRStatus[applicantsHRStatus.length - 1].status
              when 2
                'در انتظار مصاحبه تلفنی'
              when 7
                'در انتظار مصاحبه فنی'
              when 8
                'در انتظار مصاحبه عمومی'
          catch
            'در انتظار تکمیل اطلاعات'
        else
          'در انتظار تکمیل اطلاعات'
  else
    'ثبت شده'

exports.hrStatusToText = (status) ->
  switch status
    when 2
      'مصاحبه تلفنی'
    when 7
      'مصاحبه فنی'
    when 8
      'مصاحبه عمومی'
exports.textToHrStatus = (status) ->
  switch status
    when 'مصاحبه تلفنی'
      2
    when 'مصاحبه فنی'
      7
    when 'مصاحبه عمومی'
      8

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