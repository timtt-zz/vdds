function drawGaugeSmall(destObject, label, units, dataField, minVal, maxVal, majInterval, minInterval, lowWarn, highWarn) {
    gaugeID = "gauge_" + dataField.replace(" ", "_");
    $(destObject).append('<div id="' + gaugeID + '" style="padding: 5px; width: 180px; height: 180px; float: left;"></div>');
    $("#" + gaugeID).append("<div style='height: 40px; color: #0071BC; z-index: 1000; position: relative; margin-left: 40px; margin-right: 40px; width: 100px; top: -60px; left: 40px; text-align: center; vertical-align: middle; display:table-cell; font-size: 14px; font-weight: bold; font-family: Verdana, Geneva, sans-serif;'>" + label + "</div>");
    $("#" + gaugeID).append("<div style='height: 20px; color: #0071BC; z-index: 1000; position: relative; margin-left: 80px; margin-right: 80px; width: 20px; top: -85px; right: 20px; text-align: center; vertical-align: middle; display:table-cell; font-size: 12px; font-weight: bold; font-family: Verdana, Geneva, sans-serif;'>" + units + "</div>");

    lowWarn = lowWarn || 0;
    highWarn = highWarn || 0;
    warnAreaLow = warnAreaHigh = {};
    
    if (lowWarn > 0) {
        warnAreaLow = {
            startWidth: 10,
            endWidth: 10,
            startValue: 0,
            endValue: lowWarn,
            startDistance:0.68,
            endDistance: 0.68,
            style: {
                fill: "rgb(255,0,0)", stroke: "rgb(255,0,0)", "stroke-width": 3
            }
        };
    }

    if (highWarn > 0) {
        warnAreaHigh = {
            startWidth: 10,
            endWidth: 10,
            startValue: highWarn,
            endValue: maxVal,
            startDistance:0.68,
            endDistance: 0.68,
            style: {
                fill: "rgb(255,0,0)", stroke: "rgb(255,0,0)", "stroke-width": 3
            }
        };
    }


    $("#" + gaugeID).wijradialgauge({
        radius: 95,
        value: minVal + (maxVal-minVal)/2,
        min: minVal,
        max: maxVal,
        startAngle: -45,
        sweepAngle: 270,
        labels: {
            style: {
                "font-size": 13,
                fill: "#000",
                stroke: "none"
            },
            offset: -5
        },
        pointer: {
            length: 0.8,
            width: 6,
            style: { fill: "rgb(255,0,0)", stroke: "rgb(0,0,0)", "stroke-width": 0.5 }
        },
        cap: {
            radius: 10,
            style: {
                fill: "270-#777d8d-#555b6b",
                stroke: "#555b6b"
            }
        },
        tickMajor: {
            factor: 3,
            offset: 20,
            position: "inside",
            interval: majInterval,
            style: { fill: "#555b6b", stroke: "#555b6b", "stroke-width": 2 }
        },
        tickMinor: {
            visible: true,
            offset: 20,
            position: "inside",
            interval: minInterval,
            style: { fill: "#606779", stroke: "#606779", "stroke-width": 0.5 }
        },
        face: {
            style: {},
            template: function (ui) {
                var set = ui.canvas.set();
                var circle = ui.canvas.circle(ui.origin.x, ui.origin.y, ui.r-5);
                circle.attr({ "stroke": "#8f8f8f", "stroke-width": 3, fill: "#e2e2e2" });
                set.push(circle);
                var circle2 = ui.canvas.circle(ui.origin.x, ui.origin.y, ui.r - 14);
                circle2.attr({ "stroke": "#717171", "stroke-width": 2, fill: "270-#a6a6a6-#efefef" });
                set.push(circle2);
                return set;
            }
        },

        ranges: [warnAreaLow, warnAreaHigh]
    });
}


function drawGaugeMedium(destObject, label, units, dataField, xpos, ypos, minVal, maxVal, majInterval, minInterval, lowWarn, highWarn) {
    gaugeID = "gauge_" + dataField.replace(" ", "_");
    $(destObject).append('<div id="' + gaugeID + '" style="padding: 5px 17px 5px 17px; width: 220px; height: 220px; clear: both; position: absolute; top: ' + ypos + 'px; left: ' + xpos + 'px;"></div>');
    $("#" + gaugeID).append("<div style='height: 40px; color: #0071BC; z-index: 1000; position: relative; margin-left: 60px; margin-right: 60px; width: 100px; top: -70px; left: 60px; text-align: center; vertical-align: middle; display:table-cell; font-size: 14px; font-weight: bold; font-family: Verdana, Geneva, sans-serif;'>" + label + "</div>");
    $("#" + gaugeID).append("<div style='height: 20px; color: #0071BC; z-index: 1000; position: relative; margin-left: 80px; margin-right: 80px; width: 20px; top: -95px; right: 0px; text-align: center; vertical-align: middle; display:table-cell; font-size: 12px; font-weight: bold; font-family: Verdana, Geneva, sans-serif;'>" + units + "</div>");

    lowWarn = lowWarn || 0;
    highWarn = highWarn || 0;
    warnAreaLow = warnAreaHigh = {};
    
    if (lowWarn > 0) {
        warnAreaLow = {
            startWidth: 10,
            endWidth: 0,
            startValue: 0,
            endValue: lowWarn,
            startDistance:0.73,
            endDistance: 0.81,
            style: {
                fill: "rgb(255,0,0)", stroke: "rgb(255,0,0)", "stroke-width": 3
            }
        };
    }

    if (highWarn > 0) {
        warnAreaHigh = {
            startWidth: 0,
            endWidth: 10,
            startValue: highWarn,
            endValue: maxVal,
            startDistance:0.81,
            endDistance: 0.73,
            style: {
                fill: "rgb(255,0,0)", stroke: "rgb(255,0,0)", "stroke-width": 3
            }
        };
    }


    $("#" + gaugeID).wijradialgauge({
        radius: 115,
        value: minVal + (maxVal-minVal)/2,
        min: minVal,
        max: maxVal,
        startAngle: -45,
        sweepAngle: 270,
        labels: {
            style: {
                "font-size": 13,
                fill: "#000",
                stroke: "none"
            },
            offset: -5
        },
        pointer: {
            length: 0.8,
            width: 6,
            style: { fill: "rgb(255,0,0)", stroke: "rgb(0,0,0)", "stroke-width": 0.5 }
        },
        cap: {
            radius: 10,
            style: {
                fill: "270-#777d8d-#555b6b",
                stroke: "#555b6b"
            }
        },
        tickMajor: {
            factor: 3,
            offset: 20,
            position: "inside",
            interval: majInterval,
            style: { fill: "#555b6b", stroke: "#555b6b", "stroke-width": 2 }
        },
        tickMinor: {
            visible: true,
            offset: 20,
            position: "inside",
            interval: minInterval,
            style: { fill: "#606779", stroke: "#606779", "stroke-width": 0.5 }
        },
        face: {
            style: {},
            template: function (ui) {
                var set = ui.canvas.set();
                var circle = ui.canvas.circle(ui.origin.x, ui.origin.y, ui.r-5);
                circle.attr({ "stroke": "#8f8f8f", "stroke-width": 3, fill: "#e2e2e2" });
                set.push(circle);
                var circle2 = ui.canvas.circle(ui.origin.x, ui.origin.y, ui.r - 14);
                circle2.attr({ "stroke": "#717171", "stroke-width": 2, fill: "270-#a6a6a6-#efefef" });
                set.push(circle2);
                return set;
            }
        },

        ranges: [warnAreaLow, warnAreaHigh]
    });
}


function drawGaugeLarge(destObject, label, units, dataField, minVal, maxVal, majInterval, minInterval, lowWarn, highWarn) {
    gaugeID = "gauge_" + dataField.replace(" ", "_");
    $(destObject).append('<div id="' + gaugeID + '" style="padding: 5px 10px 0px 10px; width: 340px; height: 340px; float: left;"></div>');
    $("#" + gaugeID).append("<div style='height: 40px; color: #0071BC; z-index: 1000; position: relative; margin-left: 60px; margin-right: 60px; width: 100px; top: -90px; left: 120px; text-align: center; vertical-align: middle; display:table-cell; font-size: 16px; font-weight: bold; font-family: Verdana, Geneva, sans-serif;'>" + label + "</div>");
    $("#" + gaugeID).append("<div style='height: 20px; color: #0071BC; z-index: 1000; position: relative; margin-left: 80px; margin-right: 80px; width: 20px; top: -115px; right: -50px; text-align: center; vertical-align: middle; display:table-cell; font-size: 14px; font-weight: bold; font-family: Verdana, Geneva, sans-serif;'>" + units + "</div>");

    lowWarn = lowWarn || 0;
    highWarn = highWarn || 0;
    warnAreaLow = warnAreaHigh = {};
    
    if (lowWarn > 0) {
        warnAreaLow = {
            startWidth: 10,
            endWidth: 10,
            startValue: 0,
            endValue: lowWarn,
            startDistance:0.85,
            endDistance: 0.85,
            style: {
                fill: "rgb(255,0,0)", stroke: "rgb(255,0,0)", "stroke-width": 3
            }
        };
    }

    if (highWarn > 0) {
        warnAreaHigh = {
            startWidth: 10,
            endWidth: 10,
            startValue: highWarn,
            endValue: maxVal,
            startDistance:0.85,
            endDistance: 0.85,
            style: {
                fill: "rgb(255,0,0)", stroke: "rgb(255,0,0)", "stroke-width": 3
            }
        };
    }


    $("#" + gaugeID).wijradialgauge({
        radius: 170,
        value: 0,
        min: minVal,
        max: maxVal,
        startAngle: -45,
        sweepAngle: 270,
        pointer: {
            length: 0.98,
            width: 8,
            style: { fill: "rgb(255,0,0)", stroke: "rgb(0,0,0)", "stroke-width": 0.5 }
        },
        cap: {
            radius: 15,
            style: {
                fill: "270-#777d8d-#555b6b",
                stroke: "#555b6b"
            }
        },
        labels: {
            style: {
                "font-size": 18,
                fill: "#000"
            },
            offset: -10
        },
        tickMajor: {
            factor: 3,
            offset: 15,
            position: "inside",
            interval: majInterval,
            style: { fill: "#555b6b", stroke: "#555b6b", "stroke-width": 2 }
        },
        tickMinor: {
            visible: true,
            offset: 15,
            position: "inside",
            interval: minInterval,
            style: { fill: "#606779", stroke: "#606779", "stroke-width": 0.5 }
        },
        face: {
            style: {},
            template: function (ui) {
                var set = ui.canvas.set();
                var circle = ui.canvas.circle(ui.origin.x, ui.origin.y, ui.r-5);
                circle.attr({ "stroke": "#8f8f8f", "stroke-width": 3, fill: "#e2e2e2" });
                set.push(circle);
                var circle2 = ui.canvas.circle(ui.origin.x, ui.origin.y, ui.r - 14);
                circle2.attr({ "stroke": "#717171", "stroke-width": 2, fill: "270-#a6a6a6-#efefef" });
                set.push(circle2);
                return set;
            }
        },

        ranges: [warnAreaLow, warnAreaHigh]
    });
}


function drawFuelGauge(destObject, xpos, ypos) {
    label = "Fuel";
    dataField = "FL";
    minVal = 0;
    maxVal = 100;
    majInterval = 25;
    minInterval = 5;
    lowWarn = 20;

    gaugeID = "gauge_" + dataField.replace(" ", "_");
    $(destObject).append('<div id="' + gaugeID + '" style="padding: 5px 5px 5px 40px; width: 60px; height: 160px; clear: both; position: absolute; top: ' + ypos + 'px; left: ' + xpos + 'px;"></div>');
    $("#" + gaugeID).append("<div style='height: 40px; color: #0071BC; z-index: 1000; position: relative; margin-left: 60px; margin-right: 60px; width: 100px; top: -15px; left: 0px; text-align: center; vertical-align: middle; display:table-cell; font-size: 14px; font-weight: bold; font-family: Verdana, Geneva, sans-serif;'>" + label + "</div>");

    warnAreaLow = {
        startValue: 0,
        endValue: lowWarn,
        startDistance: 0.7,
        endDistance: 0.7,
        startWidth: 0.2,
        endWidth: 0.2,
        style: {
            fill: "rgb(255,0,0)", stroke: "none", "stroke-width": 3
        }
    };

    $("#" + gaugeID).wijlineargauge({ 
        value: 0,
        orientation: "vertical",
        yAxisLocation: 0.7,
        labels: {
            style: {
                fill: "#1E395B",
                "font-size": 12,
                "font-weight": "800"
            }
        },
        tickMajor: {
            position: "inside",
            interval: majInterval,
            style: {
                fill: "#1E395B",
                stroke: "none"
            }
        },
        tickMinor: {
            position: "inside",
            visible: true,
            interval: minInterval,
            style: {
                fill: "#1E395B",
                stroke: "none"
            }
        },
        pointer: {
            shape: "rect",
            length: 0.4,
            style: {
                fill: "#1E395B",
                stroke: "#1E395B"
            }
        },
        face: {
            style: {
                fill: "270-#FFFFFF-#D9E3F0",
                stroke: "#7BA0CC",
                "stroke-width": 4
            }
        },

        ranges: [warnAreaLow]
    });

    $(".wijmo-wijlineargauge-label tspan").each(function(index) {        
        if ($(this).text() == "100") { $(this).text("F"); }
        if ($(this).text() == "75") { $(this).text(""); }
        if ($(this).text() == "50") { $(this).text("1/2"); $(this).attr("dx", "-5"); }
        if ($(this).text() == "25") { $(this).text(""); }
        if ($(this).text() == "0") { $(this).text("E"); $(this).attr("dx", "-7"); }
    })
}


function setGaugeValue (name, value) {
    $("#gauge_" + name).wijradialgauge("option", "value", value);
    $("#gauge_" + name).wijlineargauge("option", "value", value);
}
