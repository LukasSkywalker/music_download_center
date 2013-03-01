// This is the URI that is loaded when Zotero Standalone is opened
pref("toolkit.defaultChromeURI", "chrome://mdc/content/main.xul");
//pref("toolkit.defaultChromeURI", "chrome://mdc/content/main.xul");

// We only want a single window, I think
pref("toolkit.singletonWindowType", "XULApp:Main");

// For debugging purposes, show errors in console by default
pref("javascript.options.showInConsole", true);

// Don't retrieve unrequested links when performing standalone translation
pref("network.prefetch-next", false);

// Let operations run as long as necessary
pref("dom.max_chrome_script_run_time", 0);

// Enable JaegerMonkey
pref("javascript.options.methodjit.chrome", true);

// Use OS locale
pref("intl.locale.matchOS", true);
pref("intl.charset.default", "UTF-8");

// Never go offline
pref("offline.autoDetect", false);
pref("network.manage-offline-status", false);

// Disable graphics acceleration
pref("layers.acceleration.disabled", true);
pref("gfx.direct2d.disabled", true);

// Without this, we will throw up dialogs if asked to translate strange pages
pref("browser.xul.error_pages.enabled", true);

// Without this, scripts may decide to open popups
pref("dom.disable_open_during_load", true);

// Don't show security warning. The "warn_viewing_mixed" warning just lets the user know that some
// page elements were loaded over an insecure connection. This doesn't matter if all we're doing is
// scraping the page, since we don't provide any information to the site.
pref("security.warn_viewing_mixed", false);

// Allow installing XPIs from any host
pref("xpinstall.whitelist.required", false);

// Disable places
pref("places.history.enabled", false);

// suppress external-load warning for standard browser schemes
pref("network.protocol-handler.warn-external.http", false);
pref("network.protocol-handler.warn-external.https", false);
pref("network.protocol-handler.warn-external.ftp", false);

/* debugging prefs */
pref("browser.dom.window.dump.enabled", true);
pref("javascript.options.showInConsole", false);
pref("javascript.options.strict", false);
pref("nglayout.debug.disable_xul_cache", true);
pref("nglayout.debug.disable_xul_fastload", true);

pref("intl.locale.matchOS", "false");
pref("general.useragent.locale", "en-US");
