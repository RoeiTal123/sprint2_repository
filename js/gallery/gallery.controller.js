
function onSort(that){
    updateKeywordSearchMapCount(that.innerText)
    const elBtn=document.querySelector(`.${that.classList[1]}`)
    var valueCount=giveKeywordSearchValue(that.innerText)
    if(elBtn.style.fontSize==='35px') return
    elBtn.style.fontSize=(15+valueCount)+'px'
}

function onChosenTemplate(picture){
    gIsMemeFromGlobal=false
    var arr=picture.src.split('/')
    setMemeId(arr[3]+'/'+arr[4])
    setChosenMeme(picture)
    gIsaMemeChosen=true
    onToMemeEditor()
    onInit2()
}
