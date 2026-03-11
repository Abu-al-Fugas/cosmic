const express = require("express")
const { spawn } = require("child_process")

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
"bv*+ba/b",
"-o",
"-",
url
])

res.setHeader("Content-Disposition","attachment; filename=video.mp4")
res.setHeader("Content-Type","application/octet-stream")

ytdlp.stdout.pipe(res)

ytdlp.stderr.on("data",(data)=>{
console.log(data.toString())
})

ytdlp.on("close",(code)=>{
if(code!==0){
console.log("Download failed")
}
})

})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
console.log("Cosmic running on",PORT)
})
