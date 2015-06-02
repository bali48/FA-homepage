/*global require */
require(['jquery', 'knockout', 'text!template/wistia.html!strip'], function ($, ko, wistiaTemplate) {
    var VM, vm;

    VM = function () {
        var self = this,
            _init;
        _init = function () {
            $('body').append(wistiaTemplate);
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