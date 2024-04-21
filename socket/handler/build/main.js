const checkingIntence = require('./checking')
const checkingFilesIntence = require('./filesChecking')
const cancleBuild = require('./closeBuild')
const botBuild = require('./build')
module.exports = function(msg, socket,io){
    if (msg.type=="checkingIntence") {
        checkingIntence({msg, socket})
    }else  if (msg.type=="checkingFileIntence") {
        checkingFilesIntence({msg, socket})
    }else  if (msg.type=="build") {
        botBuild({msg,socket: io})
    }else  if (msg.type=="closeBuild") {
        cancleBuild({msg, socket:io})
    }
}