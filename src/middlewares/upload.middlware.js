import multer from "multer"
import { v4 as uuidv4 } from 'uuid';
import { AppError } from "../utils/erroer.handler.js";

const getuploadmiddleware=(fieldname="img")=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
          
          cb(null,uuidv4()+'-'+ file.originalname)
        }
    })
    
    function fileFilter (req, file, cb) {
    
        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted
        
    
        // To reject this file pass `false`, like so:
        if (!file.mimetype.startsWith('image'))
    
            return cb(new AppError('images only'),false)
      
        cb(null,true)
      } 
      
    const upload = multer({ storage: storage,fileFilter })
    const uploadmiddleware=upload.single(fieldname)
    return uploadmiddleware
}
export default getuploadmiddleware

