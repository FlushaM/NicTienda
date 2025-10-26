const multer              = require('multer');
const { v2: cloudinary }  = require('cloudinary');

// ⬇️ 1. Configura Cloudinary con las variables de entorno  ⬇️
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   // antes CLOUD_NAME
  api_key:    process.env.CLOUDINARY_API_KEY,      // antes CLOUD_API_KEY
  api_secret: process.env.CLOUDINARY_API_SECRET,   // antes CLOUD_API_SECRET
});

// ⬇️ 2. Multer en memoria  ⬇️
const storage = multer.memoryStorage();
const upload  = multer({ storage }).single('image');

exports.upload = upload;

// ⬇️ 3. Controlador que sube la imagen  ⬇️
exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se recibió ningún archivo' });
  }

  /*  —— AQUÍ ES DONDE AÑADES EL “folder” ——  */
  const stream = cloudinary.uploader.upload_stream(
    { folder: 'TIENDA_LINK' },           //  <── Cloudinary guardará todo ahí
    (error, result) => {
      if (error) {
        console.error('[Cloudinary]', error);
        return res.status(500).json({ error: 'Error al subir la imagen', detail: error });
      }
      // Enviamos la URL segura al frontend
      res.json({ url: result.secure_url });
    }
  );

  // Pasamos el buffer del archivo al stream
  stream.end(req.file.buffer);
};
