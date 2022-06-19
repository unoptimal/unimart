const express = require('express');
const app = express();
app.set('view engine', 'ejs');

const Listing = require('./models/listing');

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/unimart', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(res=>{
          console.log("DB Connected!")
  }).catch(err => {
    console.log(Error, err.message);
  })

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));

const methodOverride = require('method-override');
app.use(methodOverride('_method'))

app.get('/', (req, res) =>{
    res.render('home');
})

//all listings
//need to call variable listings so the for loop syntax works in index.ejs
app.get('/listings', async (req, res) =>{
    const listings = await Listing.find({});
    res.render('listings/index', {listings})
})

//submit listing
app.post('/listings', async (req, res) =>{
    const listing = new Listing(req.body.listing);
    await listing.save();
    res.redirect(`listings/${listing._id}`)
})

//new
app.get('/listings/new', (req, res) =>{
    res.render('listings/new')
})

//show
app.get('/listings/:id', async (req, res) =>{
    const listing = await Listing.findById(req.params.id)
    res.render('listings/show', {listing})    
})

//edit listing page
app.get('/listings/:id/edit', async (req, res) =>{
    const listing = await Listing.findById(req.params.id)
    res.render('listings/edit', {listing})
})

//actually display edits
app.put('/listings/:id', async (req, res) =>{
    const {id} = req.params; //take the id from req.params
    const listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${listing._id}`) 
})

app.delete('/listings/:id', async (req, res) =>{
    const {id} = req.params;
    const listing = await Listing.findByIdAndDelete(id)
    res.redirect('/listings')
})

app.listen(3000, () => {
    console.log('Listening on 3000')
})
