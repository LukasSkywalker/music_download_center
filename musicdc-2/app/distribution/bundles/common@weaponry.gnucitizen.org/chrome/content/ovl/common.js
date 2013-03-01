/**
 *  common.js
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

Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

function ensureModule(uri, name) {
	if (!(name in window)) {
		let scope = {};
		
		Components.utils.import(uri, scope);
		
		window[name] = scope[name];
	}
}

/* ------------------------------------------------------------------------ */

function alert(message) {
	return weaponryCommon.alert(window, message);
}

function alertCheck(message, checkMessage) {
	return weaponryCommon.alertCheck(window, message, checkMessage);
}

/* ------------------------------------------------------------------------ */

function confirm(message) {
	return weaponryCommon.confirm(window, message);
}

function confirmCheck(message, checkMessage) {
	return weaponryCommon.confirmCheck(window, message, checkMessage);
}

/* ------------------------------------------------------------------------ */

function prompt(message, value) {
	return weaponryCommon.prompt(window, message, value);
}

/* ------------------------------------------------------------------------ */

installHandler('org.gnucitizen.weaponry.common', {
	closeWindow: function () {
		// TODO: this is a hack in order to fire the close event
		let event = document.createEvent('Event');
		
		event.initEvent('close', true, true);
		
		if (dispatchEvent(event) == true) {
			close();
		}
		//
	},
	
	setupVisualProperties: function () {
		let defaultLookAndFeel = weaponryCommon.getPref('org.gnucitizen.weaponry.common.defaultLookandfeel');
		let osType = weaponryCommon.xulRuntime.OS;
		let documentElement = document.documentElement;
		
		let osShort;
		
		if (osType == 'WINNT') {
			osShort = 'win';
		} else
		if (osType == 'Darwin') {
			osShort = 'mac';
		} else
		if (osType == 'Linux') {
			osShort = 'lin';
		} else {
			osShort = 'other';
		}
		
		if (defaultLookAndFeel) {
			documentElement.setAttribute('lookandfeel', defaultLookAndFeel);
		} else {
			documentElement.setAttribute('lookandfeel', osShort);
		}
		
		documentElement.setAttribute('uiflavour', osShort);
		
		let defaultUitype = weaponryCommon.getPref('org.gnucitizen.weaponry.common.defaultUitype');
		
		if (defaultUitype) {
			documentElement.setAttribute('uitype', defaultUitype);
		}
	},
	
	setupWindowArguments: function () {
		/* NOTE: it is probably not a good idea to copy parent arguments
		if (parent == window) {
			return;
		}
		
		if ('arguments' in window && window.arguments) {
			return;
		}
		
		if ('arguments' in parent) {
			window.arguments = parent.arguments;
		}
		*/
	},
	
	cleanupDocumentElements: function () {
		let nodes;
		let nodesLength;
		let i;
		let $node;
		
		if (parent != window) {
			nodes = document.querySelectorAll('menubar');
			nodesLength = nodes.length;
			
			for (i = 0; i < nodesLength; i += 1) {
				$node = nodes[i];
				
				$node.hidden = true;
			}
		}
		
		nodes = document.querySelectorAll('menu > menupopup:empty');
		nodesLength = nodes.length;
		
		for (i = 0; i < nodesLength; i += 1) {
			$node = nodes[i];
			
			$node.parentNode.hidden = true;
		}
		
		nodes = document.querySelectorAll('menu > menupopup:not(:empty)');
		nodesLength = nodes.length;
		
		for (i = 0; i < nodesLength; i += 1) {
			$node = nodes[i];
			
			if ((/^(\w+:)?menuseparator$/).test($node.firstChild.tagName)) {
				$node.firstChild.hidden = true;
			}
		}
	},
	
	setupParentInterlink: function () {
		if (parent != window) {
			let parentDocumentElement = parent.document.documentElement;
			let documentElement = document.documentElement;
			
			if (parentDocumentElement.hasAttribute('windowtype')) {
				documentElement.setAttribute('parentwindowtype', parentDocumentElement.getAttribute('windowtype'));
			}
		}
	},
	
	setupBindings: function () {
		if (parent == window) {
			bindHandler('common-close-window-command', 'command', 'return org.gnucitizen.weaponry.common.closeWindow(event);');
		} else {
			let $closeWindowKey = document.getElementById('common-close-window-key');
			
			$closeWindowKey.parentNode.removeChild($closeWindowKey);
		}
	},
	
	onDOMContentLoaded: function (event) {
		if (event.target != document) {
			return;
		}
		
		let self = org.gnucitizen.weaponry.common;
		
		self.setupVisualProperties();
		self.setupWindowArguments();
		self.cleanupDocumentElements();
		self.setupParentInterlink();
	},
	
	onLoad: function (event) {
		if (event.target != document) {
			return;
		}
		
		let self = org.gnucitizen.weaponry.common;
		
		self.cleanupDocumentElements();
		self.setupBindings();
	}
});

/*  GNUCITIZEN (Information Security Think Tank)
 **********************************************/