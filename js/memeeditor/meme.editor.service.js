
var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['president', 'angry']},
             {id: 2, url: 'img/2.jpg', keywords: ['cute', 'puppy']},
             {id: 3, url: 'img/3.jpg', keywords: ['cute', 'baby', 'puppy']},
             {id: 4, url: 'img/4.jpg', keywords: ['cute', 'cat']},
             {id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby']},
             {id: 6, url: 'img/6.jpg', keywords: ['funny']},
             {id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby']},
             {id: 8, url: 'img/8.jpg', keywords: ['funny']},
             {id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby']},
             {id: 10, url: 'img/10.jpg', keywords: ['funny', 'president']},
             {id: 11, url: 'img/11.jpg', keywords: ['funny']},
             {id: 12, url: 'img/12.jpg', keywords: ['funny']},
             {id: 13, url: 'img/13.jpg', keywords: ['funny', 'happy']},
             {id: 14, url: 'img/14.jpg', keywords: ['funny', 'movie']},
             {id: 15, url: 'img/15.jpg', keywords: ['funny', 'movie']},
             {id: 16, url: 'img/16.jpg', keywords: ['funny', 'movie']},
             {id: 17, url: 'img/17.jpg', keywords: ['funny', 'president']},
             {id: 18, url: 'img/18.jpg', keywords: ['funny', 'movie']},]

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [],
}

var gImgUrl

var gMemes=[]

var gIsLoaded=false

var gKeywordSearchCountMap = {'funny': 0,'animal': 0, 'bad': 0,
    'awkward': 0,'happy': 0, 'sad': 0}

function updateKeywordSearchMapCount(value){
    gKeywordSearchCountMap[value]++
}

function giveKeywordSearchValue(value){
    return gKeywordSearchCountMap[value]
}

function selectMemeToEdit(picture){
    const str=picture.src.split('/')
    gMeme.selectedImgId=str[3]+'/'+str[4]
    gMeme.selectedLineIdx=0
}

function getLines(){
    if(gMeme.meme!==undefined){
        if(gIsLoaded=false){
            document.querySelector('.text_input').value=gMeme.meme.lines[0].txt
            gIsLoaded=true
        }
        return gMeme.meme.lines
    } else {
        return gMeme.lines
    }
}

function addLineToMeme(txt='',size=16,color='white'){
    if(gMeme.lines===undefined){
        gMeme.lines=[]
    }
    gMeme.lines.push({txt:txt,size:size,color:color})
}

function setLineColor(lineIdx,color){
    if(gMeme.meme!==undefined){
        return gMeme.meme.lines[lineIdx-1].color=color
    } else {
        gMeme.lines[lineIdx-1].color=color
    }
}

function addToMemes(){
    gImgUrl=getImgUrl()
    var meme={...gMeme}
    gMemes.push({meme,url:gImgUrl})
    storeMemes()
    addToGallery()
}

function loadAllToGallery(){
    const gMemes=takeoutMemesFromStorage()
    if(gMemes.length===0)return
    var image
    var elMemeGallery=document.querySelector('.edited_memes')
    for(var i=0;i<gMemes.length;i++){
    image=document.createElement('img')
    image.classList.add(`tester`)
    image.classList.add(`tester${gMemes.length}`)
    image.addEventListener("click",loadPreviouslyDoneMeme)
    image.src=gMemes[i].url
    elMemeGallery.appendChild(image)
    }
}

function addToGallery(){
    var image=document.createElement('img')
    image.classList.add(`tester`)
    image.classList.add(`tester${gMemes.length}`)
    image.addEventListener("click",loadPreviouslyDoneMeme)
    image.src=gImgUrl
    var elMemeGallery=document.querySelector('.edited_memes')
    elMemeGallery.appendChild(image)
}

function loadPreviouslyDoneMeme(event){
    gIsMemeFromGlobal=true
    const memeCount=event.target.classList[1].slice(6)
    console.log(event.target)
    gMeme=gMemes[memeCount-1]
    if(gMeme.lines===undefined){
        gCreatedLinesCount=0
    } else {
        gCreatedLinesCount=gMeme.lines.length
    }
    var image=document.createElement('img')
    image.src=gMeme.meme.selectedImgId
    gChosenMeme=image
    gTxtDirection='left'
    console.log('entering memes editor')
    document.querySelector('.meme_editor_btn').classList.add('selected')
    document.querySelector('.meme_editor').style.display='block'
    gIsMemesEditorChosen=true
    document.querySelector('.gallery_btn').classList.remove('selected')
    document.querySelector('.gallery').style.display='none'
    gIsGalleryChosen=false
    document.querySelector('.saved_memes_btn').classList.remove('selected')
    document.querySelector('.edited_memes').style.display='none'
    gIsEditedMemesChosen=false
    renderMemeFromGallery()
}

function getMemes(){
    return gMemes
}

function downloadMeme(elLink){
    renderLinesWithoutLining()
    gElCanvas=document.getElementById('canvas')
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function uploadMeme() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') 

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

