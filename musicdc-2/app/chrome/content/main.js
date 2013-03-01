/**
 * This object contains the various functions for the interface
 */
const main = new function() {
  this.navigateTo = function( location ) {
    document.getElementById('content').setAttribute('src', location);
  }
  
  this.openAboutDialog = function() {
		window.openDialog('chrome://mdc/content/about.xul', 'about', 'chrome');
	}

	this.checkForUpdates = function() {
		window.open('chrome://mozapps/content/update/updates.xul', 'updateChecker', 'chrome,centerscreen');
	}
	
	this.get = function(url, callback) {
	  var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function(ev){
      console.log(xhr.readyState, xhr.status );
      if(xhr.readyState === 4 && xhr.status === 200){
        callback(xhr.responseText);
      }
    }
    xhr.send(null);
	}

  this.openAddonsMgr = function() {
    const EMTYPE = "Addons:Manager";
    var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
          .getService(Components.interfaces.nsIWindowMediator);
    var theEM = wm.getMostRecentWindow(EMTYPE);
    if (theEM) {
        theEM.focus();
        return;
    }

    const EMURL = "chrome://mozapps/content/extensions/extensions.xul";
    const EMFEATURES = "chrome,menubar,extra-chrome,toolbar,dialog=no,resizable";
    window.openDialog(EMURL, 'addonsManager', EMFEATURES);
    }

    this.openErrorConsole = function() {
      const EMTYPE = "global:console";
      var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
          .getService(Components.interfaces.nsIWindowMediator);
      var theEM = wm.getMostRecentWindow(EMTYPE);
      if (theEM) {
        theEM.focus();
        return;
      }
      const EMURL = "chrome://global/content/console.xul";
      const EMFEATURES = "chrome,menubar,extra-chrome,toolbar,dialog=no,resizable";
      window.openDialog(EMURL, 'errorConsole', EMFEATURES);
    }
}
