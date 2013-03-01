/**
 *  weaponryExtensions.jsm
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

let EXPORTED_SYMBOLS = ['weaponryExtensions'];

/* ------------------------------------------------------------------------ */

const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

let weaponryExtensions = new function () {
	let weaponryExtensions = this;
	
	/* -------------------------------------------------------------------- */
	
	this.extensionsService = weaponryCommon.getService('@extensions.weaponry.gnucitizen.org/service;1', 'IWeaponryExtensionsService');
};

/*  GNUCITIZEN (Information Security Think Tank)
 **********************************************/