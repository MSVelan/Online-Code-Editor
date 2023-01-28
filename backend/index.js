const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express();

const { generateFile } = require('./generateFile')
const { executeCpp } = require('./execute.js');
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.get('/',(req,res)=>{
    return res.json({hello:"world!"})
})

app.post('/run',async (req,res)=>{
    const { language = "cpp", code } = req.body
    if(code === undefined){
        return res.status(400).json({success:false, error: "Empty code body!"})
    }

    try{
        // here we need to generate cpp file with given input
        const {filepath,jobid} = await generateFile(language, code)
        const outputPath = path.join(__dirname,"outputs")
        const outPath = path.join(outputPath,`${jobid}.exe`)
        // then run that file, get the output
        const output = await executeCpp(filepath);
        fs.unlink(filepath, (error) => {
          if (error) {
            res.status(500).json({ error });
            return;
          }
        });
        
        
        fs.unlink(outPath, (error) => {
          if (error) {
            res.status(500).json({ error });
            return;
          }
        });
        
        return res.json({ filepath: filepath, output: output }) 
    } catch(error){
        res.status(500).json({error})
        return;
    }
    

})
app.listen(5000, ()=>{
    console.log("Listening on port 5000")
})