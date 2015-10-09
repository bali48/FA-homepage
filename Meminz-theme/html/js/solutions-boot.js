/*global require */
require(['jquery', 'knockout', 'fusion-iframe-dialog'], function ($, ko, faDialog) {
    var hideDiv,
        numberFormat,
        currencyFormat,
        percentFormat,
        VM;

    VM = function () {
        var self = this,
            _dialog,
            _wistiaEmbed,
            _init;
        _init = function () {
            _dialog = faDialog();
        };

        // public
        // commands
        self.showScheduleCommand = function (vm, e) {
            var src = $(e.currentTarget).attr('data-fa-src');
            _dialog.show(src);
        };

        // initialization
        _init();
    };

    //document.getElementById("loading").className = "loading-visible";//
    //hideDiv = function () { document.getElementById("loading").className = "loading-invisible"; };//

    $(document).ready(function () {
        // application start
        var vm = new VM();

        //hideDiv(); // hide loading spin
        $.each($('[data-fa-main]'), function (index, element) {
            ko.applyBindings(vm, element);
        });
    });
});