/*global define: false */
define(["knockout",
		"jquery",
		"log",
		"text!template/busy.html!strip"], function (ko, $, log, template) {
		    var VM,
				idTag = "busy";
       
			/*!
			* busy view model - 
			* @param {object} params.options - busy initialization options.
			*/
			VM = function (params) {
			    var self = this,
					_watch;
				// public
				self.isBusy = params.isBusy || ko.observable(false);
				_watch = ko.computed(function () {
				    var isBusy = self.isBusy();
				});
			};
	
			// register component
			ko.components.register(idTag, {
				viewModel: VM,
				template: template
			});
		});