/* jshint esversion: 6 */

const multer = require("multer");
const {parse} = require("path");
const Path = require("path");


const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"./uploads/categories");
    },
    filename :function(req,file,cb){
        cb(null, Date.now()+ "-" +file.originalname);
    }
});

const fileFilter = (req,file,callback) => {
    const acceptableExt = [".png",".jpg",".jpeg"];

    if(!acceptableExt.includes(Path.extname(file.originalname))){
        return callback (new Error("Only .png, .jpg, .jpeg format allowed!"));
    }

    const fileSize = parseInt(req.header["content-length"]);

    if(fileSize > 1048576){
        return callback(new Error("file Size big!"));
    }
    callback(null,true);
};
let upload = multer({
    storage: storage, 
    fileFilter:fileFilter,
    fileSize:1048576,
});

module.exports = upload.single("categoryImage");