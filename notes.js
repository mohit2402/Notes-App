const fs = require('fs')
const chalk = require('chalk')

const getNotes = function (){
    return "Your notes ....";
}

const addNote = function (title,body){
    const notes = loadNotes()

    const duplicatNotes = notes.filter(function(notes){
        return notes.title === title
    })

    if(duplicatNotes.length === 0)
    {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"))

    }else{
        console.log(chalk.red.inverse('Note title taken!'))
    }

    
}

const saveNotes = function(notes){
    const toJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json',toJson) 
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    }catch(e){
        return []
    }
}

const removeNote = function(title){
    const notes = loadNotes()

    const filterNotes = notes.filter(function(notes){
        return notes.title!==title
    })

    

    if(notes.length > filterNotes.length)
    {
        console.log(chalk.green.inverse(`Note removed!`))
        saveNotes(filterNotes)
    }
    else{
        console.log(chalk.red.inverse("No note found!"))

    }

    

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}