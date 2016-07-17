jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"pottmeier/bookstore/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"pottmeier/bookstore/test/integration/pages/App",
	"pottmeier/bookstore/test/integration/pages/Browser",
	"pottmeier/bookstore/test/integration/pages/Master",
	"pottmeier/bookstore/test/integration/pages/Detail",
	"pottmeier/bookstore/test/integration/pages/NotFound"
], function(Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "pottmeier.bookstore.view."
	});

	sap.ui.require([
		"pottmeier/bookstore/test/integration/NavigationJourneyPhone",
		"pottmeier/bookstore/test/integration/NotFoundJourneyPhone",
		"pottmeier/bookstore/test/integration/BusyJourneyPhone"
	], function() {
		QUnit.start();
	});
});