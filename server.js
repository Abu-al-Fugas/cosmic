const express = require("express")
const { spawn } = require("child_process")
const path = require("path")

const app = express()

app.use(express.static(__dirname))

app.get("/download",(req,res)=>{

const url = req.query.url

if(!url){
return res.send("No URL provided")
}

const ytdlp = spawn("python3",[
"-m",
"yt_dlp",
"-f",
"mp4",
"-o",
"-",
url
])

res.setHeader("Content-Disposition","attachment; filename=video.mp4")
res.setHeader("Content-Type","application/octet-stream")

ytdlp.stdout.pipe(res)

ytdlp.stderr.on("data",(data)=>{
console.log("yt-dlp error:",data.toString())
})

ytdlp.on("error",(err)=>{
console.log("Spawn error:",err)
res.end("Download failed")
})

})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
console.log("Cosmic server running on port",PORT)
})
