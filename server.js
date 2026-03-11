const express = require("express")
const { exec } = require("child_process")
const path = require("path")

const app = express()

app.use(express.static(__dirname))

app.get("/download",(req,res)=>{

const url=req.query.url

if(!url){
return res.send("No url")
}

const cmd=`yt-dlp -f mp4 -o "%(title)s.%(ext)s" ${url}`

exec(cmd,(err,stdout,stderr)=>{

if(err){
return res.send("Error downloading")
}

res.send("Video downloaded on server")

})

})

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
console.log("Cosmic running")
})
