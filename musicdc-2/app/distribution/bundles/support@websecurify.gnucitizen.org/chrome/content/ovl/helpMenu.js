/**
 *  helpMenu.js
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

installHandler('org.gnucitizen.weaponry.support.helpMenu', {
	openHelp: function () {
		weaponryCommon.openUri('http://www.websecurify.com/wiki');
	},
	
	openSendFeedback: function () {
		weaponryCommon.openUri('http://www.websecurify.com/feedback');
	},
	
	openReportBugs: function () {
		weaponryCommon.openUri('http://www.websecurify.com/bugs');
	},
	
	openRequestFeatures: function () {
		weaponryCommon.openUri('http://www.websecurify.com/bugs');
	},
	
	gotoWeaponry: function () {
		weaponryCommon.openUri('http://www.websecurify.com');
	},
	
	gotoGnucitizen: function () {
		weaponryCommon.openUri('http://www.gnucitizen.com');
	},
	
	onDOMContentLoaded: function (event) {
		if (event.target != document) {
			return;
		}
		
		if (document.getElementById('help-menupopup')) {
			let self = org.gnucitizen.weaponry.support.helpMenu;
			
			bindHandler('websecurify-support-help-menu-help-menuitem', 'command', self.openHelp);
			bindHandler('websecurify-support-help-menu-send-feedback-menuitem', 'command', self.openSendFeedback);
			bindHandler('websecurify-support-help-menu-report-bugs-menuitem', 'command', self.openReportBugs);
			bindHandler('websecurify-support-help-menu-request-features-menuitem', 'command', self.openRequestFeatures);
			bindHandler('websecurify-support-help-menu-go-to-websecurify-menuitem', 'command', self.gotoWeaponry);
			bindHandler('websecurify-support-help-menu-go-to-gnucitizen-menuitem', 'command', self.gotoGnucitizen);
		}
	}
});

/*  GNUCITIZEN (Information Security Think Tank)
 **********************************************/