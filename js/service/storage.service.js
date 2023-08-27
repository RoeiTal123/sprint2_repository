const STORAGE_KEY='memes'

function storeMemes(){
    saveToStorage(STORAGE_KEY,getMemes())
}

function takeoutMemesFromStorage(){
    var memes=loadFromStorage(STORAGE_KEY)
    return memes
}