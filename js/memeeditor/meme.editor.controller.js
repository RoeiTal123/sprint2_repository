let gElCanvas
let gCtx
var gChosenMeme
var gCreatedLinesCount=0
var gChosenLine=1
var gTxtDirection
var gFonts=[]
var gIsMemeFromGlobal=false

function onInit2(){
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  document.querySelector('.text_input').value=''
  gCreatedLinesCount=1
  gChosenLine=1
  const fontColor=document.querySelector('.text_color').value
  addLineToMeme('',16,fontColor)
  if(getLang()==='en'){
    gTxtDirection='left'
  } else {
    gTxtDirection='right'
  }
  renderMeme()
  renderLining()
}

function renderMeme(){
    gCtx.drawImage(gChosenMeme, 0, 0, canvas.width, canvas.height)
}

function renderLining(){
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'cyan'
    if(gChosenLine===1){
        gCtx.strokeRect(20, 20, 260, 20)
    }
    if(gChosenLine===2){
        gCtx.strokeRect(20, 260, 260, 20)
    }
    if(gChosenLine===3){
        gCtx.strokeRect(20, 140, 260, 20)
    }
}

function renderLines(text){
    renderMeme()
    const lines=getLines()
    const fontColor=document.querySelector('.text_color')
    gCtx.lineWidth = 2
    var font
    if(gChosenLine===1){
        font=document.querySelector('.text_font').value
        if(gFonts.length===0)gFonts.push(font)
        setLineColor(gChosenLine,fontColor.value)
        putTextOnCanvas(text.value,gChosenLine-1,30,getCorrectPos(),gFonts[0])
        if(gCreatedLinesCount>1){
            putTextOnCanvas(lines[gChosenLine],gChosenLine,270,getCorrectPos(),gFonts[1])
            if(gCreatedLinesCount>2){
                putTextOnCanvas(lines[gChosenLine+1].txt,gChosenLine+1,150,getCorrectPos(),gFonts[2])
            }
        }
        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'cyan'
        gCtx.strokeRect(20, 20, 260, 20)
    }
    else if(gChosenLine===2){
        font=document.querySelector('.text_font').value
        if(gFonts.length===1)gFonts.push(font)
        setLineColor(gChosenLine,fontColor.value)
        putTextOnCanvas(lines[gChosenLine-2],gChosenLine-2,30,getCorrectPos(),gFonts[0])
        putTextOnCanvas(text.value,gChosenLine-1,270,getCorrectPos(),gFonts[1])
        if(gCreatedLinesCount>2){
            putTextOnCanvas(lines[gChosenLine+1],gChosenLine+1,150,getCorrectPos(),gFonts[2])
        }
        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'cyan'
        gCtx.strokeRect(20, 260, 260, 20)
    }
    else if(gChosenLine===3){
        font=document.querySelector('.text_font').value
        if(gFonts.length===2)gFonts.push(font)
        setLineColor(gChosenLine,fontColor.value)
        putTextOnCanvas(lines[gChosenLine-3],gChosenLine-3,30,getCorrectPos(),gFonts[0])
        putTextOnCanvas(lines[gChosenLine-2],gChosenLine-2,270,getCorrectPos(),gFonts[1])
        putTextOnCanvas(text.value,gChosenLine-1,150,getCorrectPos(),gFonts[2])

        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'cyan'
        gCtx.strokeRect(20, 140, 260, 20)
    }
}

function renderLinesWithoutLining(){
    renderMeme()
    const lines=getLines()
    gCtx.lineWidth = 2
    if(gChosenLine===1){
        putTextOnCanvas(lines[gChosenLine-1].txt,gChosenLine-1,30,getCorrectPos(),gFonts[0])
    }
    else if(gChosenLine===2){
        putTextOnCanvas(lines[gChosenLine-2].txt,gChosenLine-2,30,getCorrectPos(),gFonts[0])
        putTextOnCanvas(lines[gChosenLine-1].txt,gChosenLine-1,270,getCorrectPos(),gFonts[1])
    }
    else if(gChosenLine===3){
        putTextOnCanvas(lines[gChosenLine-3].txt,gChosenLine-3,30,getCorrectPos(),gFonts[0])
        putTextOnCanvas(lines[gChosenLine-2].txt,gChosenLine-2,270,getCorrectPos(),gFonts[1])
        putTextOnCanvas(lines[gChosenLine-1].txt,gChosenLine-1,150,getCorrectPos(),gFonts[2])
    }
}

function renderMemeFromGallery(){
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    const lines=getLines()
    if(lines===undefined){
        return
    }
    gCreatedLinesCount=lines.length
    gChosenLine=1
    gCtx.lineWidth = 2
    if(lines.length===1){
        putTextOnCanvas(lines[0].txt,0,30,getCorrectPos(),gFonts[0])
    }
    if(lines.length===2){
        putTextOnCanvas(lines[1].txt,1,270,getCorrectPos(),gFonts[1])
    }
    if(lines.length===3){
        putTextOnCanvas(lines[2].txt,2,150,getCorrectPos(),gFonts[2])
    }
}

function onSwitchLine(){
    renderLinesWithoutLining()
    renderLining()
    if(gChosenLine===gCreatedLinesCount){
        gChosenLine=1
    } else {
        gChosenLine++
    }
    const lines=getLines()
    document.querySelector('.text_input').value=lines[gChosenLine-1].txt
}

function onAddLine(){
    if(gCreatedLinesCount===3){
        alert('maximum lines')
        return
    }
    // var text=document.querySelector('.text_input').value
    document.querySelector('.text_input').value=''
    const fontColor=document.querySelector('.text_font').value
    const lines=getLines()
    if(lines[gCreatedLinesCount-1].txt===''){
        alert('finish line before starting another')
        return
    }
    addLineToMeme('',16,fontColor)
    gCreatedLinesCount++
    gChosenLine++
    renderLinesWithoutLining()
    renderLining()
}
function onDeleteText(){
    if(gCreatedLinesCount===1){
        alert('no lines to delete')
        document.querySelector('.text_input').value=''
        return
    }
    renderMeme()
    const lines=getLines()
    gCtx.lineWidth = 2
    if(gChosenLine===3){
        document.querySelector('.text_color').value=lines[gChosenLine-3].color
        putTextOnCanvas(lines[gChosenLine-3],gChosenLine-3,30,getCorrectPos(),gFonts[0])
        putTextOnCanvas(lines[gChosenLine-2],gChosenLine-2,270,getCorrectPos(),gFonts[1])
        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'cyan'
        gCtx.strokeRect(20, 260, 260, 20)
    }
    if(gChosenLine===2){
        document.querySelector('.text_color').value=lines[gChosenLine-2].color
        putTextOnCanvas(lines[gChosenLine-2],gChosenLine-2,30,getCorrectPos(),gFonts[0])
        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'cyan'
        gCtx.strokeRect(20, 20, 260, 20)
    }
    if(gChosenLine>1){
        document.querySelector('.text_input').value=lines[gChosenLine-2].txt
    } else{
        document.querySelector('.text_input').value=''
    }
    lines.splice(lines.length-1,1)
    gChosenLine--
    gCreatedLinesCount--
}

function onTextSizeUp(){
    const lines=getLines()
    lines[gChosenLine-1].size++
    renderLines({value:lines[gChosenLine-1].txt})
}

function onTextSizeDown(){
    const lines=getLines()
    lines[gChosenLine-1].size--
    renderLines({value:lines[gChosenLine-1].txt})
}

function onChangeAlign(align){
    if(gCreatedLinesCount===0){
        alert('create a line first')
        document.querySelector('.text_input').value=''
        return
    }
    const alignment=align.classList[1]
    if(alignment==='text_to_left') {
        gTxtDirection='left'
    }
    if(alignment==='text_to_center') {
        gTxtDirection='center'
    }
    if(alignment==='text_to_right') {
        gTxtDirection='right'
    }
}

function onSaveMeme(){
    addToMemes()
}

function getImgUrl(){
    renderLinesWithoutLining()
    let elCanvas=document.getElementById('canvas')
    var memeURL=elCanvas.toDataURL()
    return memeURL
}

function onDownloadMeme(that){
    downloadMeme(that)
}

function onUploadMeme() {
    uploadMeme()
}

function setChosenMeme(meme){
    gChosenMeme=meme
    selectMemeToEdit(gChosenMeme)
}

function setMemeId(id){
    gMemeId=id
}

function getChosenMeme(){
    return gChosenMeme
}

function getCorrectPos(){
    if(gTxtDirection==='left') return 22
    if(gTxtDirection==='center') return 150
    if(gTxtDirection==='right') return 278
}


function putTextOnCanvas(text,gChosenLine,alignmentPos,placement,font){
    const lines=getLines()
    gCtx.fillStyle = lines[gChosenLine].color
    gCtx.font = `${lines[gChosenLine].size}px ${font}`
    gCtx.textBaseline = 'middle'
    gCtx.textAlign=gTxtDirection
    if(lines[gChosenLine].txt===''){
        gCtx.fillText(text, placement, alignmentPos)
    } else {
        console.log(lines[gChosenLine].txt)
        console.log(placement)
        console.log(alignmentPos)
        gCtx.fillText(lines[gChosenLine].txt, placement, alignmentPos)
    }
}
