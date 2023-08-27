'use strict'

const gTrans={
    gallerybtn:{en:'GALLERY',he:'גלריה'},
    savedmemesbtn:{en:'SAVED MEMES',he:'מימים שמורים'},
    memeeditorbtn:{en:'MEME EDITOR',he:'עורך המימס'},

    search:{en:'search',he:'חפש'},
    funny:{en:'funny',he:'מצחיק'},
    animal:{en:'animal',he:'חיה'},
    bad:{en:'bad',he:'רע'},
    awkward:{en:'awkward',he:'מביך'},
    happy:{en:'happy',he:'שמח'},
    sad:{en:'sad',he:'עצוב'},
}

var gCurrLang='en'

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'
    let transTxt = transMap[gCurrLang]
    // If translation not found - use english
    if (!transTxt) transTxt = transMap.en
    return transTxt
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const transTxt = getTrans(transKey)
        // support placeholder 
        if (el.placeholder) el.placeholder = transTxt
        else el.innerText = transTxt
    })
}

function setLang(lang) {
    gCurrLang = lang
}

function getLang(){
    return gCurrLang
}

function flipDirection(){
    const els = document.querySelectorAll('.flip')
    if(gCurrLang==='en'){
        for(var i=0;i<els.length;i++){
            els[i].classList.remove('rtl')
        }
    } else {
        for(var i=0;i<els.length;i++){
            els[i].classList.add('rtl')
        }
    }
}