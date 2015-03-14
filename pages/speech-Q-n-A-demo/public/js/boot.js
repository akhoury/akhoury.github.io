(function(scope) {
    var app = scope.app || {};
    app.$ = scope.$ || scope.jQuery || $;
    app.Ractive = scope.Ractive || Ractive;
    app.templates = {};

    scope.app = app;
}).call(this, this);