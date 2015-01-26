(function($) {
	'use strict';
	/*
	Aside
	=========================== */
    //build dropdown
    $("<select />").appendTo(".navi-list");
 
    //Default option "Voir les rubriques…"
    $("<option />", {
       "selected": "selected",
       "value"   : "",
       "text"    : "Select categories"
    }).appendTo(".navi-list select"); 
 
    //Menu items
    $(".navi-list li a").each(function() {
        var el = $(this);
        $("<option />", {
            "value"   : el.attr("href"),
            "text"    : el.text()
        }).appendTo(".navi-list select");
    });
 
    //Link
    $(".navi-list select").change(function() {
        window.location = $(this).find("option:selected").val();
    });
	
	// make code pretty
    window.prettyPrint && prettyPrint()
	
})(jQuery);