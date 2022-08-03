const express = require('express');
const multer = require('multer');

const app = express()

app.use(express.static(__dirname + 'public'))

/////////////////// CONFIG MULTER //////////////////
const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        //console.dir (cb)
        cb(null, `${Date.now()} -${file.originalname} `)
    }
})

const upload = multer ({ storage })

app.post('/uploadfile', upload.single('myFile'), (req, res, next)=>{
    const {file} = req
    if (!file){
        const error = new Error('Por favor suba un archivo')
        error.httpStatusCode = 400
        return next (error)
    }
    res.send(file)
})

app.get('/api', (req, res) =>{
    res.sendFile(__dirname + '/indexFiles.html')
})

app.listen(8080, () =>{
    console.log('server on port 8080')
})