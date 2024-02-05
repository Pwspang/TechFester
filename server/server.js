
// Specify the port to listen on
const PORT = 8000;

const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const cors = require('cors');
app.use(cors());

const getFunctionNames = require("./generator/extractor");
const generateTestCase = require("./generator/chatgptapi");
const generateCode = require("./generator/generateCode");
// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp and original extension
    },
  });
  
  const upload = multer({ storage: storage });
  
  // Serve the static files in the 'uploads' folder
  app.use('/uploads', express.static('uploads'));
  app.use(express.json());
  
  // Handle file upload endpoint
  app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).send('No file uploaded.');
      }
  
      // You can handle the file information here, for example, save the filename to a database
      res.status(200).json({ message: 'File uploaded successfully.', filename: file.filename, data: getFunctionNames("./uploads/" + file.filename)});

    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/api/generateTestCase', async (req,res) => {
    try {
      if (req.body.function == null || req.body.function == null) throw new Error('Parameter is empty ');
      generateTestCase(req.body.function, req.body.variable).then((value) => {
        result = JSON.parse(value);
        console.log(result);
        res.status(200).json({result});
      });

    } catch (error){
      console.error('Error Generating Test Case:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/api/generateJestCode', async (req,res) => {
      try {
      console.log(req.body);
       generateCode(req.body.func, req.body.case).then((value) => {
        console.log(value);
        res.status(200).json({data : value});
      });

    } catch (error){
      console.error('Error Generating Test Case:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});