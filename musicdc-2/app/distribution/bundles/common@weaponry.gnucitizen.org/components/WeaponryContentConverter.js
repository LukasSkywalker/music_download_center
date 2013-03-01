/**
 *  WeaponryContentConverter.js
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

function WeaponryContentConverter() {
	this.uri = null;
}

WeaponryContentConverter.prototype = {
	classDescription: 'Weaponry Content Converter',
	classID: Components.ID('{b4eb018f-cd1c-4696-b67c-3d7db8af02c2}'),
	contractID: '@common.weaponry.gnucitizen.org/content-converter;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWeaponryContentConverter, CI.nsIRequestObserver, CI.nsIStreamListener, CI.nsIStreamConverter]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	initWithUri: function (uri) {
		this.uri = uri;
	},
	
	/* -------------------------------------------------------------------- */
	
	onStartRequest: function (request, context) {
		let channel = request.QueryInterface(CI.nsIChannel);
		let requestedURL = channel.URI.spec;
		let newChannel = weaponryCommon.ioService.newChannel(this.uri, null, null);
		
		newChannel.asyncOpen(this.streamListener, context);
	},
	
	onStopRequest: function (request, context, statusCode) {
		// pass
	},
	
	onDataAvailable: function (request, context, inputStream, offset, count) {
		// pass
	},
	
	/* -------------------------------------------------------------------- */
	
	asyncConvertData: function (fromType, toType, listener, context) {
		this.streamListener = listener;
	},
	
	convert: function (fromStream, fromType, toType, context) {
		return fromStream;
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WeaponryContentConverter]);

/*  GNUCITIZEN (Information Security Think Tank)
 **********************************************/