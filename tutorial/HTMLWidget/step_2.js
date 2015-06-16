"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "src/common/HTMLWidget", "css!./step_2"], factory);
    } else {
        root.tutorial_HTMLWidget_Step2 = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {
    function Step2() {
        HTMLWidget.call(this);
        this._tag = "div";
    }
    Step2.prototype = Object.create(HTMLWidget.prototype);
    Step2.prototype._class += " tutorial_HTMLWidget_Step2";

    Step2.prototype.testData = function () {
        return this;
    };

    Step2.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._rootDiv = element.append("div")
            .attr("class", "row-4 clearfix")
        ;
        var mainDiv = this._rootDiv.append("div")
            .attr("class", "one col-1-4 bgIcon")
        ;
        this._headerDiv = mainDiv.append("h2")
            .text("150")
        ;
        this._textDiv = mainDiv.append("div")
            .text("New Orders")
        ;
        this._moreDiv = mainDiv.append("div")
            .attr("style", "background-color:#2980b9;padding-bottom: 10px;padding-top: 10px")
            .text("More Info")
        ;
        this._iconDiv = this._moreDiv.append("i")
            .attr("class", "fa fa-chevron-circle-down")
            .attr("style", "padding-left: 2%")
        ;
    };

    Step2.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
    };

    Step2.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Step2;
}));
