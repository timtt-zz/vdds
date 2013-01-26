vdds - Vehicle Dash Display System
===================================

(c) 2013 Tim Trampedach (tim@timtt.com)

Intro
-----
This is the visual presentation and interface for an in-car dash center display system. It uses websockets to communicate with a daemon for getting a car's CAN data and then displaying this as classic-looking gauges. It also displays TPMS data from a sensor (available via mp3car.com). It is a work in progress (see below). It is based on HTML, CSS & jQuery and will run in any browser window. Just open the file viewframe800x480.html and it the interface loads.

To get it to work, it needs to be used in conjunction with a CAN relay daemon and a CAN data generator to simulate a car's ECU. Those projects are here:
https://github.com/timtt/cangen_pectel
https://github.com/timtt/canwsserver

The above two projects are C-based and compile on Ubuntu.


Next steps
----------
1) The interface to the relay daemon needs to be switched to ambd (Automotive Message Broker Daemon), which is available here: https://github.com/otcshare/automotive-message-broker. The canwsserver project should in essence be retired since ambd is a far superior, pluggable and configurable project. This is by far the most important thing to do on this project.

2) Enabling graphing: Let the user select one or a handful of paramters and show a live-updating line graph of the value over time. The timeframe should be selectable, maybe for a few specific timeframes like last minute, 5 minutes, 15, 30, hour.

3) Better configuration management: There should be a screen which lets users pick the gauges they want to display and what their max, min and redline values are. This is currently hardcoded.

4) Interface work. For now, I have only focused on showing a few engine parameters, but those are not exhaustive and they use the classic gauge layout. This is not a major concern.
