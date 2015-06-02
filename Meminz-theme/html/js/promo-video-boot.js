/*global require */
require(['jquery', 'knockout'], function ($, ko, promoVideoTemplate) {
    var VM, vm;

    VM = function () {
        var self = this,
            _init;
        _init = function () {
            $('iframe').each(function (index, element) {
                var elemet$ = $(element);
                elemet$.load(function () {
                    self.isBusy(false);
                });
            });
        };

        // public
        self.isBusy = ko.observable(true);

        // initialization
        _init();
    };

    // application start
    vm = new VM();
    $.each($('body'), function (index, element) {
        ko.applyBindings(vm, element);
    });
});