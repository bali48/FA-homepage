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
                    months: 1,
                    saving: 0,
                    teamSaving: 0,
                    officeSaving: 0
                },
                monthly: {
                    period: 'monthly',
                    months: 1,
                    saving: 0.05,
                    teamSaving: 0.1,
                    officeSaving: 0.1
                },
                quarterly: {
                    period: 'quarterly',
                    months: 3,
                    saving: 0.1,
                    teamSaving: 0.19,
                    officeSaving: 0.15
                },
                annual: {
                    period: 'annual',
                    months: 12,
                    saving: 0.15,
                    teamSaving: 0.2,
                    officeSaving: 0.2
                }
            };
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
        self.advisorRealCost = ko.observable("$2,160");
        self.advisorSaving = ko.observable("0%");
        self.hasSaving = ko.observable(false);
        // team
        self.teamCostPerAdvisor = ko.observable("$164");
        self.teamAdvisorRealCost = ko.observable("$2,160");
        self.teamSaving = ko.observable("%40");
        self.teamAdvisorSelectedCount = ko.observable(2);
        // office
        self.officeCostPerAdvisor = ko.observable("$152");
        self.officeAdvisorRealCost = ko.observable("$3,660");
        self.officeSaving = ko.observable("%15.28");
        self.officeAdvisorSelectedCount = ko.observable(2);

        // calculated
        _calculated = ko.computed(function () {
            var isAnnualAggrement = self.isAnnualAggrement(),
                selectedPeriod = self.selectedPeriod(),
                isAccountAggregationSelected = self.isAccountAggregationSelected(),
                teamAdvisorSelectedCount = self.teamAdvisorSelectedCount(),
                officeAdvisorSelectedCount = self.officeAdvisorSelectedCount(),
                advisorBaseCost,
                advisorAggOptionsCost,
                additionalAddvisorAggOptionsCost,
                advisorCount,
                realCost,
                totalBaseCost,
                saving,
                cost,
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
            advisorBaseCost = 180;
            advisorAggOptionsCost = 125;
            if (isAccountAggregationSelected) {
                totalBaseCost = advisorBaseCost + advisorAggOptionsCost;
            } else {
                totalBaseCost = advisorBaseCost;
            }
            realCost = totalBaseCost;
            cost = realCost * _saving[selectedPeriod].months;
            saving = _saving[selectedPeriod].saving;
            saving !== 0 ? self.hasSaving(true) : self.hasSaving(false);
            self.advisorRealCost(currencyFormat(cost, 2)); // cost without saving
            realCost = realCost * (1 - _saving[selectedPeriod].saving);
            self.advisorCost(currencyFormat(realCost)); // add cost with saving
            self.advisorSaving(percentFormat(saving));
            // now for team
            if (isAccountAggregationSelected) {
                realCost = (advisorBaseCost + advisorAggOptionsCost) * teamAdvisorSelectedCount;
                cost = realCost * _saving[selectedPeriod].months;
                self.teamAdvisorRealCost(currencyFormat(cost, 2));
                realCost = (advisorBaseCost + advisorAggOptionsCost) * (1 - _saving[selectedPeriod].saving);
                realCost += 100 * (teamAdvisorSelectedCount - 1) * (1 - _saving[selectedPeriod].teamSaving);
                realCost /= teamAdvisorSelectedCount;
                saving = 1 - realCost / (advisorBaseCost + advisorAggOptionsCost);
                self.teamCostPerAdvisor(currencyFormat(realCost));
                self.teamSaving(percentFormat(saving));
            } else {
                realCost = advisorBaseCost * teamAdvisorSelectedCount;
                cost = realCost * _saving[selectedPeriod].months;
                self.teamAdvisorRealCost(currencyFormat(cost, 2));
                realCost = advisorBaseCost * (1 - _saving[selectedPeriod].saving);
                realCost += 100 * (teamAdvisorSelectedCount - 1) * (1 - _saving[selectedPeriod].teamSaving);
                realCost /= teamAdvisorSelectedCount;
                saving = 1 - realCost / advisorBaseCost;
                self.teamCostPerAdvisor(currencyFormat(realCost));
                self.teamSaving(percentFormat(saving));
            }
            // now for office
            if (isAccountAggregationSelected) {
                realCost = (advisorBaseCost + advisorAggOptionsCost) * officeAdvisorSelectedCount;
                additionalAddvisorAggOptionsCost = 105; // aggregate option price
                cost = realCost * _saving[selectedPeriod].months;
                self.officeAdvisorRealCost(currencyFormat(cost, 2));
                realCost = (advisorBaseCost + advisorAggOptionsCost + additionalAddvisorAggOptionsCost * (officeAdvisorSelectedCount - 1)) * (1 - _saving[selectedPeriod].saving);
                realCost += 125 * (officeAdvisorSelectedCount - 1) * (1 - _saving[selectedPeriod].officeSaving);
                realCost /= officeAdvisorSelectedCount;
                saving = 1 - realCost / (advisorBaseCost + advisorAggOptionsCost);
                self.officeCostPerAdvisor(currencyFormat(realCost));
                self.officeSaving(percentFormat(saving));
            } else {
                realCost = advisorBaseCost * officeAdvisorSelectedCount;
                cost = realCost * _saving[selectedPeriod].months;
                self.officeAdvisorRealCost(currencyFormat(cost, 2));
                realCost = advisorBaseCost * (1 - _saving[selectedPeriod].saving);
                realCost += 125 * (officeAdvisorSelectedCount - 1) * (1 - _saving[selectedPeriod].officeSaving);
                realCost /= officeAdvisorSelectedCount;
                saving = 1 - realCost / advisorBaseCost;
                self.officeCostPerAdvisor(currencyFormat(realCost));
                self.officeSaving(percentFormat(saving));
            }
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