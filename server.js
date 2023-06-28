const express = require('express');
const mongoose = require('mongoose');
const shortId = require('shortid');
const bcrypt = require('bcrypt')

// Connection to mongoDB
const uri = "mongodb+srv://YoutubeVideo:YoutubeVideo@youtbevideo.4vw9o8s.mongodb.net/?retryWrites=true&w=majority";

// Hash the MongoDB URL
const hashUrl = async () => {
    try {
      const saltRounds = 10;
      const hashedUrl = await bcrypt.hash(uri, saltRounds);
  
      
      console.log('Hashed MongoDB URL:', hashedUrl);
    } catch (error) {
      console.error('Error hashing MongoDB URL:', error);
    }
  };
  
  hashUrl();
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}
connect();

const app = express();
app.set('view engine', 'ejs');

// URL Schema
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

app.use(express.urlencoded({ extended: false }));


app.get('/', async (req, res) => {
    try {
      const shortUrls = await ShortUrl.find();
      res.render('index', { shortUrls: shortUrls });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.post('/shortUrls', async (req, res) => {
    try {
      const { fullUrl } = req.body; 
  
      if (!fullUrl) {
        throw new Error('Full URL is required');
      }
  
      await ShortUrl.create({ full: fullUrl });
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  // Search Optimisation
  app.get('/:shortUrl', async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOneAndUpdate(
      { short: req.params.shortUrl },
      { $inc: { clicks: 1 } },
      { new: true }
    );
    if (!shortUrl) {
      return res.sendStatus(404);
    }
    res.redirect(shortUrl.full);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running');
});



