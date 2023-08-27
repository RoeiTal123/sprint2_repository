function getRandomInt(min,max){
    min=Math.floor(min)
    max=Math.ceil(max)
    return Math.floor(Math.random()*(max-min)+min)
}

function addClass(elClass,elElement){
    document.querySelector(`.${elElement}`).classList.add(`${elClass}`)
}

function removeClass(elClass,elElement){
    document.querySelector(`.${elElement}`).classList.remove(`${elClass}`)
}

function navigateToPage(page){
    window.location = `${page}.html`
}

function saveToStorage(key,val){
    localStorage.setItem(key,JSON.stringify(val))
}

function loadFromStorage(key){
    var val=localStorage.getItem(key)
    return JSON.parse(val)
}

function makeLorem(wordCount = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function sortBy(items, key , dir){
    const isStrings=['name']
    if(isStrings.includes(key)){
        items.sort((a,b)=>(a[key].localeCompare(b[key]))*dir) 
    } else {
        items.sort((a,b)=>(b[key]-a[key])*dir)
    }
    return items
}