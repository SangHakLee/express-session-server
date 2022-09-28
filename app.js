const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session); // 1
const ip = require('ip');

const app = express();
app.use(session({  // 2
  secret: 'keyboard cat',  // 암호화
  cookie: {maxAge: 1000 * 10},
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));
app.get('/', (req, res, next) => {  // 3
  console.log(req.session);
  if(!req.session.num){
    req.session.num = 1;
  } else {
    req.session.num = req.session.num + 1;
  }
  //res.send(`Number : ${req.session.num}`);
  res.json({
    session: req.session.num,
    servers: ip.address()	  
  })
});
const port = 8080;
app.listen(port, () => {
  console.log(`listening ${ip.address()}:${port}`);
});
