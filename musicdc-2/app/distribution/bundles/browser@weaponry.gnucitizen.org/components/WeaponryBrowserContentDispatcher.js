/**
 *  WeaponryBrowserContentDispatcher.js
 *  Copyright (C) 2007-2011  GNUCITIZEN
 *  
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *  
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');
Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

function WeaponryBrowserContentDispatcher() {
	// pass
}

WeaponryBrowserContentDispatcher.prototype = {
	classDescription: 'Weaponry Browser Content Dispatcher',
	classID: Components.ID('{1ff99808-2fd4-4253-8511-e3cf03cd1477}'),
	contractID: '@browser.weaponry.gnucitizen.org/content-dispatcher;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWeaponryBrowserContentDispatcher, CI.nsISupportsWeakReference, CI.nsIURIContentListener, CI.nsIContentHandler]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	GetWeakReference: function () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	realLoadCookie: null,
    realParentContentListener: null,
	
	/* -------------------------------------------------------------------- */
	
	get loadCookie () {
		return this.realLoadCookie;
	},
	
	set loadCookie (value) {
		this.realLoadCookie = value;
	},
	
	get parentContentListener () {
		return this.realParentContentListener;
	},
	
	set parentContentListener (value) {
		this.realParentContentListener = value;
	},
	
	onStartURIOpen: function (uri) {
		return false;
	},
	
	doContent: function (contentType, isContentPreferred, request, contentHandler) {
		// TODO: add code here
	},
	
	isPreferred: function (contentType) {
		// TODO: get contentTypes from the browser service
		return this.contentTypes.indexOf(contentType) < 0;
		//
	},
	
	canHandleContent: function (contentType, isContentPreferred) {
		return null;
	},
	
	/* -------------------------------------------------------------------- */
	
	handleContent: function (contentType, windowContext, request) {
		try {
			request.QueryInterface(CI.nsIChannel);
		} catch (e) {
			Components.utils.reportError('cannot handle request, passing to the next handler');
			
			throw CR.NS_ERROR_WONT_HANDLE_CONTENT;
		}
		
		weaponryCommon.getService('@browser.weaponry.gnucitizen.org/service;1', 'IWeaponryBrowserService').openBrowserView(request.URI.spec);
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WeaponryBrowserContentDispatcher]);

/*  GNUCITIZEN (Information Security Think Tank)
 **********************************************/