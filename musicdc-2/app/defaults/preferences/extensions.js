pref("xpinstall.dialog.confirm", "chrome://mozapps/content/xpinstall/xpinstallConfirm.xul");
pref("xpinstall.dialog.progress.skin", "chrome://mozapps/content/extensions/extensions.xul?type=themes");
pref("xpinstall.dialog.progress.chrome", "chrome://mozapps/content/extensions/extensions.xul?type=extensions");
pref("xpinstall.dialog.progress.type.skin", "Extension:Manager-themes");
pref("xpinstall.dialog.progress.type.chrome", "Extension:Manager-extensions");
pref("extensions.update.enabled", true);
pref("extensions.update.interval", 86400);
pref("extensions.dss.enabled", false);
pref("extensions.dss.switchPending", false);
pref("extensions.ignoreMTimeChanges", false);
pref("extensions.logging.enabled", false);
pref("general.skins.selectedSkin", "classic/1.0");
// NB these point at AMO
pref("extensions.update.url", "chrome://mozapps/locale/extensions/extensions.properties");
pref("extensions.getMoreExtensionsURL", "chrome://mozapps/locale/extensions/extensions.properties");
pref("extensions.getMoreThemesURL", "chrome://mozapps/locale/extensions/extensions.properties");

// Don't show add-on selection dialog
pref("extensions.shownSelectionUI", true);
pref("extensions.autoDisableScope", 11);

// Preferences for add-on discovery
pref("extensions.getAddons.cache.enabled", false);
pref("extensions.getAddons.maxResults", 15);
pref("extensions.getAddons.get.url", "https://services.addons.mozilla.org/%LOCALE%/%APP%/api/%API_VERSION%/search/guid:%IDS%?src=thunderbird&appOS=%OS%&appVersion=%VERSION%&tMain=%TIME_MAIN%&tFirstPaint=%TIME_FIRST_PAINT%&tSessionRestored=%TIME_SESSION_RESTORED%");
pref("extensions.getAddons.search.browseURL", "https://addons.mozilla.org/%LOCALE%/%APP%/search?q=%TERMS%");
pref("extensions.getAddons.search.url", "https://services.addons.mozilla.org/%LOCALE%/%APP%/api/%API_VERSION%/search/%TERMS%/all/%MAX_RESULTS%/%OS%/%VERSION%?src=thunderbird");
