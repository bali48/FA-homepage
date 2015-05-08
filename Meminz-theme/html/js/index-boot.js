require(["jquery", "knockout", "videojs"], function ($, ko) {
    var hideDiv,
        numberFormat,
        currencyFormat,
        percentFormat,
        VM;

    numberFormat = function numberFormat(number, dec, dsep, tsep) {
        if (isNaN(number) || number == null) return '';

        number = number.toFixed(~~dec);
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
            _wistiaEmbed = Wistia.embed("drrffn3n58", {
                videoFoam: true
            });
        };

        // public 
        self.isVideoVisible = ko.observable(false);
        self.playVideoCommand = function () {
            self.isVideoVisible(true);
            _wistiaEmbed.play();
            //wistiaEmbed
            //var player = videojs('video', {
            //    textTrackDisplay: false,
            //    controlBar: {
            //        fullscreenToggle: false,
            //        currentTimeDisplay: false,
            //        timeDivider: false,
            //        durationDisplay: false,
            //        remainingTimeDisplay: false,
            //        progressControl: false,
            //        volumeControl: false,
            //        muteToggle: false
            //    }
            //}, function () {
            //    console.log('Good to go!');
            //    this.play();
            //});
        };

        // initialization
        _init();
    }

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