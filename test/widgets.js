"use strict";
define(["require"], function (require) {
    describe("widgets", function () {
        allWidgets.forEach(function (widget) {
            var path = widget.path;
            describe(path, function () {
                it("require load", function (done) {
                    require([path], function (Widget) {
                        done();
                    });
                });
                var pathParts = path.split("/");
                var className = pathParts[1] + "_" + pathParts[2];
                it("features", function (done) {
                    require([path], function (Widget) {
                        assert.equal(typeof Widget, "function");
                        assert.isFunction(Widget.prototype.constructor, "constructor");
                        done();
                    });
                });
            });
        });
    });
});
