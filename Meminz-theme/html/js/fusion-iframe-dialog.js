/*global define: false */
define(['knockout',
		'jquery',
		'log',
        'text!template/iframe-modal.html!strip',
        'bootstrapModal'], function (ko,
            $,
            log,
            template) {
            var VM;


            /*!
			* FA-IFrame view model - 
			* @param {object}options - initialization options.
			*/
            VM = function (options) {
                var self = this,
                    _iframe$,
                    _template$,
                    _init,
                    options,
                    _dialog,
					_watch;

                _init = function () {
                    _template$ = $(template);
                    $('body').append(_template$);
                    _iframe$ = $('[data-fa-id="modal-iframe"]');
                    //_iframe$.each(function (index, element) {
                    //    element.onload = function () {
                    //        self.isBusy(false);
                    //    };
                    //});
                    ko.cleanNode(_template$[0]); // clear previous binding
                    ko.applyBindings(self, _template$[0]);
                };

                // public
                self.isBusy = ko.observable(false);
                self.title = ko.observable('');
                self.show = function (src) {
                    //self.isBusy(true);
                    _iframe$.attr('src', src);
                    _template$.modal();
                    _template$.on('hide.bs.modal', function (e) {
                        $('.modal-backdrop').remove();
                        _iframe$.attr('src', 'about:blank');
                    });
                };

                // initialization
                _init();
            };

            return function (options) {
                return new VM(options);
            };
        });