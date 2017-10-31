# authentication-nodejs

Install **Mongodb** from https://www.mongodb.com/download-center?jmp=nav#community

**For Start  mongodb Server in windows use mongodb start server/windows/mongo.bat**

default location for mongodb database path is desktop/mongodata 

if your mongodb install location is change 

`change your mongodb install location`

and also you change your db path

` change --dbpath /set location where save your data.`

and remove from mongo.bat this line
`1. cd %username%/Desktop`
`2. mkdir mongodata` 
for next time rum your server as your set location.


if you have a home page change with server/middleware/authenticate.js 
in _**line no. 20**_ change as your request and also remove form server/server.js in 


`app.get('/', authenticate, (req, res) => {
  res.redirect('/home');
});`

to

`app.get('/', (req, res) => {
  res.send ('**your file name**');
});`

and add your login page where you want.

