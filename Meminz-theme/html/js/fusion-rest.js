/*global define: false, $: false, fusion: false, require: false, jQuery: false, window: false */
(function (factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define(["jquery", "log"], factory);
    }
    else if (typeof exports === "object") {
        factory(require("jquery"), require("log"));
    }
}(function ($, log) {
    var rest = {};

    rest.rootUrl = (window.location.host.indexOf("localhost") != -1) ? "http://localhost" + (location.port ? ":" + location.port : "") + "/FusionWeb" : window.location.protocol + "//" + window.location.host;
    rest.serviceUrl = rest.rootUrl + "/Service.svc";
    rest.protocol = window.location.protocol;
    /* REST start */
    /*!
     * rest.get - AJAX get command
     * @param {object} options - passed to ajax call.
     * @param {string} options.url - url on witch ajax will be called
     * @param {object} [options.data] - data data will be send as JSON to server
     */
    rest.get = function (options, successCallback, errorCallback) {
        log("rest.get.URL: " + options.url);
        //if (options !== null &&
        //  options.data !== undefined &&
        //  typeof options.data === "object") {
        //    options.data = JSON.stringify(options.data);
        //}

        if (options.url) {
            $.extend(options, {
                type: "GET",
                cache: options.url.match("html$") !== null
            });
        }
        $.ajax(options).done(function (msg) {
            var successCallbackLocal = successCallback;
            if (successCallbackLocal !== undefined) { successCallbackLocal(msg); }
        }).fail(function (jqXHR, textStatus) {
            var erroCallbackLocal = erroCallbackLocal;

            if (jqXHR.status == 403) {
                window.location.href = window.location.host + "/Default.aspx";
                return;
            }

            if (erroCallbackLocal !== undefined) { erroCallbackLocal(jqXHR, textStatus); }
        });
    };

    /*!
     * rest.deleteCmd - AJAX delete command
     * @param {object} options - passed to ajax call.
     * @param {string} options.url - url on witch ajax will be called
     * @param {object} [options.data] - data data will be send as JSON to server
     */
    rest.deleteCmd = function (options, successCallback, errorCallback) {
        $.extend(options, {
            type: "DELETE",
            cache: false
        });
        $.ajax(options).done(function (msg) {
            if (successCallback !== undefined) { successCallback(msg); }
        }).fail(function (jqXHR, textStatus) {

            if (jqXHR.status == 403) {
                window.location.href = window.location.host + "/Default.aspx";
                return;
            }

            if (errorCallback !== undefined) {
                errorCallback(jqXHR, textStatus);
            }
        });
    };
    /*!
     * fusion.data.post - AJAX post command
     * @param {object} options - passed to ajax call.
     * @param {string} options.url - url on witch ajax will be called
     * @param {object} options.data - as object that will be sent as JSON string to provided URL
     */
    rest.post = function (options, successCallback, errorCallback) {
        if (options !== null &&
            options.data !== undefined &&
            typeof options.data === "object") {
            options.data = JSON.stringify(options.data);
        }
        $.extend(options, {
            type: "POST",
            dataType: "json",
            contentType: "application/json"
        });
        $.ajax(options).done(function (msg) {
            var successCallbackLocal = successCallback;
            if (successCallbackLocal !== undefined) { successCallbackLocal(msg); }
        }).fail(function (jqXHR, textStatus) {

            if (jqXHR.status == 403) {
                window.location.href = window.location.host + "/Default.aspx";
                return;
            }

            var errorCallbackLocal = errorCallback;
            if (errorCallbackLocal !== undefined) {
                errorCallbackLocal(jqXHR, textStatus);
            }
        });
    };

    /*!
    * rest.getParamFromUrl - returns url query params as plain object
    * @author ikapoz@gmail.com
    * @version 0.1
    *
    * @param {string} url - if provided returns params from the url else it returns 
    *					     params from window.location.url
    * @returns {object} as plain object as following ?name=value => {name: value} 
    */
    rest.getParamFromUrl = function (url) {
        var _url = url || window.location.href,
            params;

        params = _url.match(/\?.+/); //ignore jslint
        if (params === null) {
            return null;
        }

        return $.deparam(params[0].substring(1, params[0].length));
    };

    /* REST end */

    return rest;
}));
