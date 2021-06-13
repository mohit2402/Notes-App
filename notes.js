const fs = require('fs')
const chalk = require('chalk');
const { Console } = require('console');

const getNotes = () => {
    return "Your notes ....";
}

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicatNotes = notes.find((notes) => notes.title === title)

    // const duplicatNotes = notes.filter(function(notes){
    //     return notes.title === title
    // })

    if (!duplicatNotes) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"))

    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }


}

const saveNotes = (notes) => {
    const toJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', toJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const filterNotes = notes.filter((notes) => notes.title !== title)
    if (notes.length > filterNotes.length) {
        console.log(chalk.green.inverse(`Note removed!`))
        saveNotes(filterNotes)
    }
    else {
        console.log(chalk.red.inverse("No note found!"))
    }

}

const listNotes = () => {
    console.log(chalk.inverse.white('Your Notes:'))
    console.log()
  const notes = loadNotes();
  notes.forEach((note) => {
      console.log(chalk.inverse.yellow(note.title))
  });
}

const readNote = (title) => {
    const notes = loadNotes()
    const read = notes.find((note) => note.title===title)
    
    

    if(!read)
    {
        console.log(chalk.inverse.red('No Note Found'))
    }
    else{
        console.log(chalk.inverse.yellow(read.title))
        console.log(chalk.inverse(read.body))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}