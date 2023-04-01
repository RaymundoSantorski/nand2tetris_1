const fs = require('fs');
const path = require('path');

const main = () => {
    let err = false;
    let pfile1 = process.argv[2];
    let pfile2 = process.argv[3];
    if(!pfile1 || !pfile2){
        return console.log('Debe especificar los dos archivos a comparar');
    }
    let absPath;
    let file;
    let folder;
    let absPath2;
    let file2;
    let folder2;
    if(pfile1.includes('/')){
        [folder, file] = pfile1.split('/');
        absPath = path.join(folder, file) + '.hack';
    }else{
        folder = '/';
        file = pfile1;
        absPath = path.join(folder, file) + '.hack';
    }
    if(pfile2.includes('/')){
        [folder2, file2] = pfile2.split('/');
        absPath2 = path.join(folder2, file2) + '.hack';
    }else{
        folder2 = '/';
        file2 = pfile2;
        absPath2 = path.join(folder2, file2) + '.hack';
    }

    try {
        let hackFile1 = fs.readFileSync(absPath, 'utf-8').split(/\r?\n/);
        let hackFile2 = fs.readFileSync(absPath2, 'utf-8').split(/\r?\n/);
        if(hackFile1.length !== hackFile2.length) return console.log('Los archivos no coinciden');
        for(let i=0; i<hackFile1.length; i++){
            let line1 = hackFile1[i];
            let line2 = hackFile2[i];
            if(line1 !== line2){
                console.log('Los archivos no coinciden en la linea ', i+1)
                err = true
            }
        }
        if(!err) console.log('Los archivos coinciden');
    } catch (error) {
        console.log('Ocurrió un error, revise que existan los archivos y vuelva a intentarlo');
    }
}

main();