const express = require('express');
const nanoid = require('nanoid');
const mongoose = require('mongoose');
const bodyParser = require('body-parsing')
const validUrl = require('valid-Url')

const ShortUrln = require('./models/shortUrl');
const app = express();

mongoose.connect('mongodb://localhost/urlShortener',{
  useNewUrlParser: true, useUnifiedTopology:true
})



app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : false}))

app.get('/', async(req, res) =>{
    const shortUrls = await ShortUrln.find()
    res.render('index', {shortUrls: shortUrls})
    })
    
app.post('/shortUrl', async (req,res) =>{
    await ShortUrln.create({full: req.body.fullUrl})
    res.redirect('/')
})
app.get('/:shortUrl', async(req, res) =>{
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
    if(shortUrl == null) return res.sendStatus(404)
    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
   })
    

app.listen(process.env.PORT || 5000);