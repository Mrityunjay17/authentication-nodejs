// Mrityunjay Pandey

const { mongoose, ObjectID } = require('./db/mongoose-db');
const { User } = require('./models/users');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const { authenticate } = require('./middleware/authenticate');


var app = express();
app.use(cookieParser('M#9l.n3|?+{@)<v'));

app.use('/css', express.static(path.join(__dirname, './../public/css')));
app.use('/image', express.static(path.join(__dirname, './../public/image')));
app.use('/audio', express.static(path.join(__dirname, './../public/audio')));
app.use('/video', express.static(path.join(__dirname, './../public/video')));
// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './../public/views'));



// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.get('/', authenticate, (req, res) => {
  res.redirect('/home');
});


app.get('/login',(req,res)=>{

    var token = req.signedCookies['x-auth'];
    if (token) {
        User.findByToken(token).then((user)=>{
            if(!user){
                return res.clearCookie('x-auth').redirect('/login');
            }
            res.redirect('/home')
        }).catch((e)=>{
            res.clearCookie('x-auth').redirect('/login');
        })
    }
    else{
        res.render('Login');
    }
});


app.post('/login', urlencodedParser, (req, res) => {

  User.findByCredentials(req.body.EmailId, req.body.Password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.cookie('x-auth', token, { signed: true }).redirect('/home');
    })
  }).catch((e) => {
    res.status(400).send(e);
  })
})

app.get('/createaccount',(req,res)=>{
    res.render('Createaccount');
});


app.post('/createaccount', urlencodedParser, (req, res) => {
  var user = new User(req.body);
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.cookie('x-auth', token, { signed: true }).redirect('/home');
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/home', (req, res) => {


  var token = req.signedCookies['x-auth'];
  
    if (token) { 
      User.findByToken(token).then((user)=>{
        if(!user){
          return res.clearCookie('x-auth').redirect('/');
        }
        res.send(user);
      }).catch((e)=>{
        console.log(e);
        res.clearCookie('x-auth').redirect('/');
      })
      
    }
  
    else{
      res.redirect('/');
    }

  
});

const server = app.listen(80, () => {
    console.log('server is running on port 80');
});

