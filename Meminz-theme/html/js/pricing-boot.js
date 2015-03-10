require(["jquery", "knockout"], function ($, ko) {
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
        var numberstring = '%' + numberFormat(value * 100, 0);
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
            _init,
            _calculated,
            _saving = {
                monthToMonth: {
                    period: 'monthToMonth',
                    saving: 0
                },
                monthly: {
                    period: 'monthly',
                    saving: 0.05
                },
                quarterly: {
                    period: 'quarterly',
                    saving: 0.1
                },
                annual: {
                    period: 'annual',
                    saving: 0.15
                }
            }
        _init = function () {
            var counts = [];
            for (var i = 2; i < 100; i++) {
                counts.push(i);
            }
            self.advisorCount(counts);
        };
        // public
        self.isAnnualAggrement = ko.observable(false);
        self.isAccountAggregationSelected = ko.observable(false);
        self.selectedPeriod = ko.observable("monthToMonth");
        self.advisorCount = ko.observableArray([]);
        // one advisor
        self.advisorCost = ko.observable("$180");
        self.advisorAnnualCost = ko.observable("$2,160");
        self.advisorSaving = ko.observable("0%");
        self.hasSaving = ko.observable(false);
        // team
        self.teamCostPerAdvisor = ko.observable("$164");
        self.teamAdvisorSelectedCount = ko.observable(2);

        // calculated
        _calculated = ko.computed(function () {
            var isAnnualAggrement = self.isAnnualAggrement(),
                selectedPeriod = self.selectedPeriod(),
                isAccountAggregationSelected = self.isAccountAggregationSelected(),
                teamAdvisorSelectedCount = self.teamAdvisorSelectedCount(),
                realCost,
                totalBaseCost,
                saving,
                annualCost,
                formated,
                check;
            if (selectedPeriod === _saving.quarterly.period || selectedPeriod === _saving.annual.period) {
                self.isAnnualAggrement(true);
                isAnnualAggrement = true;
            } else {
                if (selectedPeriod === _saving.monthToMonth.period && isAnnualAggrement) {
                    selectedPeriod = _saving.monthly.period;
                }
            }
            // do the calculation
            // first for one advisor
            totalBaseCost = 180;
            realCost = totalBaseCost * (1 - _saving[selectedPeriod].saving);
            annualCost = realCost * 12;
            saving = _saving[selectedPeriod].saving;
            saving !== 0 ? self.hasSaving(true) : self.hasSaving(false);
            self.advisorCost(currencyFormat(realCost));
            self.advisorAnnualCost(currencyFormat(annualCost, 2));
            self.advisorSaving(percentFormat(saving));
            console.log("computed executed, selected period: " + selectedPeriod);
        });

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