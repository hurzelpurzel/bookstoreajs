jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 BookSet in the list

sap.ui.require([
	"sap/ui/test/Opa5",
	"pottmeier/bookstore/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"pottmeier/bookstore/test/integration/pages/App",
	"pottmeier/bookstore/test/integration/pages/Browser",
	"pottmeier/bookstore/test/integration/pages/Master",
	"pottmeier/bookstore/test/integration/pages/Detail",
	"pottmeier/bookstore/test/integration/pages/Create",
	"pottmeier/bookstore/test/integration/pages/NotFound"
], function(Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "pottmeier.bookstore.view."
	});

	sap.ui.require([
		"pottmeier/bookstore/test/integration/MasterJourney",
		"pottmeier/bookstore/test/integration/NavigationJourney",
		"pottmeier/bookstore/test/integration/NotFoundJourney",
		"pottmeier/bookstore/test/integration/BusyJourney",
		"pottmeier/bookstore/test/integration/FLPIntegrationJourney"
	], function() {
		QUnit.start();
	});
});