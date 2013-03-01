/**
 *  WeaponryTerminalLauncher.js
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

function WeaponryTerminalLauncher() {
	// pass
}

WeaponryTerminalLauncher.prototype = {
	classDescription: 'Weaponry Terminal Launcher',
	classID: Components.ID('{484638d0-5e15-11df-a08a-0800200c9a66}'),
	contractID: '@common.weaponry.gnucitizen.org/terminal-launcher;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWeaponryTerminalLauncher]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	launchTerminal: function (command) {
		let os = weaponryCommon.xulRuntime.OS;
		
		if (os == 'Darwin') {
			if (command) {
				weaponryCommon.executeFile('/usr/bin/osascript', weaponryCommon.getChromeUriFilePath('chrome://org.gnucitizen.weaponry.common/content/bin/weaponryTerminalLauncher.scpt'), command);
			} else {
				weaponryCommon.executeFile('/usr/bin/osascript', weaponryCommon.getChromeUriFilePath('chrome://org.gnucitizen.weaponry.common/content/bin/weaponryTerminalLauncher.scpt'));
			}
		} else
		if (os == "Linux") {
			if (command) {
				weaponryCommon.executeFile('/bin/sh', weaponryCommon.getChromeUriFilePath('chrome://org.gnucitizen.weaponry.common/content/bin/weaponryTerminalLauncher.sh'), command);
			} else {
				weaponryCommon.executeFile('/bin/sh', weaponryCommon.getChromeUriFilePath('chrome://org.gnucitizen.weaponry.common/content/bin/weaponryTerminalLauncher.sh'));
			}
		} else
		if (os == 'WINNT') {
			if (command) {
				weaponryCommon.executeFile('cmd.exe', '/C', weaponryCommon.getChromeUriFilePath('chrome://org.gnucitizen.weaponry.common/content/bin/weaponryTerminalLauncher.cmd'), command);
			} else {
				weaponryCommon.executeFile('cmd.exe', '/K', weaponryCommon.getChromeUriFilePath('chrome://org.gnucitizen.weaponry.common/content/bin/weaponryTerminalLauncher.cmd'));
			}
		} else {
			throw new Error('unsupported os');
		}
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WeaponryTerminalLauncher]);

/*  GNUCITIZEN (Information Security Think Tank)
 **********************************************/