/*global require */
require(['jquery', 'knockout', 'fusion-knockout-bootstrap-dialog'], function ($, ko) {
    var hideDiv,
        numberFormat,
        currencyFormat,
        percentFormat,
        VM;

    numberFormat = function numberFormat(number, dec, dsep, tsep) {
        if (isNaN(number) || number === null) { return ''; }

        number = number.toFixed(dec);
        tsep = typeof tsep == 'string' ? tsep : ',';

        var parts = number.split('.'),
          fnums = parts[0],
          decimals = parts[1] ? (dsep || '.') + parts[1] : '';

        return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
    };

    percentFormat = function (value) {
        var numberstring = numberFormat(value * 100, 0) + '%';
        return numberstring;
    };

    currencyFormat = function (value, dec) {
        var number = numberFormat(Math.abs(value), dec || 0),
            numberString;
        numberString = "$" + number;
        if (value < 0) {
            numberString = "(" + numberString + ")";
        }
        return numberString;
    };

    VM = function () {
        var self = this,
            _wistiaEmbed,
            _init;
        _init = function () {
        };

        // public
        self.isVideoVisible = ko.observable(false);
        self.videoHtml = ko.observable("");
        // dialog
        self.isDialogVisible = ko.observable(false);
        self.dialogOptions = ko.observable({
            type: 'BootstrapDialog.TYPE_DEFAULT'
        });
        // commands
        self.playVideoCommand = function () {
            var src = window.location.protocol + '//' + window.location.host + '/promo-video.html';
            self.isVideoVisible(true);
            self.videoHtml('<iframe src=' + src + ' frameborder="0" marginheight="0" marginwidth="0" scrolling="no" style="width: 945px; height: 532px;" ></iframe>');
        };
        self.closeVideoCommand = function () {
            self.isVideoVisible(false);
            self.videoHtml("");
        };
        self.scheduleGetStartedCommand = function () {
            self.dialogOptions().message = '<iframe src="https://www.timetrade.com/book/PHWJP" frameborder="0" allowtransparency="1" width="100%" scrolling="no" height="650" marginheight="0" marginwidth="0"></iframe>';
            self.isDialogVisible(true);
        };
        self.schedulePartnerRequestCommand = function () {
            self.dialogOptions().message = '<iframe src="https://www.timetrade.com/book/ZFGLN" frameborder="0" allowtransparency="1" width="100%" scrolling="no" height="650" marginheight="0" marginwidth="0"></iframe>';
            self.isDialogVisible(true);
        };
        self.scheduleWebinarCommand = function () {
            self.dialogOptions().message = '<iframe src="https://www.timetrade.com/book/QRXQL" frameborder="0" allowtransparency="1" width="100%" scrolling="no" height="650" marginheight="0" marginwidth="0"></iframe>';
            self.isDialogVisible(true);
        };
        self.scheduleEnterpriseMeetingCommand = function () {
            self.dialogOptions().message = '<iframe src="https://www.timetrade.com/book/BSBRN" frameborder="0" allowtransparency="1" width="100%" scrolling="no" height="650" marginheight="0" marginwidth="0"></iframe>';
            self.isDialogVisible(true);
        };


        // initialization
        _init();
    };

    // application start
    document.getElementById("loading").className = "loading-visible";
    hideDiv = function () { document.getElementById("loading").className = "loading-invisible"; };
    //var oldLoad = window.onload;
    //var newLoad = oldLoad ? function () { hideDiv.call(this); oldLoad.call(this); } : hideDiv;
    //window.onload = newLoad;
    $(document).ready(function () {
        var vm = new VM();

        hideDiv(); // hide loading spin
        $.each($('body'), function (index, element) {
            ko.applyBindings(vm, element);
        });
    });
});