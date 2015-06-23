"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "src/common/HTMLWidget", "css!./step_3"], factory);
    } else {
        root.tutorial_HTMLWidget_Step3 = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {
    function Step3() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._drawStartPos = "center";

    }
    Step3.prototype = Object.create(HTMLWidget.prototype);
    Step3.prototype._class += " tutorial_HTMLWidget_Step3";

    Step3.prototype.testData = function () {
        return this;
    };

    Step3.prototype.publish("valueText", "150", "string", "Value to display");
    Step3.prototype.publish("text", "New Orders", "string", "Description");
    Step3.prototype.publish("moreText", "More Info", "string", "'More' text");
    Step3.prototype.publish("iconClass", "fa-briefcase", "string", "FA Char icon class");

    Step3.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._rootDiv = element.append("div")
            .attr("class", "row-4 clearfix")
        ;
        this._mainDiv = this._rootDiv.append("div")
            .attr("class", "one col-1-4 bgIcon fa-taxi")
        ;
        this._headerDiv = this._mainDiv.append("h2")
        ;
        this._textDiv = this._mainDiv.append("div")
        ;
        this._moreDiv = this._mainDiv.append("div")
            .attr("style", "background-color:#2980b9;padding-bottom: 10px;padding-top: 10px")
        ;
        this._iconDiv = this._moreDiv.append("i")
            .attr("class", "fa fa-chevron-circle-down")
            .attr("style", "padding-left: 2%")
        ;
    };

    Step3.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._mainDiv
            .attr("class", "one col-1-4 bgIcon " + this.iconClass())
        ;
        this._headerDiv
            .text(this.valueText())
        ;
        this._textDiv
            .text(this.text())
        ;
        this._moreDiv
            .text(this.moreText())
        ;
    };

    Step3.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Step3;
}));
