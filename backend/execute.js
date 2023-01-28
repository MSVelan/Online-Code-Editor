const { exec } = require('child_process');
const fs = require('fs')
const path = require('path')
const outputPath = path.join(__dirname,"outputs");
const filedir = path.join(__dirname,"codes")
if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive: true})
}
const executeCpp = (filepath) => {
    const jobid = path.basename(filepath).split(".")[0]
    const outPath = path.join(outputPath,`${jobid}`)
    return new Promise((resolve,reject)=>{
        exec(`cd ${filedir} && g++ ${filepath} -o ${outPath} && cd ${outputPath} && ${outPath}`,
        (error, stdout, stderr)=>{
            error && reject({error, stderr});
            stderr && reject(stderr);
            resolve(stdout);
        })
    })
}

module.exports = {
    executeCpp
}