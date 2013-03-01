/**
 *  mainWindow.js
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

Components.utils.import('resource://org.gnucitizen.websecurify.lite/content/mod/websecurifyLite.jsm');

/* ------------------------------------------------------------------------ */

let org_basic_http = websecurifyLite.loadLibrary('./org_basic_http.js');

/* ------------------------------------------------------------------------ */

let testImplementations = {
	current: null,
	priority: 0,
	
	setCurrentTestImplementation: function (name, priority) {
		if (priority > this.priority) {
			this.current = this[name];
		}
	},
	
	basic: {
		getWorker: function () {
			return new Worker('chrome://org.gnucitizen.websecurify.lite/content/imp/tester.js');
		},
		
		getOptions: function () {
			return {};
		},
		
		configureWorker: function (worker) {
			let hookDebugRoutines = weaponryCommon.getPref('org.gnucitizen.websecurify.scanner.basic.hookDebugRoutines');
			
			if (hookDebugRoutines) {
				worker.postMessage({hookDebugRoutines: {}});
			}
		},
		
		handleWorkerMessage: function (worker, data) {
			let $progressDataroll = document.getElementById('main-window-progress-dataroll');
			
			if (data.progress) {		
				let index = worker.index;
				
				$progressDataroll.updateDataRow({mode: 'determined', percentage: data.progress.percentage, status: data.progress.status}, index);
			} else
			if (data.report) {
				let index = worker.index;
				let entry = data.report;
				
				$progressDataroll.updateDataRow({status: entry.summary}, index);
				
				let $reportDataroll = document.getElementById('main-window-report-dataroll');
				
				if ($reportDataroll.obtainDataPos({signature: entry.signature}) == null) {
					entry.orderby = entry.level + '-' + entry.title;
					
					$reportDataroll.coupleDataRow(entry);
				}
				
				document.getElementById('main-window-report-featurebox').enabled = true;
			} else
			if (data.stop) {
				let index = worker.index;
				
				worker.terminate();
				
				testWorkers[index].removeEventListener('message', handleWorkerMessageEvent, false);
				testWorkers[index] = null;
				
				$progressDataroll.updateDataRow({mode: 'determined', state: 'stopped'}, index);
				
				let $stringbundle = document.getElementById('main-window-stringbundle');
				let $navigationRichsidepanel = document.getElementById('main-window-navigation-richsidebox');
				
				$navigationRichsidepanel.removeAllNotifications();
				$navigationRichsidepanel.displayNotification($stringbundle.getFormattedString('test-finished-message', [document.getElementById('main-window-report-dataroll').obtainDataLen()]), 'info');
			}
		},
		
		continueLaunchingTest: function () {
			// pass
		},
		
		cancelLaunchingTest: function () {
			// pass
		},
		
		pauseTest: function (index) {
			// pass
		},
		
		resumeTest: function (index) {
			// pass
		},
		
		stopTest: function (index) {
			// pass
		}
	}
};

/* ------------------------------------------------------------------------ */

testImplementations.setCurrentTestImplementation('basic', 1);

/* ------------------------------------------------------------------------ */

function getTestWorker() {
	return testImplementations.current.getWorker();
}

function getTestOptions() {
	return testImplementations.current.getOptions();
}

function configureWorker(worker) {
	return testImplementations.current.configureWorker(worker);
}

function handleWorkerMessageEvent(event) {
	return testImplementations.current.handleWorkerMessage(event.target, event.data);
}

/* ------------------------------------------------------------------------ */

let testWorkers = [];

/* ------------------------------------------------------------------------ */

function enterTest() {
	let $targetTextbox = document.getElementById('main-window-target-textbox');
	let targetUrl = $targetTextbox.value.trim();
	
	if (!targetUrl) {
		return;
	}
	
	if (!targetUrl.match(/^https?:\/\//i) && !targetUrl.match(/^\w+:/i)) {
		targetUrl = 'http://' + targetUrl;
	}
	
	try {
		let url = org_basic_http.Url.parse(targetUrl);
		
		if (!(url.getScheme().getValue() in {'http':1, 'https':1})) {
			throw new Error('incorrect scheme');
		}
		
		targetUrl = url.make();
	} catch (e) {
		document.getElementById('main-window-target-deck').selectedPanel = document.getElementById('main-window-error-vbox');
		
		$targetTextbox.select();
		
		return;
	}
	
	$targetTextbox.value = targetUrl;
	$targetTextbox.disabled = true;
	
	document.getElementById('main-window-target-deck').selectedIndex = 1;
}

/* ------------------------------------------------------------------------ */

function handleTargetTextboxKeypressEvent(event) {
	if (event.keyCode != KeyboardEvent.DOM_VK_RETURN) {
		return;
	}
	
	enterTest();
}

function handleConfirmCheckboxCommandEvent(event) {
	document.getElementById('main-window-continue-button').disabled = !event.target.checked;
}

/* ------------------------------------------------------------------------ */

function launchTest() {
	let targetUrl = document.getElementById('main-window-target-textbox').value;
	let worker = getTestWorker();
	
	worker.index = testWorkers.length;
	
	worker.addEventListener('message', handleWorkerMessageEvent, false);
	
	document.getElementById('main-window-progress-dataroll').appendDataRow({icon: 'chrome://org.gnucitizen.websecurify.scanner.basic/skin/xul/images/task.png', title: targetUrl, mode: 'undetermined', state: 'running', index: worker.index});
	document.getElementById('main-window-tasks-featurebox').enabled = true;
	
	configureWorker(worker);
	
	let options = getTestOptions();
	
	options.url = targetUrl;
	
	worker.postMessage({launchUrl: options});
	
	testWorkers.push(worker);
}

/* ------------------------------------------------------------------------ */

function continueLaunchingTest() {
	let $confirmCheckbox = document.getElementById('main-window-confirm-checkbox');
	
	if (!$confirmCheckbox.checked) {
		return;
	}
	
	$confirmCheckbox.checked = false;
	
	document.getElementById('main-window-continue-button').disabled = true;
	
	let $targetTextbox = document.getElementById('main-window-target-textbox');
	
	$targetTextbox.disabled = false;
	
	document.getElementById('main-window-target-deck').selectedPanel = 0;
	
	launchTest();
	
	weaponryCommon.recordHistroyForUrl($targetTextbox.value);
	weaponryCommon.recordFaviconForUrl($targetTextbox.value);
	
	let result = testImplementations.current.continueLaunchingTest();
	let target = $targetTextbox.value;
	
	$targetTextbox.value = '';
	
	let $stringbundle = document.getElementById('main-window-stringbundle');
	let $navigationRichsidebox = document.getElementById('main-window-navigation-richsidebox');
	
	$navigationRichsidebox.removeAllNotifications();
	$navigationRichsidebox.displayNotification($stringbundle.getFormattedString('test-launched-message', [target]), 'info');
	
	return result;
}

function cancelLaunchingTest() {
	document.getElementById('main-window-target-deck').selectedPanel = 0;
	
	let $targetTextbox = document.getElementById('main-window-target-textbox');
	
	$targetTextbox.disabled = false;
	
	$targetTextbox.focus();
	$targetTextbox.select();
	
	document.getElementById('main-window-confirm-checkbox').checked = false;
	document.getElementById('main-window-continue-button').disabled = true;
	
	return testImplementations.current.cancelLaunchingTest();
}

/* ------------------------------------------------------------------------ */

function handleProgressPauseButtonCommandEvent(event) {
	let index = parseInt(event.target.parentNode.parentNode.getAttribute('index'), 10);
	
	testWorkers[index].postMessage({pause: {}});
	
	let $progressDataroll = document.getElementById('main-window-progress-dataroll');
	
	let data = $progressDataroll.updateDataRow({state: 'resting'}, index);
	
	return testImplementations.current.pauseTest(index);
}

function handleProgressResumeButtonCommandEvent(event) {
	let index = parseInt(event.target.parentNode.parentNode.getAttribute('index'), 10);
	
	testWorkers[index].postMessage({resume: {}});
	
	let $progressDataroll = document.getElementById('main-window-progress-dataroll');
	
	let data = $progressDataroll.updateDataRow({state: 'running'}, index);
	
	return testImplementations.current.resumeTest(index);
}

function handleProgressStopButtonCommandEvent(event) {
	let index = parseInt(event.target.parentNode.parentNode.getAttribute('index'), 10);
	
	testWorkers[index].postMessage({stop: {}});
	
	return testImplementations.current.stopTest(index);
}

/* ------------------------------------------------------------------------ */

let reportTitles = {};

/* ------------------------------------------------------------------------ */

function reportIssueComputer(fields) {
	if (!('opening' in fields)) {
		if (fields.title in reportTitles) {
			fields.opening = false;
		} else {
			fields.opening = true;
			
			reportTitles[fields.title] = true;
		}
	}
}

/* ------------------------------------------------------------------------ */

function handleDOMContentLoadedEvent(event) {
	if (event.target != document) {
		return;
	}
	
	bindHandler('main-window-target-textbox', 'keypress', handleTargetTextboxKeypressEvent);
	bindHandler('main-window-confirm-checkbox', 'command', handleConfirmCheckboxCommandEvent)
	bindHandler('main-window-continue-button', 'command', continueLaunchingTest);
	bindHandler('main-window-cancel-button', 'command', cancelLaunchingTest);
	bindHandler('main-window-progress-pause-button', 'command', 'return handleProgressPauseButtonCommandEvent(event);');
	bindHandler('main-window-progress-resume-button', 'command', 'return handleProgressResumeButtonCommandEvent(event);');
	bindHandler('main-window-progress-stop-button', 'command', 'return handleProgressStopButtonCommandEvent(event);');
	
	let $reportDataroll = document.getElementById('main-window-report-dataroll');
	
	$reportDataroll.registerFieldsComputer(reportIssueComputer);
}

addEventListener('DOMContentLoaded', handleDOMContentLoadedEvent, false);

function handleUnloadEvent(event) {
	if (event.target != document) {
		return;
	}
	
	let testWorkersLength = testWorkers.length;
	
	for (let i = 0; i < testWorkersLength; i += 1) {
		let testWorker = testWorkers[i];
		
		if (testWorker) {
			testWorker.terminate();
			
			testWorkers[i] = null;
		}
	}
}

addEventListener('unload', handleUnloadEvent, false);

function handleCloseEvent(event) {
	if (event.target != window) {
		return;
	}
	
	if (document.getElementById('main-window-report-dataroll').obtainDataLen() > 0) {
		let $stringbundle = document.getElementById('main-window-stringbundle');
		
		if (confirm($stringbundle.getString('close-confirmation-message'))) {
			if (weaponryCommon.getPref('toolkit.defaultChromeURI') == location) {
				let windows = weaponryCommon.getAllWindowsByType('org.gnucitizen.websecurify.scanner.basic:main-window');
				
				if (windows.length == 1) {
					if (weaponryCommon.getPref('toolkit.singletonWindowType') == 'org.gnucitizen.websecurify.scanner.basic:main-window') {
						weaponryCommon.quitForcefully();
					}
				}
			}
		} else {
			event.preventDefault();
			
			return;
		}
	} else {
		if (weaponryCommon.getPref('toolkit.defaultChromeURI') == location) {
			let windows = weaponryCommon.getAllWindowsByType('org.gnucitizen.websecurify.scanner.basic:main-window');
			
			if (windows.length == 1) {
				if (weaponryCommon.getPref('toolkit.singletonWindowType') == 'org.gnucitizen.websecurify.scanner.basic:main-window') {
					weaponryCommon.quitForcefully();
				}
			}
		}
	}
	
	// NOTE: if this is not in place then the application will simply hang
	handleUnloadEvent({target: document});
	
	removeEventListener('unload', handleUnloadEvent, false);
	//
}

addEventListener('close', handleCloseEvent, false);

/*  GNUCITIZEN (Information Security Think Tank)
 **********************************************/