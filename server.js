// const express = require('express');
// // const nanoid = require('nanoid');
// const mongoose = require('mongoose');
// const ShortUrln = require('./models/shortUrl');
// const app = express();

// mongoose.connect('mongodb://localhost/urlShortener',{
//   useNewUrlParser: true, useUnifiedTopology:true
// })



// app.set('view engine', 'ejs')
// app.use(express.urlencoded({extended : false}))

// app.get('/', async(req, res) =>{
//     const shortUrls = await ShortUrln.find()
//     res.render('index', {shortUrls: shortUrls})
//     })
    
// app.post('/shortUrls', async (req,res) =>{
//     await ShortUrln.create({full: req.body.fullUrl})
//     res.redirect('/')
// })
// app.get('/:shortUrl', async(req, res) =>{
//     const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
//     if(shortUrl == null) return res.sendStatus(404)
//     shortUrl.clicks++
//     shortUrl.save()
//     res.redirect(shortUrl.full)
//    })
    

// app.listen(process.env.PORT || 5000);

//-------------------------------------------------------

// const express = require('express');
// const mongoose = require('mongoose');
// const shortid = require('shortid');

// const app = express();
// app.use(express.json());

// mongoose.connect('mongodb://localhost/url-shortener', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// app.set('view engine', 'ejs')
// const urlSchema = new mongoose.Schema({
//     originalUrl: {
//       type: String,
//       required: true,
//     },
//     shortUrl: {
//       type: String,
//       required: true,
//       default: shortid.generate,
//     },
//   });
//   const Url = mongoose.model('Url', urlSchema);
  
//   // Create a new shortened URL
//   app.post('/api/shorten', async (req, res) => {
//     const { originalUrl } = req.body;
  
//     // Validate the URL
//     if (!validUrl.isUri(originalUrl)) {
//       return res.status(400).json({ error: 'Invalid URL' });
//     }
  
//     try {
//       // Check if the URL already exists in the database
//       let url = await Url.findOne({ originalUrl });
  
//       if (url) {
//         return res.json({ shortUrl: url.shortUrl });
//       } else {
//         // Create a new URL document
//         url = new Url({ originalUrl });
//         await url.save();
//         return res.json({ shortUrl: url.shortUrl });
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });
  
//   // Redirect to the original URL
//   app.get('/:shortUrl', async (req, res) => {
//     const { shortUrl } = req.params;
  
//     try {
//       // Find the URL document by short URL
//       const url = await Url.findOne({ shortUrl });
  
//       if (url) {
//         return res.redirect(url.originalUrl);
//       } else {
//         return res.status(404).json({ error: 'URL not found' });
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
//   });

//---------------------------------------------------------------

// const express = require('express');
// const { nanoid } = require('nanoid');

// const app = express();
// app.use(express.json());

// const urlDatabase = {};

// app.post('/shortUrl', (req, res) => {
//   const { url } = req.body;
//   const id = nanoid(7); // Change the number to adjust the length of the generated URL

//   urlDatabase[id] = url;

//   const shortenedUrl = `http://yourdomain.com/${id}`; // Replace with your domain

//   res.json({ shortenedUrl });
// });

// app.get('/:shortUrl', (req, res) => {
//   const shortUrln= req.params;
//   const originalUrl = urlDatabase[id];

//   if (originalUrl) {
//     res.redirect(originalUrl);
//   } else {
//     res.status(404).json({ error: 'URL not found' });
//   }
// });

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });