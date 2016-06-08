var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SongSchema= new Schema({
  title: String,
  id: String

})
// var PlaylistSchema   = new Schema({
//     songs: array
// });

module.exports = mongoose.model('Song', SongSchema);
