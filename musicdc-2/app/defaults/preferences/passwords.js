pref("signon.rememberSignons", true);
pref("signon.expireMasterPassword", false);
pref("signon.SignonFileName", "signons.txt");

Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager);
