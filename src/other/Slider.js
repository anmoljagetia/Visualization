"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "./ISlider", "../common/Icon", "css!./Slider"], factory);
    } else {
        root.other_Slider = factory(root.d3, root.common_SVGWidget, root.other_ISlider, root.common_Icon);
    }
}(this, function (d3, SVGWidget, ISlider, Icon) {
    function Slider() {
        SVGWidget.call(this);
        ISlider.call(this);

        this.selectionLabel("");


        this.xScale = d3.scale.linear()
            .clamp(true)
        ;
        var context = this;
        
        this._icon = new Icon()
            .faChar("\uf04b")
            // .padding_percent(50)
            .scale(1.5)
        ;

        this.brush = d3.svg.brush()
            .x(this.xScale)
            .extent([0, 0])
            .on("brushstart", function (d) { context.brushstart(d, this); })
            .on("brush", function (d) { context.brushmove(d, this); })
            .on("brushend", function (d) { context.brushend(d, this); })
        ;
        this.brush.empty = function () {
            return false;
        };

        this.axis = d3.svg.axis()
              .scale(this.xScale)
              .orient("bottom")
              .tickFormat(function (d) { return d; })
              .tickSize(0)
              .tickPadding(12)
        ;
    }
    Slider.prototype = Object.create(SVGWidget.prototype);
    Slider.prototype._class += " other_Slider";
    Slider.prototype.implements(ISlider.prototype);

    Slider.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:['Basic']});
    Slider.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:['Basic']});
    Slider.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:['Basic']});

    Slider.prototype.publish("showPlay", false, "boolean", "Show Play Button");
    Slider.prototype.publish("allowRange", false, "boolean", "Allow Range Selection");
    Slider.prototype.publish("low", 0, "number", "Low");
    Slider.prototype.publish("high", 100, "number", "High");
    Slider.prototype.publish("step", 10, "number", "Step");
    Slider.prototype.publish("playInterval", 1000, "number", "Play Interval");
    Slider.prototype.publish("selectionLabel", "", "string", "Selection Label");
    Slider.prototype.publishProxy("diameter", "_icon", "diameter");
    Slider.prototype.publish("gap", 50, "number", "gap");

    Slider.prototype.testData = function (_) {
        this.columns("Percent");
        this.data(66);
        return this;
    };

    Slider.prototype.testData2 = function (_) {
        this.allowRange(true);
        this.columns("Percent");
        this.data([44, 66]);
        return this;
    };

    Slider.prototype.play = function () {
        var context = this;
        var tick = this.low(); 

        this.intervalHandler = setInterval(function () { 
            context 
                .data(tick) 
                .render() 
            ;
            tick += context.step();
            if (tick > context.high()) {
                clearInterval(context.intervalHandler);
            }
        }, context.playInterval());
        // }, 1000);
    };

    Slider.prototype.pause = function () {
        // Will be added later
    };

    Slider.prototype.stop = function () {
        console.log("stopped");
        this._icon
            .faChar("\uf04b")
            .render()
        ;
 
        clearInterval(this.intervalHandler);
        this.data(this.low());
    };

    Slider.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            if (this.brushg) {
                this.brushg
                    .call(this.brush.extent(this.allowRange() ? this._data : [this._data, this._data]))
                ;
            }
        }
        return retVal;
    };

    Slider.prototype.enter = function (domNode, element) {
        if ((this.high() - this.low()) / this.step() <= 10) {
            this.axis.tickValues(d3.merge([d3.range(this.low(), this.high(), this.step()), [this.high()]]));
        }

        this._playing = false;

        this.axisElement = element.append("g")
            .attr("class", "x axis")
        ;

        this.brushg = element.append("g")
            .attr("class", "brush")
            .call(this.brush)
        ;

        this.brushg.select(".background")
            .attr("y", -9)
            .attr("height", 18)
        ;

        this.brushg.select(".extent")
            .attr("y", "-10")
            .attr("height", "20")
        ;

        this.brushg.selectAll(".resize").select("rect")
            .attr("x", function (d) { return d === "e" ? 0 : -8; })
            .attr("y", "-10")
            .attr("width", "8")
            .attr("height", "20")
        ;

        this.handle = this.brushg.selectAll(".resize").append("path")
            .attr("class", "handle")
            .attr("transform", "translate(0,-27)")
        ;

        this._icon
            .target(domNode)
            .pos({x: this.width()/2 - 50, y: 0})
            .display(false)
            .render()
        ;
    };

    Slider.prototype.update = function (domNode, element) {
        var context = this;
        var width = this.width() - 100;  //TODO - 50 should be "padding"
        var height = this.height() - 20;  //TODO - 20 should be "padding"

        this.xScale
            .domain([this.allowRange(), this.high()])
            .range([-width/2, width/2])
        ;
         this.data(this._data);
       
        if (this.showPlay()) {
            this._icon
                .display(true)
                .render()
            ;
            this.xScale
                .domain([this.allowRange(), this.high()])
                .range([-width/2, width/2 - this._icon.diameter() - this.gap()])
            ;
            this.data(this._data);

        } else {
            this._icon
                .display(false)
                .render()
            ;
        }

        this._icon.click = function(d) {
            d3.event.stopPropagation(); 
            if (context._playing) {
                context._playing = false;
                context.stop();
                d
                    .faChar("\uf04b")
                    .render()
                ;
            } else {
                context._playing = true;
                context.play();
                d
                    .faChar("\uf04c")
                    .render()
                ;
            }
        };

        this.axisElement
            .call(this.axis)
        ;
        this.axisElement.selectAll('.tick > text')
                .style('fill',this.fontColor())
                .style('font-size',this.fontSize())
                .style('font-family',this.fontFamily())
        ;

        var range = this.xScale.range();
        this.brushg.select(".background")
            .attr("x", range[0])
            .attr("width", range[1] - range[0])
        ;

        this.handle
            .attr("d", function (d) { return context.handlePath(d); })
        ;

        if (this._initHandle === undefined) {
            this._initHandle = true;
            var selVal = [this.low(), this.low()];
            if (this.allowRange() && this._data) {
                selVal = this._data;
            } else if (this._data){
                selVal = [this._data, this._data];
            }
            this.brushg
                .call(this.brush.extent(selVal))
            ;
        }
    };

    Slider.prototype.brushstart = function (d, self) {
        if (!d3.event || !d3.event.sourceEvent) return;
        d3.event.sourceEvent.stopPropagation();
    };

    Slider.prototype.brushmove = function (d, self) {
        if (!d3.event || !d3.event.sourceEvent) return;
        d3.event.sourceEvent.stopPropagation();
        if (!this.allowRange()) {
            var mouseX = this.xScale.invert(d3.mouse(self)[0]);
            d3.select(self)
                .call(this.brush.extent([mouseX, mouseX]))
            ;
        }
    };

    Slider.prototype.brushend = function (d, self) {
        if (!d3.event || !d3.event.sourceEvent) return;
        d3.event.sourceEvent.stopPropagation();
        if (!this.allowRange()) {
            var mouseX = this.nearestStep(this.xScale.invert(d3.mouse(self)[0]));
            d3.select(self)
                .call(this.brush.extent([mouseX, mouseX]))
            ;
            this._data = mouseX;
            if (this.selectionLabel()) {
                var clickData = {};
                clickData[this.selectionLabel()] = mouseX;
                this.click(clickData);
            } else {
                this.click(mouseX);
            }
        } else {
            var extent = this.brush.extent();
            extent[0] = this.nearestStep(extent[0]);
            extent[1] = this.nearestStep(extent[1]);
            this._data = extent;
            d3.select(self)
                .call(this.brush.extent(extent))
            ;
            this.newSelection(extent[0], extent[1]);
        }
    };

    Slider.prototype.nearestStep = function (value) {
        return this.low() + Math.round((value - this.low()) / this.step()) * this.step();
    };

    Slider.prototype.handlePath = function (d, i) {
        var e = +(d === "e");
        var x = e ? 1 : -1;
        var xOffset = this.allowRange() ? 0.5 : 0.0;
        var y = 18;
        var retVal = "M" + (xOffset * x) + "," + y + 
            "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) +
            "V" + (2 * y - 6) +
            "A6,6 0 0 " + e + " " + (xOffset * x) + "," + (2 * y)
        ;
        if (this.allowRange()) {
            retVal += "Z" +
                "M" + (2.5 * x) + "," + (y + 8) +
                "V" + (2 * y - 8) +
                "M" + (4.5 * x) + "," + (y + 8) +
                "V" + (2 * y - 8)
            ;
        } else {
            retVal += "M" + (1 * x) + "," + (y + 8) +
                "V" + (2 * y - 8)
            ;
        }
        return retVal;
    };

    return Slider;
}));
