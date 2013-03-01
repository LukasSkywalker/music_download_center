/**
 *  WeaponryPushbackInputStream.js
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

/* ------------------------------------------------------------------------ */

function WeaponryPushbackInputStream() {
	this.inputStream = undefined;
	this.data = '';
}

WeaponryPushbackInputStream.prototype = {
	classDescription: 'Weaponry Pushback Input Stream',
	classID: Components.ID('{b1ed27d0-cf35-11df-bd3b-0800200c9a66}'),
	contractID: '@common.weaponry.gnucitizen.org/pushback-input-stream;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWeaponryPushbackInputStream, CI.nsIScriptableInputStream, CI.nsIInputStream]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	init: function (inputStream) {
		if (inputStream instanceof CI.IWeaponryPushbackInputStream) {
			if (this.wrappedJSObject) {
				this.inputStream = inputStream.wrappedJSObject.inputStream;
				this.data = inputStream.wrappedJSObject.data;
			} else {
				this.inputStream = inputStream;
			}
		} else
		if (inputStream instanceof CI.nsIBinaryInputStream) {
			this.inputStream = inputStream;
		} else {
			this.inputStream = CC['@mozilla.org/binaryinputstream;1'].createInstance(CI.nsIBinaryInputStream);
			
			this.inputStream.setInputStream(inputStream);
		}
	},
	
	/* -------------------------------------------------------------------- */
	
	close: function () {
		this.data = '';
		
		this.inputStream.close();
	},
	
	/* -------------------------------------------------------------------- */
	
	read: function (count) {
		if (this.data.length >= count) {
			let data = this.data.slice(0, count);
			
			this.data = this.data.slice(count, this.data.length);
			
			return data;
        } else {
			let data = this.data;
			
			this.data = '';
			
			data = data + this.inputStream.readBytes(count - data.length);
			
			return data;
        }
	},
	
	unread: function (data) {
		this.data = data + this.data;
		
		return data.length;
	},
	
	/* -------------------------------------------------------------------- */
	
	readBytes: function (count) {
		throw new Error('not implemented: readBytes'); // TODO: add code here
	},
	
	unreadBytes: function (data) {
		throw new Error('not implemented: unreadBytes'); // TODO: add code here
	},
	
	/* -------------------------------------------------------------------- */
	
	available: function () {
		try {
			return this.data.length + this.inputStream.available();
		} catch (e) {
			if (this.data.length > 0) {
				return this.data.length;
			} else {
				throw e;
			}
		}
	},
	
	/* -------------------------------------------------------------------- */
	
	isNonBlocking: function () {
		if (this.inputStream instanceof CI.nsIInputStream) {
			return this.inputStream.isNonBlocking();
		} else {
			return true;
		}
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WeaponryPushbackInputStream]);

/*  GNUCITIZEN (Information Security Think Tank)
 **********************************************/