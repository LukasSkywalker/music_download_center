function Album(name, artist, id, mbid, url, image) {
  // the params required in the constructor are those
  // returned by last's album.search method
  this.name = '';
  this.artist = '';
  this.id = 0;
  this.mbid = '';
  this.url = '';
  this.releasedate = 0;
  this.toptags = [];
  this.tracks = [];
  this.image = '';
}

Album.prototype.toString = function albumToString() {
  var ret = "Album " + this.name + " by " + this.artist + " has id " + this.id + " and mbid " + this.mbid;
  return ret;
}

// Instance methods
Album.prototype.getInfo = function getAlbumInfo() {
  // http://www.lastfm.de/api/show/album.getInfo
  var api = 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=207b43760076e1463911df273e7ba923&format=json&mbid=%MBID%';
  var url = api.replace("%MBID%", this.mbid);
  main.get(url, this.parseInfo);
}

Album.prototype.parseInfo = function parseAlbumInfo( data ) {
  var obj = JSON.parse(data);
  var album = obj.album;
  this.releasedate = album.releasedate;
  this.toptags = album.toptags;
  var tracks = album.tracks;
  for( var i = 0; i < tracks.length; i++ ) {
    var t = tracks[i];
    var track = new Track(t.name, t.artist.name, t.duration, t.url);
  }
}



// Class methods
Album.search = function( searchterm ) {
  // http://www.lastfm.de/api/show/album.search
  var api = 'http://ws.audioscrobbler.com/2.0/?method=album.search&api_key=207b43760076e1463911df273e7ba923&format=json&album=%ALBUM%';
  var url = api.replace("%ALBUM%", unescape(searchterm));
  main.get(url, Album.parseSearch);
}

Album.parseSearch = function( data ) {
  var obj = JSON.parse(data);
  var results = obj.results;
  var albums = results.albummatches;
  for( var i = 0; i < albums.length; i++ ) {
    var a = albums[i];
    var album = new Album(a.name, a.artist, a.id, a.mbid, a.url, a.image[1]['#text']);
    console.log(album);
  }
}
