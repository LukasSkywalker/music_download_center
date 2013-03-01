/**
 *  express.js
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

function bindHandler(id, event, handler) {
	let $element = document.getElementById(id);
	
	if (!$element) {
		throw new Error('cannot find element with id ' + id);
	}
	
	if (typeof(handler) == 'string' || handler instanceof String) {
		let eventAttribute = 'on' + event.toLowerCase();
		
		$element.setAttribute(eventAttribute, handler);
	} else {
		$element.addEventListener(event, handler, false);
	}
}

function unbindHandler(id, event, handler) {
	let $element = document.getElementById(id);
	
	if (!$element) {
		throw new Error('cannot find element with id ' + id);
	}
	
	if (typeof(handler) == 'string' || handler instanceof String) {
		let eventAttribute = 'on' + event.toLowerCase();
		
		if ($element.hasAttribute(eventAttribute) && $element.getAttribute(eventAttribute) == handler) {
			$element.removeAttribute(eventAttribute);
		} else {
			throw new Error('cannot remove event ' + event);
		}
	} else {
		$element.removeEventListener(event, handler, false);
	}
}

/* ------------------------------------------------------------------------ */

function createNamespace(namespace, gadget, bindEvents) {
	let subject = window;
	let spaces = namespace.split('.');
	let spacesLength = spaces.length;
	
	for (let i = 0; i < spacesLength; i += 1) {
		let space = spaces[i];
		let collides = true;
		
		if (!(space in subject)) {
			subject[space] = {};
			
			collides = false;
		}
		
		if (i == spacesLength - 1 && gadget != undefined) {
			if (collides) {
				throw new Error('collision for namespace ' + namespace);
			}
			
			subject[space] = gadget;
		}
		
		subject = subject[space];
	}
	
	if (spacesLength > 0 && gadget != undefined) {
		if (bindEvents != undefined && bindEvents) {
			let events = {
				'onDOMContentLoaded': 'DOMContentLoaded',
				'onLoad': 'load',
				'onUnload': 'unload',
				'onClose': 'close'
			};
			
			for (let handler in events) {
				if (handler in subject) {
					addEventListener(events[handler], subject[handler], false);
				}
			}
		}
	}
	
	return subject;
}

/* ------------------------------------------------------------------------ */

function installHandler(namespace, handler) {
	return createNamespace(namespace, handler, true);
}

/*  GNUCITIZEN (Information Security Think Tank)
 **********************************************/