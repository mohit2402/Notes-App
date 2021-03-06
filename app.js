//const validator = require('validator');
const notes = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');

//console.log(notes());
//console.log(chalk.red("error !!"));
//console.log(validator.isEmail('mohit@gail.com'));

//yargs.version('1.1.0');

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Body of note",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv){
        notes.addNote(argv.title,argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a node',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(agrv){
        notes.removeNote(agrv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List all notes ',
    handler(){
        notes.listNotes()
    }
})

yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "Read a note",
            demandOption: true,
            type: "string"
        }
    },
    handler(agrv){
        notes.readNote(agrv.title)
    }
})

var reads = "hello";
var lists = "listing";

yargs.parse();
//console.log(process.argv);
//console.log(yargs.argv);