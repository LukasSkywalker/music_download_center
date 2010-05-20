var extendedlibrary = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("extendedlibrary-strings");
  },
  onMenuItemCommand: function(e) {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                  .getService(Components.interfaces.nsIPromptService);
    window.open("chrome://extendedlibrary/content/main.xul", "", "chrome=yes,resizeable=yes, width=800,height=600");
  },

};
window.addEventListener("load", function(e) { extendedlibrary.onLoad(e); }, false);