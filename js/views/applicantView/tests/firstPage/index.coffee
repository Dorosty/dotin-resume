component = require '../../../../utils/component'
style = require './style'

module.exports = component 'applicantTestsFirstPage', ({dom, events}, gotoTest) ->
  {E, setStyle} = dom
  {onEvent} = events

  items = [
    'MBTI یک مقیاس است نه یک امتحان'
    'انتخاب از بین گزینه‌ها تحمیلی است و یکی را می‌بایست انتخاب کنید'
    'هیچ جواب درست یا غلطی وجود ندارد'
    'حدود 20 تا 40 دقیقه زمان می‌برد'
    'پاسخ‌های شما به سؤالات محرمانه است و به جز سنخ شخصیتی کلی، سایر اطلاعات در دسترس هیچ فرد دیگری قرار نخواهد‌گرفت'
    'MBTI فقط رفتارهای معمولی و به هنجار را می‌سنجد و ربطی به سلامت روان یا بیماریابی ندارد'
    'هیچ سنخ شخصیتی خوب یا بدی وجود ندارد و هر یک از سنخ‌ها نقاط قوت طبیعی، نقاط ضعف یا نقاط مبهم خود را دارند'
    'هنگام پاسخ دادن به سؤالات به این مسئله فکر کنید که در هر یک از موارد در شرایطی که فشاری بر روی شما نیست کدام یک را ترجیح می‌دهید'
    'به خودتان فکر کنید، آن هم خارج از نقشهای شغلی یا خانوادگی‌ای که به عهده دارید. به این صورت که معمولا کدام پاسخ یا عمل به شما نزدیک‌تر است؟ یا این که کدام پاسخ توصیف نزدیک‌تری از اعمال و احساسات شما به دست می‌دهد؟'
    'اولین پاسخی که به ذهن شما می‌رسد، درست‌ترین است. سعی کنید برای پاسخ دادن سؤال را تحلیل نکنید'
  ]

  view = E style.view,
    items.map (itemText) ->
      E style.item,
        E style.bullet
        E style.itemText, itemText
    enterButton = E style.enterButton, 'شروع آزمون'

  onEvent enterButton, 'mousemove', ->
    setStyle enterButton, style.enterButtonHover
  onEvent enterButton, 'mouseout', ->
    setStyle enterButton, style.enterButton

  onEvent enterButton, 'click', gotoTest

  view