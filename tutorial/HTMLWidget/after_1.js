"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "src/common/HTMLWidget", "css!./after_1"], factory);
    } else {
        root.tutorial_HTMLWidget_After1 = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {
    function After1() {
        HTMLWidget.call(this);
        this._tag = "div";
    }
    After1.prototype = Object.create(HTMLWidget.prototype);
    After1.prototype._class += " tutorial_HTMLWidget_After1";

    After1.prototype.testData = function () {
        return this;
    };

    After1.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.html(   "<div class='row-4 clearfix'>" +
    "<div id='one' class='col-1-4 bgIcon'>" +
        "<h2>150</h2>" +
        "<div>" +
        "	New Orders" +
        "</div>" +
        "<div style='background-color:#2980b9;padding-bottom: 10px;padding-top: 10px;'  onclick='foo(this)'>More Info" +
        "	<i class='fa fa-chevron-circle-down' style='padding-left: 2%'></i>" +
        "	    </div>" +
        "</div>");
    };

    After1.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
    };

    After1.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return After1;
}));
