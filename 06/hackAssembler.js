const fs = require('fs');
const path = require('path');

let symbolTable = {
    R0: '000000000000000',
    R1: '000000000000001',
    R2: '000000000000010',
    R3: '000000000000011',
    R4: '000000000000100',
    R5: '000000000000101',
    R6: '000000000000110',
    R7: '000000000000111',
    R8: '000000000001000',
    R9: '000000000001001',
    R10: '000000000001010',
    R11: '000000000001011',
    R12: '000000000001100',
    R13: '000000000001101',
    R14: '000000000001110',
    R15: '000000000001111',
    SCREEN: '100000000000000',
    KBD: '110000000000000',
    SP: '000000000000000',
    LCL: '000000000000001',
    ARG: '000000000000010',
    THIS: '000000000000011',
    THAT: '000000000000100'
}

let compTable = {
    '0': '0101010',
    '1': '0111111',
    '-1': '0111010',
    'D': '0001100',
    'A': '0110000',
    '!D': '0001101',
    '!A': '0110001',
    '-D': '0001111',
    '-A': '0110011',
    'D+1': '0011111',
    'A+1': '0110111',
    'D-1': '0001110',
    'A-1': '0110010',
    'D+A': '0000010',
    'D-A': '0010011',
    'A-D': '0000111',
    'D&A': '0000000',
    'D|A': '0010101',
    'M': '1110000',
    '!M': '1110001',
    '-M': '1110011',
    'M+1': '1110111',
    'M-1': '1110010',
    'D+M': '1000010',
    'D-M': '1010011',
    'M-D': '1000111',
    'D&M': '1000000',
    'D|M': '1010101'
}

let destTable = {
    'null': '000',
    'M': '001',
    'D': '010',
    'MD': '011',
    'A': '100',
    'AM': '101',
    'AD': '110',
    'AMD': '111'
}

let jumpTable = {
    'null': '000',
    'JGT': '001',
    'JEQ': '010',
    'JGE': '011',
    'JLT': '100',
    'JNE': '101',
    'JLE': '110',
    'JMP': '111'
}

const parser = (content) => {
    let fixContent = content.split('/');
    let instruction = fixContent[0];
    let dest;
    let comp;
    let jump;
    if(instruction.includes('=')){
        [dest, rest] = instruction.split('=');
        [comp, jump] = rest.split(';');
    }else{
        [comp, jump] = instruction.split(';');
    }
    return [dest?.trim(), comp?.trim(), jump?.trim()];
}

const code = (value, field) => {
    let result = '';
    if(value === undefined) value = 'null';
    if(field === 0) result = destTable[value];
    if(field === 1) result = compTable[value];
    if(field === 2) result = jumpTable[value];
    return result;
}

const main = () => {
    let filePath = process.argv[2];
    if(!filePath){
        return console.log('Debe especificar el archivo que desea traducir');
    }
    let absPath;
    let file;
    let folder;
    if(filePath.includes('/')){
        [folder, file] = filePath.split('/');
        absPath = path.join(folder, file) + '.asm';
    }else{
        folder = '/';
        file = filePath;
        absPath = path.join(folder, file) + '.asm';
    }
    try{
        let asmFile = fs.readFileSync(absPath, 'utf-8').split(/\r?\n/);
        let hackFile = fs.openSync((path.join(folder, file) + '.hack'), 'w');
        let i = 0;
        let varIndex = 16;
        for(let line of asmFile){
            let content = line.replace(' ', '');
            if(content.startsWith('(')){
                let label = content.slice(1, content.length-1);
                symbolTable[label] = fixBinary(i);
            }
            if(!content.startsWith('/') && content.length>0 && !content.startsWith('(')) i++;
        }
        for(let line of asmFile){
            let content = line.replace(' ', '').trim();
            if(!content.startsWith('/') && content.length>0 && !content.startsWith('(')){
                if(content.startsWith('@')){
                    let at = content.split('@');
                    let data = '';
                    if(!isNaN(parseInt(at[1]))){
                        data = `0${fixBinary(at[1])}\n`;
                    }else if(symbolTable[at[1]]){
                        data = `0${symbolTable[at[1]]}\n`;
                    }else{
                        data = `0${fixBinary(varIndex.toString())}\n`;
                        symbolTable[at[1]] = fixBinary(varIndex.toString());
                        varIndex++;
                    }
                    fs.writeSync(hackFile, data);
                }else{
                    let [dest, comp, jump] = parser(content);
                    let destBin = code(dest, 0);
                    let compBin = code(comp, 1);
                    let jumpBin = code(jump, 2);
                    fs.writeSync(hackFile, `111${compBin}${destBin}${jumpBin}\n`);
                }
            }
        }
    }catch(err){
        console.log('Hubo un error al traducir el archivo');
        console.log(err);
    }
    console.log('Proceso terminado con exito');
}

const fixBinary = (decimalString) => {
    let decimal = parseInt(decimalString);
    let binary = decimal > 0 
    ? decimal.toString(2)
    : (decimal >>> 0).toString(2);
    let result = binary;
    if(binary.length < 15){
        let times = 15 - binary.length;
        result = '0'.repeat(times) + binary;
    }
    if(binary.length > 15){
        let ex = binary.length - 15;
        result = binary.split('').slice(ex).join('');
    }
    return result;
}


main();