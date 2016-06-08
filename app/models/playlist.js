var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var PlaylistSchema   = new Schema({
    name: String,
    songs: Array
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
