/**
 *  toolsMenu.js
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

// TODO: open and check addons window specific to the current configuration, i.e org.gnucitizen.weaponry.extensions.eanbled
installHandler('org.gnucitizen.weaponry.extensions.toolsMenu', {
	openAddOns: function () {
		weaponryCommon.openAddOnsWindow();
	},
	
	onDOMContentLoaded: function (event) {
		if (event.target != document) {
			return;
		}
		
		if (document.getElementById('tools-menupopup')) {
			bindHandler('weaponry-extensions-tools-menu-open-add-ons-command', 'command', 'return org.gnucitizen.weaponry.extensions.toolsMenu.openAddOns(event);');
		}
	}
});
//

/*  GNUCITIZEN (Information Security Think Tank)
 **********************************************/