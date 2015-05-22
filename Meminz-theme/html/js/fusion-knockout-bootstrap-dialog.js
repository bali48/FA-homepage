/*global define: false */
define(['knockout',
		'jquery',
        'rest',
		'log',
        'bootstrap/bootstrap-dialog',
        'bootstrap/bootstrap-modal'], function (ko,
            $,
            rest,
            log,
            bootstrapDialog) {
            var VM,
				idTag = "fadialog",
                addCss;

            addCss = function () {
                var link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = "/css/bootstrap/bootstrap-dialog.min.css";
                document.getElementsByTagName("head")[0].appendChild(link);
            }(); // execute imediatelly 

            /*!
			* BootstrapDialog view model - 
			* @param {object} params.options - busy initialization options.
			*/
            VM = function (params) {
                var self = this,
                    _getOptions,
                    options,
                    _dialog,
					_watch;
                _getOptions = function () {
                    var options = params.options() || {};
                    options = $.extend(options, {
                        onhidden: function (dialog) {
                            _dialog = undefined;
                            self.isVisible(false);
                        }
                    });
                    return options;
                }
                // public
                self.isVisible = params.isVisible || ko.observable(false);
                _watch = ko.computed(function () {
                    var show = self.isVisible();
                    if (show) {
                        _dialog = bootstrapDialog.show(_getOptions());
                        log("fadialog fired");
                    } else {
                        if (_dialog !== undefined) {
                            _dialog.close();
                            _dialog = undefined;
                        }
                    }
                });
            };

            // register component
            ko.components.register(idTag, {
                viewModel: VM,
                template: "<div></div>"
            });
        });