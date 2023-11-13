const multer = require('multer')
const path = require('path');

module.exports = multer({
    storage: multer.diskStorage({}),
    filefilter: (req, file, cb)=>{
        let ext = path.extname(file.originalname);
        if(ext ===! ".jpg" && ext ===! ".jpeg" && ext ===! ".png" && ext ===! ".webp"){
            cb(new error ("El tipo de archivo no es compatible"), false)
            return;
        }
        cb(null, true)
    }
})