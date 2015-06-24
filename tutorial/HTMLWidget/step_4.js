"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "src/common/HTMLWidget", "css!./step_4"], factory);
    } else {
        root.tutorial_HTMLWidget_Step4 = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {
    function Step4() {
        HTMLWidget.call(this);
        this._tag = "div";

        // this._drawStartPos = "center";

    }
    Step4.prototype = Object.create(HTMLWidget.prototype);
    Step4.prototype._class += " tutorial_HTMLWidget_Step4";

    Step4.prototype.testData = function () {
        return this;
    };

    Step4.prototype.publish("valueText", "150", "string", "Value to display");
    Step4.prototype.publish("text", "New Orders", "string", "Description");
    Step4.prototype.publish("moreText", "More Info", "string", "'More' text");
    Step4.prototype.publish("iconClass", "fa-briefcase", "string", "FA Char icon class");
    Step4.prototype.publish("colorFill", "#3498db", "html-color", "Fill Color", null);

    Step4.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._rootDiv = element.append("div")
            .attr("class", "row-4 clearfix")
            .attr("style", "position: relative;top: 0; left: 0; bottom: 0; right: 0;")
        ;
        this._mainDiv = this._rootDiv.append("div")
            .attr("class", "one col-1-4 bgIcon fa-taxi")
            // .pos(1000, 1000)
            .attr("style", " margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;")
            // .attr("style", "  position: absolute;top: 50%;left: 50%; transform: translate(-50%, -50%);")
        ;

        this._headerDiv = this._mainDiv.append("h2")
        ;
        this._textDiv = this._mainDiv.append("div")
        ;
        this._moreDiv = this._mainDiv.append("div")
            .attr("style", "background-color:" + this.colorFill())
        ;
        this._iconDiv = this._moreDiv.append("i")
        ;
    };

    Step4.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._rootDiv
            .attr("style", "position: relative;")
        ;

        this._mainDiv
            .attr("class", "one col-1-4 bgIcon " + this.iconClass())
            // .attr("style", "background-color:" + this.colorFill() + ";margin: auto; position: absolute; left: 0; right: 0;transform: translate(0%, 10%)")
            .attr("style", "background-color:" + this.colorFill() + ";margin: auto; position: absolute; left: 0; right: 0;")
        ;
        this._headerDiv
            .text(this.valueText())
        ;
        this._textDiv
            .text(this.text())
        ;

        this._moreDiv
            .attr("style", "background-color:" + d3.rgb(d3.rgb(this.colorFill())).darker(0.75))
            .text(this.moreText())
        ;
        this._iconDiv = this._moreDiv.append("i")
            .attr("class", "fa fa-chevron-circle-down")
            .attr("style", "padding-left: 5%; padding-top: 5%")
        ;
    };

    Step4.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Step4;
}));
