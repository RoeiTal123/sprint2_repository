var gIsGalleryChosen=true
var gIsEditedMemesChosen=false
var gIsMemesEditorChosen=false
var gIsaMemeChosen=false

function onInit(){
    gMemes=takeoutMemesFromStorage()
    document.querySelector('.edited_memes').style.display='none'
    document.querySelector('.meme_editor').style.display='none'
    // if(gMemes!==null){
    //     loadAllToGallery()
    // } else {
    //     gMemes=[]
    // }
}
function onToGallery(){
    if(gIsGalleryChosen) return
    if(!gIsGalleryChosen){
        console.log('entering template gallery')
        document.querySelector('.gallery_btn').classList.add('selected')
        document.querySelector('.gallery').style.display='block'
        gIsGalleryChosen=true
        // document.querySelector('.saved_memes_btn').classList.remove('selected')
        // document.querySelector('.edited_memes').style.display='none'
        gIsEditedMemesChosen=false
        document.querySelector('.meme_editor_btn').classList.remove('selected')
        document.querySelector('.meme_editor').style.display='none'
        gIsMemesEditorChosen=false
        gIsaMemeChosen=false
    } 
}

function onToSavedMemes(){
    if(gIsEditedMemesChosen) return
    
    if(!gIsEditedMemesChosen){
        console.log('entering memes created')
        // document.querySelector('.saved_memes_btn').classList.add('selected')
        // document.querySelector('.edited_memes').style.display='block'
        gIsEditedMemesChosen=true
        document.querySelector('.meme_editor_btn').classList.remove('selected')
        document.querySelector('.meme_editor').style.display='none'
        gIsMemesEditorChosen=false
        document.querySelector('.gallery_btn').classList.remove('selected')
        document.querySelector('.gallery').style.display='none'
        gIsGalleryChosen=false
        gIsaMemeChosen=false
    } 
}

function onToMemeEditor(){
    if(gIsMemesEditorChosen) return
    if(!gIsaMemeChosen){
        alert('choose a meme template first')
        return
    }
    if(!gIsMemesEditorChosen){
        console.log('entering memes editor')
        document.querySelector('.meme_editor_btn').classList.add('selected')
        document.querySelector('.meme_editor').style.display='block'
        gIsMemesEditorChosen=true
        document.querySelector('.gallery_btn').classList.remove('selected')
        document.querySelector('.gallery').style.display='none'
        gIsGalleryChosen=false
        // document.querySelector('.saved_memes_btn').classList.remove('selected')
        // document.querySelector('.edited_memes').style.display='none'
        gIsEditedMemesChosen=false
    } 
}

function onSetLang(lang){
    setLang(lang)
    flipDirection()
    doTrans()
}