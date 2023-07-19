import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = './uploads/documents'; // default directory

        if (req.path.includes('profile')) {
            dir = './uploads/profiles';
        } else if (req.path.includes('product')) {
            dir = './uploads/products';
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

export default multer({ storage });
