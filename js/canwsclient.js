var wsUri = "ws://10.0.1.9:28700/";var reconnectInterval = 5000;

var websocket = null;

var fd = new Object();
fd['000d'] = new Array(4, 4, 4, 4, 4);
fd['008d'] = new Array(4, 4, 4, 4, 4);
fd['010d'] = new Array(4, 4, 4, 4, 4);
fd['070d'] = new Array(4, 4, 4, 4, 4);
fd['000'] = new Array("fl_speed", "Front Left Wheel Speed", "x", 0.06, "fr_speed", "Front Right Wheel Speed", "x", 0.06, "rl_speed", "Rear Left Wheel Speed", "x", 0.06, "rr_speed", "Rear Right Wheel Speed", "x", 0.06);
fd['008'] = new Array("TPSA", "Throttle Position A", "d", 10, "TPSB", "Throttle Position B", "d", 10, "PPS", "Pedal Position", "d", 10, "fbwTargetTps", "Throttle Demand", "d", 81.92);
fd['010'] = new Array("ACT", "Air Temperature", "xm", new Array(10, 100), "ECT", "Water Temperature", "xm", new Array(10, 100), "EOT", "Oil Temperature", "xm", new Array(10, 100), "FL", "Fuel Level", "d", 10);
fd['070'] = new Array("RPM", "Engine Speed", "x", 1, "MAP", "Manifold Absolute Pressure", "x", 1, "engineStatus", "ECU Status", "b", 0, "car_speed", "Speed", "x", 0.06);

// to calculate messages / second rate
var message_count_start_time = 0;
var message_count = 0;

//hack - these need to go into array of data IDs (data IDs determined by server)
var car_speed = 0;
var rpm = 0;
var water_temp = 0;
var oil_temp = 0;
var air_temp = 0;
var fuel_level = 0;

function dataTimeStackItem(item, timeStamp) {
    this.item = item;
    var d = new Date();
    this.systemTime = d.getTime();
    this.timeStamp = timeStamp();
}

function dataTimeStack (param) {
    //todo: get all data since a specific time (30s, 1min, 5min, 15min, 30min, 60min, all)
    this.data = [];
    this.param = param;
    var d = new Date();
    this.createdTime = d.getTime();
    
    this.push = function(item, CANTimeStamp) {
        if (typeof(data) === 'undefined') {
            data = [];
        }
        elements.push(new timeStackItem(item, CANTimeStamp));
    };
    
    this.pop = function() {
        return data.pop();
    };
    
    this.stackTop = function(element) {
        return data[data.length - 1];
    };
}

var rpmData = new dataTimeStack("RPM");

window.onload = function () {
    startWSConn();
};

function startWSConn() {
    if (websocket == null || websocket.readyState == WebSocket.CLOSED) {
        websocket = new WebSocket(wsUri, "can-raw-throttled");
        websocket.onopen = function(evt) { onOpen(evt) };        websocket.onclose = function(evt) { onClose(evt) };        websocket.onmessage = function(evt) { onMessage(evt) };        websocket.onerror = function(evt) { onError(evt) };
    }
}

function stopWSConn() {
    websocket.close();
    setStatus("CANbus stopped", "warn");
}
function onOpen(evt) {	setStatus("CANBus connected");	doSend("CONNECTED");
    $('#wsconnstatus').hide();
    clearInterval(wsStatusTimer);    wsStatusTimerActive = false;
}function onClose(evt) {	setStatus("CANbus disconnected", "error");
    $("ws_stop_button").hide();    $("ws_start_button").show();
    setTimeout(function() { startWSConn() }, reconnectInterval);
    if (wsStatusTimerActive == false) {
        wsStatusTimer = setInterval(blinkStatus, wsStatusTimerInterval);
        wsStatusTimerActive = true;
    }
}function onMessage(evt) {
    var messages = evt.data.split("\n");
    for (i=0; i<messages.length; i++) {
        parseMessage(messages[i]);
    }
}

function onError(evt) {

}

function parseMessage(data) {
	document.getElementById('lastCANmessage').innerHTML = data;
	
    message_count += 1;
    var d = new Date();
    if (message_count_start_time + 1000 < d.getTime()) {
        document.getElementById('CANmsgspsec').innerHTML = message_count;
        message_count = 0;
        message_count_start_time = d.getTime();
    }
    
	var i, j;

	var fields = data.split("\t");
    
    if (fields[0] == "tpms") {
        tpmsdata = JSON.parse(fields[1]);
        writeTPMSDataToScreen(tpmsdata.tires[0], tpmsdata.pressure[0], tpmsdata.temp[0]);
        writeTPMSDataToScreen(tpmsdata.tires[1], tpmsdata.pressure[1], tpmsdata.temp[1]);
        writeTPMSDataToScreen(tpmsdata.tires[2], tpmsdata.pressure[2], tpmsdata.temp[2]);
        writeTPMSDataToScreen(tpmsdata.tires[3], tpmsdata.pressure[3], tpmsdata.temp[3]);
    } else {
        if (fields != null && fields[2] != null) {
            var f = fields[2].split("#");
            var CANTime = fields[0].substr(1, fields[0].length-2);

            if (fd[f[0]+'d'] != null) {
                j = 0;
                for (i=1; i <= fd[f[0]+'d'][0]; i++) {
                    var raw_value = f[1].substring(j, j + fd[f[0]+'d'][i]);
                    var value = parseInt(raw_value, 16);
                    var name = fd[f[0]][(i-1)*4];
                    var description = fd[f[0]][(i-1)*4 + 1];
                    var conv_type = fd[f[0]][(i-1)*4 + 2];
                    var conv = fd[f[0]][(i-1)*4 + 3];
                    
                    if (conv_type == "x") {
                        value = Math.round(value * conv);
                    }
                    else if (conv_type == "d") {
                        value = Math.round(value / conv);
                    }
                    else if (conv_type == "xm") {
                        value = Math.round((value / conv[0]) - conv[1]);
                    }
                    else if (conv_type == "b") {
                        // need to do conversion of binary to values
                    }
                    j += fd[f[0]+'d'][i];
                    
                    writeRawDataToScreen(name, description, f[0], value);
                    
                    // hackish
                    if (name == "RPM") { value = value / 1000;}
                    if (name == "car_speed") { value = value / 1.60934; }
                    
                    saveDataValues(name, value, CANTime);

                    setGaugeValue(name, value);
                }
            }
        }
	}
}function onError(evt) {	writeError(evt.data);}function doSend(message) {	websocket.send(message);}function writeRawDataToScreen(label, desc, frame_id, value, min, max) {
    var dataCell = document.getElementById('dataLabel_' + label);
    if (dataCell == null) {
        var addId = $("#rawCANdata").dataTable().fnAddData([label, desc, value, "n/a", "n/a", "<a href='' class='rawDataEdit' id='" + label + "_edit_button' data-role='button' data-icon='gear' data-mini='true' data-iconpos='notext'>Edit</a>"]);
        var theNode = $("#rawCANdata").dataTable().fnSettings().aoData[addId[0]].nTr;
        theNode.setAttribute('id','dataLabel_' + label);
    }
    else {
        $("#dataLabel_" + label + " :nth-child(3)").text(value);
    }
}

function saveDataValues(name, value, CANTime) {
    if (label == "RPM") {
        rpmData.push(value, CANTime);
    }
}

function writeTPMSDataToScreen(tire, pres, temp) {
    document.getElementById("tpms_" + tire).innerHTML = pres.toFixed(1) + " psi<br>" + temp.toFixed(1) + " &deg;C";
    if (tire == "lf") {
        writeRawDataToScreen("tpms_lf_pres", "TPMS Left Front Pressure", "tpms", pres.toFixed(2));
        writeRawDataToScreen("tpms_lf_temp", "TPMS Left Front Temp", "tpms", temp.toFixed(1));
    } else if (tire == "rf") {
        writeRawDataToScreen("tpms_rf_pres", "TPMS Right Front Pressure", "tpms", pres.toFixed(2));
        writeRawDataToScreen("tpms_rf_temp", "TPMS Right Front Temp", "tpms", temp.toFixed(1));
    } else if (tire == "rr") {
        writeRawDataToScreen("tpms_rr_pres", "TPMS Right Rear Pressure", "tpms", pres.toFixed(2));
        writeRawDataToScreen("tpms_rr_temp", "TPMS Right Rear Front Temp", "tpms", temp.toFixed(1));
    } else if (tire == "lr") {
        writeRawDataToScreen("tpms_lr_pres", "TPMS Left Rear Pressure", "tpms", pres.toFixed(2));
        writeRawDataToScreen("tpms_lr_temp", "TPMS Left Rear Temp", "tpms", temp.toFixed(1));
    }
}
function setStatus(status_msg, status) {
/*
    document.getElementById('status').style.color = "black";
    document.getElementById('status').style.backgroundColor = "#99ff33";
    status = typeof status !== 'undefined' ? status : "ok";

	document.getElementById('status').innerHTML = status_msg;
    if (status == "error") {
        document.getElementById('status').style.backgroundColor = "red";
        document.getElementById('status').effect("pulsate", {times: 100}, 2000);
    }    else if (status == "warn") {
        document.getElementById('status').style.backgroundColor = "yellow";
        document.getElementById('status').style.color = "grey";
    }
*/
}

function setPageLabel(text, curPage, totPages) {
    if (typeof curPage === 'undefined') {
        document.getElementById("page_label").innerHTML = text;
    } else {
        document.getElementById("page_label").innerHTML = text + " (" + curPage + "/" + totPages + ")";
    }
}
function writeError(error) {
	var currentTime = new Date();
	var ctime = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds() + " " + (currentTime.getMonth() + 1) + "/" + currentTime.getDate() + "/" + currentTime.getFullYear();
	document.getElementById('error').innerHTML = ctime + " " + error + "<br>" + document.getElementById('error').innerHTML;
}
function debug(debug) {	document.getElementById('debug').innerHTML = document.getElementById('debug').innerHTML + debug;}