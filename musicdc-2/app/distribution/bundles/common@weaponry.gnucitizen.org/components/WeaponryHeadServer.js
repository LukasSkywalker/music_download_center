/**
 *  WeaponryHeadServer.js
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

function HeadProcessor() {
	this.inputStream = undefined;
	this.outputStream = undefined;
	this.headHandler = undefined;
	this.head = '';
}

HeadProcessor.prototype = {
	QueryInterface: XPCOMUtils.generateQI([CI.nsIInputStreamCallback]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	init: function (inputStream, outputStream, headHandler) {
		this.inputStream = inputStream;
		this.outputStream = outputStream;
		this.headHandler = headHandler;
	},
	
	/* -------------------------------------------------------------------- */
	
	onInputStreamReady: function (inputStream) {
		let count = 0;
		
		try {
			count = inputStream.available();
		} catch (e) {
			inputStream.close();
			outputStream.close();
			
			return;
		}
		
		let pushbackInputStream = CC['@common.weaponry.gnucitizen.org/pushback-input-stream;1'].createInstance(CI.IWeaponryPushbackInputStream);
		
		pushbackInputStream.init(inputStream);
		
		let data = this.head + pushbackInputStream.read(count);
		let crlfPossition = data.indexOf('\r\n\r\n');
		
		if (crlfPossition > 0) {
			this.head = data.substring(0, crlfPossition + 2);
			
			data = data.substring(crlfPossition + 2, data.length);
			
			pushbackInputStream.unread(data);
			
			this.handleHeadRequest(this.head, pushbackInputStream, this.outputStream);
		} else {
			inputStream.asyncWait(this, 0, 0, this.threadManager.mainThread);
		}
	},
	
	/* -------------------------------------------------------------------- */
	
	handleHeadRequest: function (head, inputStream, outputStream) {
		this.headHandler.handleHeadRequest(head, inputStream, outputStream);
	}
};

/* ------------------------------------------------------------------------ */

function WeaponryHeadServer() {
	this.serverSocket = CC['@mozilla.org/network/server-socket;1'].createInstance(CI.nsIServerSocket);
	this.threadManager = CC['@mozilla.org/thread-manager;1'].getService(CI.nsIThreadManager);
	this.headHandler = undefined;
}

WeaponryHeadServer.prototype = {
	classID: Components.ID('{482cd6e0-e47c-11df-bccf-0800200c9a66}'),
	contractID: '@common.weaponry.gnucitizen.org/head-server;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWeaponryHeadServer, CI.nsIServerSocketListener]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	init: function (port, handler, backlog, isLoopback) {
		this.headHandler = handler;
		
		isLoopback = (isLoopback == undefined) ? true : (isLoopback ? true : false);
		backlog = (backlog == undefined) ? -1 : (backlog > 0 ? backlog : CI.IWeaponryHeadServer.DEFAULT_BACKLOG);
		
		this.serverSocket.init(port, isLoopback, backlog);
	},
	
	/* -------------------------------------------------------------------- */
	
	start: function () {
		this.serverSocket.asyncListen(this);
	},
	
	stop: function () {
		this.serverSocket.close();
	},
	
	/* -------------------------------------------------------------------- */
	
	onSocketAccepted: function (socket, transport) {
		let inputStream = transport.openInputStream(0, CI.IWeaponryHeadServer.DEFAULT_SEGMENT_SIZE, CI.IWeaponryHeadServer.DEFAULT_SEGMENT_COUNT);
	    let outputStream = transport.openOutputStream(0, CI.IWeaponryHeadServer.DEFAULT_SEGMENT_SIZE, CI.IWeaponryHeadServer.DEFAULT_SEGMENT_COUNT);
		let asyncInputStream = inputStream.QueryInterface(CI.nsIAsyncInputStream);
		let headProcessor = new HeadProcessor();
		
		headProcessor.init(inputStream, outputStream, this.headHandler);
		
		asyncInputStream.asyncWait(headProcessor, 0, 0, this.threadManager.currentThread);
	},
	
	onStopListening: function (socket, status) {
		// pass
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WeaponryHeadServer]);

/*  GNUCITIZEN (Information Security Think Tank)
 **********************************************/