describe("Album", function() {
  //var album;
  //var song;

  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();
      var requests = this.requests = [];
      this.xhr.onCreate = function (xhr) {
        requests.push(xhr);
      };
  });
  
  afterEach(function() {
    this.xhr.restore();
  });

  describe("album search", function() {
    beforeEach(function() {
      //album = new Album();
    });

    it("should parse successful result", function() {
      Album.search('The Killers Sam\'s Town');
      expect(1).toEqual(this.requests.length);
      this.requests[0].respond(200, { "Content-Type": "application/json" }, albumSearch.success);
    });

    it("should parse error result", function() {
      Album.search('The Killers Sam\'s Town');
      expect(1).toEqual(this.requests.length);
      this.requests[0].respond(200, { "Content-Type": "application/json" }, albumSearch.error);
    });
  });
});


var albumSearch = {
  success : '{"results":{"opensearch:Query":{"#text":"","role":"request","searchTerms":"the killers hot fuss","startPage":"1"},"opensearch:totalResults":"2","opensearch:startIndex":"0","opensearch:itemsPerPage":"50","albummatches":{"album":[{"name":"Hot Fuss","artist":"The Killers","id":"1419232","url":"http:\/\/www.last.fm\/music\/The+Killers\/Hot+Fuss","image":[{"#text":"http:\/\/userserve-ak.last.fm\/serve\/34s\/68101062.png","size":"small"},{"#text":"http:\/\/userserve-ak.last.fm\/serve\/64s\/68101062.png","size":"medium"},],"streamable":"0","mbid":"81553d43-3f83-36b2-a017-1394b6b4b675"},{"name":"Hot Fuss: Limited Edition","artist":"The Killers","id":"2281320","url":"http:\/\/www.last.fm\/music\/The+Killers\/Hot+Fuss:+Limited+Edition","image":[{"#text":"http:\/\/userserve-ak.last.fm\/serve\/34s\/82729219.png","size":"small"},{"#text":"http:\/\/userserve-ak.last.fm\/serve\/64s\/82729219.png","size":"medium"},{"#text":"http:\/\/userserve-ak.last.fm\/serve\/126\/82729219.png","size":"large"},{"#text":"http:\/\/userserve-ak.last.fm\/serve\/300x300\/82729219.png","size":"extralarge"}],"streamable":"0","mbid":""}]},"@attr":{"for":"the killers hot fuss"}}}',

  error : '{"error":10,"message":"Invalid API key - You must be granted a valid key by last.fm","links":[]}'
}
