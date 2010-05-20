var extendedlibrary = {
	onLoad: function() {
		// initialization code
		this.initialized = true;
		this.strings = document.getElementById("extendedlibrary-strings");
	},
	
	getFile: function(source) {
		var req = new XMLHttpRequest();
		req.open('GET', source, false); 
		req.send(null);
		if(req.status == 200){
			var aMessage = req.responseText;
		}
		return aMessage;
	},

	searchCommand: function() {
		var searchterm = document.getElementById("find-text").value;
		var data = extendedlibrary.getFile("http://vmp3.eu/download/mp3/"+escape(searchterm));
		var pattern=/\(\'(.*?)(?=\',\'download\')/g;
		var counter=0;
		var matches = new Array(100);
		while (Ergebnis = pattern.exec(data)) {
			matches[counter] = Ergebnis[1];
			++counter;
		}
		var Ergebnis2 = new Array(counter);
		if (matches){
			for (var i = 0; i < counter; ++i) {
				var content = new Array(3);
				var datas = extendedlibrary.getFile(matches[i]);
				var re = new RegExp("<a href=\"(.*?)\" rel=");
					var m = re.exec(datas);				
				content = extendedlibrary.readTags(datas);
								content[0]=m[1];
				extendedlibrary.insertdata(content);
			}
		}
		alert("End");
	},
	
	insertdata: function( content ) {
		var oRootTreeChild = document.getElementById("child");
		var oItem = document.createElement("treeitem");
		oItem.setAttribute("id", content[0]);
		
		var oRow = document.createElement("treerow");
		
		var oCell = document.createElement("treecell");
		oCell.setAttribute("label",content[1]);
		oRow.appendChild(oCell);
		
		oCell = document.createElement("treecell");
		oCell.setAttribute("label",content[2]);
		oRow.appendChild(oCell);
		
		oItem.appendChild(oRow);
		oRootTreeChild.appendChild(oItem);
	},
	
	onTreeSelected: function(){
		var tree = document.getElementById("maintree");
        var currentitem = tree.treeBoxObject.view.getItemAtIndex(tree.currentIndex);
        var currentid = tree.treeBoxObject.view.getItemAtIndex(
                   tree.currentIndex).getAttribute("id");
		var x = extendedlibrary.downloadBinary(currentid, "download.mp3");
	},
	
	downloadBinary: function(source, destination) {
		var aURLToDownload = source;
		var persist = Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"]
						.createInstance(Components.interfaces.nsIWebBrowserPersist);
		var file = Components.classes["@mozilla.org/file/local;1"]
					 .createInstance(Components.interfaces.nsILocalFile);
		file.initWithPath("C:\\Users\\Lukas\\Desktop\\file.mp3"); // download destination
		var obj_URI = Components.classes["@mozilla.org/network/io-service;1"]
						.getService(Components.interfaces.nsIIOService)
						.newURI(aURLToDownload, null, null);
		persist.progressListener = {
		  onProgressChange: function(aWebProgress, aRequest, aCurSelfProgress, aMaxSelfProgress, aCurTotalProgress, aMaxTotalProgress) {
			var percentComplete = (aCurTotalProgress/aMaxTotalProgress)*100;
			var ele = document.getElementById("identifier");
			ele.innerHTML = percentComplete +"%";
			ele.value = percentComplete;
		  },
		  onStateChange: function(aWebProgress, aRequest, aStateFlags, aStatus) {
			if (aStatus & Components.interfaces.nsIWebProgressListener.STATE_STOP)
				meh.jsdump("Hey, it just stopped!");// do something
		  }
		}
		persist.saveURI(obj_URI, null, null, null, "", file);
	},
	readTags: function(data) {
		var content = new Array(3);
		data = String(data);
		var re = new RegExp("<title>(.*?) - (.*?) Download<\/title>");
		  var m = re.exec(data);
		content[1] = m[1];
		content[2] = m[2];

		return content;
	},	
};
window.addEventListener("load", function(e) { extendedlibrary.onLoad(e); }, false);