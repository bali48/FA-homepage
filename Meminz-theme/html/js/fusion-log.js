/*global fusion: false, console: false, define: false */
/**
 * log - logs messages to console if isDebugOn = true
 * @author <a href="mailto:ikapoz@gmail.com">Ilija Poznic</a>
 * @version 0.1
 */
(function (factory) {
    "use strict";
    var fusion;
    if (typeof define === "function" && define.amd) {
        define(['settings'], factory);
    }
    else {
        fusion = window.fusion = window.fusion || {};
        fusion.log = factory();
    }
}(function (settings) {
    var log;

    log = function (message) {
        if (typeof console !== undefined && settings.isDebugOn) {
            console.log(message);
        }
    };

    return log;
}));