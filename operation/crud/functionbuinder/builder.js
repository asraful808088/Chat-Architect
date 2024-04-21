const path  = require('path')
const fs = require("fs")
const copy = require('../../../operation/crud/copy/copy')

function checkAndRecreateDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log(`Directory '${dirPath}' created.`);
    } else {
        deleteFolderRecursive(dirPath);
        fs.mkdirSync(dirPath);
        console.log(`Directory '${dirPath}' recreated.`);
    }
}

function deleteFolderRecursive(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file) => {
            const curPath = path.join(dirPath, file);
            if (fs.lstatSync(curPath).isDirectory()) { 
                deleteFolderRecursive(curPath);
            } else { 
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(dirPath); 
    }
}





























function functionBuilder(listOfItems){
    const listofFunc  = listOfItems?.map(element=>`from .conditions.${element}.run import run_${element}\n`)
    const makeFuncimport  =  listofFunc.join("")
    const code  = `   
import sys
sys.path.append('./')
${makeFuncimport}
functionBook={
    ${listOfItems?.map(element=>`"${element}":run_${element}`)}
}  
    `
    return code
}

function codeCopy(name, listOf){
    checkAndRecreateDir(path.join(__dirname,'../../../bot/',`${name}/`,"conditions/"))
    for (const iterator of listOf) {
        const singlecode = path.join(__dirname,'../../../chats/conditions/',`${iterator}.condition/`)
        const targetSrc =  path.join(__dirname,'../../../bot/',`${name}/`,"conditions/",iterator)
        checkAndRecreateDir(targetSrc)
        copy(singlecode,targetSrc)
    }
}




module.exports = function (botname,listOf){
    const targetpath  = path.join(__dirname,'../../../bot/',botname??"default","function.py")
    codeCopy(botname??"default", listOf)
    const codeGenerate = functionBuilder(listOf)
    try {
        fs.writeFileSync(targetpath, codeGenerate);
      } catch (err) {
        console.error('Error writing file:', err);
      }
}