var mongoose   = require('mongoose');
 //mongoose.connect('mongodb://api:api123@ds011314.mlab.com:11314/playlist');
 console.log(process.env.MONGODB_URI);
 console.log(process.env.testthing);
mongoose.connect(process.env.MONGODB_URI);
db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database');
});
var Song     = require('./app/models/song');
var Playlist = require('./app/models/playlist')
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;
console.log(Playlist.find(function(err, playlist) {}));
var router = express.Router();
router.use(function(req, res, next) {
    // do logging
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.route('/')
  .get(function(req, res){
    res.send('Connected')
  })
router.route('/playlists')
    .post(function(req, res) {
      var playlist = new Playlist();
      playlist.name= req.body.name;
      playlist.song=[];
      playlist.save(function(err) {
          if (err)
              res.send(err);

          res.json(playlist._id);
      })
    })
    .get(function(req, res){
      Playlist.find(function(err, playlist) {
          if (err)
              res.send(err);

          res.json(playlist);
      });
    })
router.route('/playlists/get-by-name')
    .get(function(req, res){
      if(req.query.name===undefined){
        res.send("need to pass a name")
      }
      Playlist.find({"name": req.query.name}, function(err, playlist) {
            if (err)
                res.send(err);
            res.json(playlist);
        });
    })
router.route('/playlists/add')
    .post(function(req, res){
      var song = new Song();
      song.title = req.body.title;
      song.id= req.body.id;
      if(req.body.playlist_id===undefined){
        res.send("need to pass a id")
      }
      Playlist.find({"_id": req.body.playlist_id}, function(err, playlist) {
            if (err)
                res.send(err);
            if(playlist.length===0){
              res.send("could not find a playlist with that id")
            }
            playlist[0].songs.push(song);
            playlist[0].save();
            res.json(playlist);
        });
    })
router.route('/playlists/remove')
  .post(function(req, res){
    if(req.body.name===undefined){
      res.send("need to pass a name")
    }
    Playlist.find({"name": req.body.name}, function(err, playlist) {
          if (err)
              res.send(err);
          if(playlist.length===0){
            res.send("could not find a playlist with that name")
          }
          playlist[0].songs=playlist[0].songs.filter(function(value){
            return (value.id!=req.body.id)
          });
          playlist[0].save();
          res.json(playlist);
      });
  })
app.use('/pa1', router);
app.listen(port);
