require(["jquery", "knockout"], function ($, ko) {
    var hideDiv,
        VM = function () {
            var self = this,
                saving = {
                    monthToMonth: 0,
                    monthly: 0.95,
                    quarterly: 0.9,
                    annual: 0.85
                }
            // public
            self.isAnnualAggrement = ko.observable(false);
            self.selectedPeriod = ko.observable("monthToMonth");
            // one advisor
            self.advisorCost = ko.observable("$180");

            // team
            self.teamCostPerAdvisor = ko.observable("$164");


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
        ko.applyBindings(vm, document);
    });
});