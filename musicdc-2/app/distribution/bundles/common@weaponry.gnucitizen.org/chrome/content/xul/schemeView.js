/**
 *  schemeView.js
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

function handleContentIframeDOMTitleChangedEvent(event) {
	let $contentIframe = document.getElementById('scheme-view-content-iframe');
	
	if (event.target != $contentIframe.contentDocument) {
		return;
	}
	
	document.title = event.target.title;
}

function handleContentIframeLoadEvent(event) {
	let targetDocument = event.target.contentDocument;
	
	handleContentIframeDOMTitleChangedEvent({target:targetDocument});
	
	targetDocument.addEventListener('DOMTitleChanged', handleContentIframeDOMTitleChangedEvent, false);
}

/* ------------------------------------------------------------------------ */

function handleDOMContentLoadedEvent(event) {
	if (event.target != document) {
		return;
	}
	
	document.originalTitle = document.title;
	
	let $contentIframe = document.getElementById('scheme-view-content-iframe');
	
	$contentIframe.addEventListener('DOMTitleChanged', handleContentIframeDOMTitleChangedEvent, false);
	$contentIframe.addEventListener('load', handleContentIframeLoadEvent, false);
	
	let coreURI = weaponryCommon.getWindowDocumentCoreURI(window);
	let uriMatch = coreURI.match(/uri=([^&]+)/);
	
	if (uriMatch) {
		$contentIframe.setAttribute('src', uriMatch[1]);
	}
}

addEventListener('DOMContentLoaded', handleDOMContentLoadedEvent, false);

/*  GNUCITIZEN (Information Security Think Tank)
 **********************************************/