/**
 *  preferencesPrefwindow.js
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

function openProxyDialog() {
	openDialog('chrome://org.gnucitizen.weaponry.preferences/content/xul/proxyPrefwindow.xul', null, 'chrome,modal,centerscreen');
}

function openSecurityCertificatesDialog() {
	openDialog('chrome://pippki/content/certManager.xul', null, 'chrome,modal,centerscreen');
}

function openSecurityDevicesDialog() {
	openDialog('chrome://pippki/content/device_manager.xul', null, 'chrome,modal,centerscreen');
}

function openRegistryDialog() {
	openDialog('chrome://org.gnucitizen.weaponry.preferences/content/xul/registryDialog.xul', null, 'chrome,modal,centerscreen');
}

/* ------------------------------------------------------------------------ */

function handleDOMContentLoadedEvent(event) {
	if (event.target != document) {
		return;
	}
	
	bindHandler('preferences-prefwindow-open-proxy-dialog-button', 'command', openProxyDialog);
	bindHandler('preferences-prefwindow-open-security-certificates-dialog-button', 'command', openSecurityCertificatesDialog);
	bindHandler('preferences-prefwindow-open-security-devices-dialog-button', 'command', openSecurityDevicesDialog);
	bindHandler('preferences-prefwindow-open-registry-dialog-button', 'command', openRegistryDialog);
}

addEventListener('DOMContentLoaded', handleDOMContentLoadedEvent, false);

/*  GNUCITIZEN (Information Security Think Tank)
 **********************************************/