var extendedlibrary = {
	onLoad: function() {
		// initialization code
		this.initialized = true;
		var strings = document.getElementById("extendedlibrary-strings");
		this.message = strings.getString('extendedlibrary.message');
		this.searchcomplete = strings.getString('extendedlibrary.searchcomplete');		
		this.of = strings.getString('extendedlibrary.of');		
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
	/*##################	VMP3	################################################*/
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
	/*##################	SKREEMR		################################################*/
		var data = extendedlibrary.getFile("http://skreemr.org/results.jsp?q="+escape(searchterm)+"&l=10&s=0");
		var pattern=/titles=(.*?) - (.*?)&amp;loader=0xAF2910&amp;soundFile=(.*?)\'>/g;
		var matches = new Array(10);
		var content = new Array(10);
		while (Ergebnis = pattern.exec(data)) {
			Ergebnis[3] = Ergebnis[3].replace("%3A", ":");
			content[0] = Ergebnis[3].replace("%2F", "/");
			content[1] = Ergebnis[1].replace("&#034;", "\"").replace("&#039;", "'");
			content[2] = Ergebnis[2].replace("&#034;","\"").replace("&#039;", "'");
			extendedlibrary.insertdata(content);
		}
		alert(extendedlibrary.searchcomplete);
	},
	
	insertdata: function( content ) {
		var oRootTreeChild = document.getElementById("child");
		var oItem = document.createElement("treeitem");
		oItem.setAttribute("id", content[0]+"%S"+content[1]+"%S"+content[2]);
		
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
		var x = extendedlibrary.downloadBinary(currentid);
	},
	
	downloadBinary: function(source) {
		var data = source.split("%S");
		var aURLToDownload = data[0];
		var persist = Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"]
						.createInstance(Components.interfaces.nsIWebBrowserPersist);
		var file = Components.classes["@mozilla.org/file/local;1"]
					 .createInstance(Components.interfaces.nsILocalFile);
		var path = extendedlibrary.filePicker(data);
		if (path) {
			file.initWithPath(path); // download destination
			var obj_URI = Components.classes["@mozilla.org/network/io-service;1"]
							.getService(Components.interfaces.nsIIOService)
							.newURI(aURLToDownload, null, null);
			persist.progressListener = {
			  onProgressChange: function(aWebProgress, aRequest, aCurSelfProgress, aMaxSelfProgress, aCurTotalProgress, aMaxTotalProgress) {
				var percentComplete = (aCurTotalProgress/aMaxTotalProgress)*100;
				var ele = document.getElementById("identifier");
				ele.innerHTML = percentComplete +"%";
				ele.value = percentComplete;
				var ele = document.getElementById("identifier-text");
				var current = aCurTotalProgress/1000000;
				var total = aMaxTotalProgress/1000000;
				ele.value = current.toFixed(2)+" "+extendedlibrary.of+" "+total.toFixed(2)+" MB ("+percentComplete.toFixed(1)+"%)";
			  },
			  onStateChange: function(aWebProgress, aRequest, aStateFlags, aStatus) {
				if (aStatus & Components.interfaces.nsIWebProgressListener.STATE_STOP)
					alert("Download complete");// do something
			  }
			}
			persist.saveURI(obj_URI, null, null, null, "", file);
		}
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

	filePicker: function(data) {
		const nsIFilePicker = Components.interfaces.nsIFilePicker;
		var fp = Components.classes["@mozilla.org/filepicker;1"]
						.createInstance(nsIFilePicker);
		fp.init(window, extendedlibrary.message, nsIFilePicker.modeSave);
		fp.appendFilters(nsIFilePicker.filterAll | nsIFilePicker.filterText);
		fp.defaultString = data[1]+" - "+data[2];
		fp.defaultExtension = "mp3";
		var rv = fp.show();
		if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
		  var file = fp.file;
		  var path = fp.file.path;
		  return path;
		}
		if (rv == nsIFilePicker.returnCancel) {
		  return "";
		}
	},
	
	openUrl: function(aUrl) {
		var win = Components.classes['@mozilla.org/appshell/window-mediator;1']
		  .getService(Components.interfaces.nsIWindowMediator)
		  .getMostRecentWindow('navigator:browser');
		win.openUILinkIn(aUrl, 'tab');
	},
	
	html_entity_decode: function(str) {
		var tarea=content.document.createElement('textarea'); // the "content" part is needed in buttons
		tarea.innerHTML = str;
		return tarea.value;
	},
};
window.addEventListener("load", function(e) { extendedlibrary.onLoad(e); }, false);