/**
 *  WeaponryBasicHttpRequest.js
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

function WeaponryBasicHttpRequest() {
	// pass
}

WeaponryBasicHttpRequest.prototype = {
	classDescription: 'Weaponry Basic HTTP Request',
	classID: Components.ID('{a251af40-aeff-11df-94e2-0800200c9a66}'),
	contractID: '@common.weaponry.gnucitizen.org/basic-http-request;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWeaponryBasicHttpRequest]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	init: function (scheme, host, port, request) {
		this.scheme = scheme.toLowerCase();
		this.host = host;
		this.port = port;
		this.request = request;
		
		if (!(this.scheme in {'http':1, 'https':1})) {
			throw new Error('unrecognized scheme: ' + this.scheme);
		}
		
		this.actualRequest = request;
		
		this.head = '';
		this.body = '';
		this.headers = '';
		
		let requestParts = this.parseRequest(request);
		
		this.requestMethod = requestParts.method;
		this.requestUrl = this.scheme + '://' + this.host + ':' + this.port + requestParts.url;
		this.requestData = data;
		this.requestHeaders = this.parseHeaders(requestParts.headers);
		
		this.xmlHttpRequest = CC['@mozilla.org/xmlextras/xmlhttprequest;1'].createInstance(CI.nsIXMLHttpRequest);
		
		this.xmlHttpRequest.withCredentials = true;
		this.xmlHttpRequest.mozBackgroundRequest = true;
		
		this.xmlHttpRequest.overrideMimeType('plain/text');
	},
	
	/* -------------------------------------------------------------------- */
	
	parseRequest: function (rquest) {
		let headEnd = request.indexOf('\r\n\r\n');
		
		let head = request.substring(0, headEnd + 2);
		let body = request.substring(headEnd + 4, request.length);
		
		let requestLineEnd = head.indexOf('\r\n');
		
		let requestLine = head.substring(0, requestLineEnd);
		let headers = head.substring(requestLineEnd + 2, head.length);
		
		let requestLineParts = requestLine.split(/\s+/g);
		
		let method = requestLineParts[0];
		let path = requestLineParts[1];
		
		return {method:method, path:path, headers:headers, data:'// TODO: data here'};
	},
	
	parseHeaders: function (headers) {
		let headersParts = {};
		let headerLines = headers.trim().split('\r\n');
		let headerLinesLength = headerLines.length;
		
		let i, headerLine, columnPossition, headerName, headerValue;
		
		for (i = 0; i < headerLinesLength; i += 1) {
			headerLine = headerLines[i];
			
			if (!headerLine.trim()) {
				continue;
			}
			
			columnPossition = headerLine.indexOf(':');
			headerName = headerLine.substring(0, columnPossition);
			headerValue = headerLine.substring(columnPossition + 1, headerLine.length);
			
			headersParts[headerName.trim()] = headerValue.trim();
		}
		
		return headersParts;
	},
	
	/* -------------------------------------------------------------------- */
	
	send: function (handler) {
		this.handler = handler;
		
		this.xmlHttpRequest.open(this.requestMethod, this.requestUrl, false);
		
		for (let headerName in this.requestHeaders) {
			this.xmlHttpRequest.setRequestHeader(headerName, this.requestHeaders[headerName]);
		}
		
		this.send(this.requestData);
	},
	
	sendAsynchronously: function (handler) {
		this.handler = handler;
		
		this.xmlHttpRequest.open(this.requestMethod, this.requestUrl, true);
		
		for (let headerName in this.requestHeaders) {
			this.xmlHttpRequest.setRequestHeader(headerName, this.requestHeaders[headerName]);
		}
		
		this.send(this.requestData);
	},
	
	/* -------------------------------------------------------------------- */
	
	abort: function () {
		this.xmlHttpRequest.abort();
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WeaponryBasicHttpRequest]);

/*  GNUCITIZEN (Information Security Think Tank)
 **********************************************/