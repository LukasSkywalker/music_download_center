/**
 *  websecurifyLite.jsm
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

let EXPORTED_SYMBOLS = ['websecurifyLite'];

/* ------------------------------------------------------------------------ */

const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

let websecurifyLite = new function () {
	let websecurifyLite = this;
	
	/* -------------------------------------------------------------------- */
	
	this.websecurifyLiteService = weaponryCommon.getService('@lite.websecurify.gnucitizen.org/service;1', 'IWebsecurifyLiteService');
	
	/* -------------------------------------------------------------------- */
	
	this.loadLibraryEx = function (base, library, scope) {
		if (scope == undefined) {
			scope = {};
		}
		
		if (!('exports' in scope)) {
			scope.exports = {};
		}
		
		scope.require = function (library) {
			let scope = {exports: {}, require: arguments.callee};
			
			weaponryCommon.loadSubscript(base + library, scope);
			
			return scope.exports;
		};
		
		return scope.require(library);
	};
	
	this.loadLibrary = function (library, scope) {
		return this.loadLibraryEx('resource://org.gnucitizen.websecurify.lite/content/imp/', library, scope);
	};
};

/*  GNUCITIZEN (Information Security Think Tank)
 **********************************************/