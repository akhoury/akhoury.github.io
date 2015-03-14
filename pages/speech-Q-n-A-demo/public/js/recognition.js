(function(scope) {

    var SR = window.webkitSpeechRecognition || window.SpeechRecognition;

    if ('undefined' === typeof SR) {
        throw 'SpeechRecognition support not detected';
    }

    var $ = scope.$;

    var defaults = {
        continuous: false,
        interim: false,
        debug: ''
    };

    var events = [
        'audiostart',
        'soundstart',
        'speechstart',
        'speechend',
        'soundend',
        'audioend',
        'result',
        'nomatch',
        'error',
        'start',
        'end'];

    var Recognition = function(options) {
        this.options = $.extend(true, {}, defaults, options);
        this.r = new SR();
        this.$dispatcher = $('<i/>');
        this.recognizing(false);
        this.init();
    };

    Recognition.prototype = {
        init: function() {
            events.forEach(function(name) {
                this.r['on' + name] = this['on' + name].bind(this);
            }.bind(this));

            this.r.continuous = this.options.continuous;
            this.r.interim = this.options.interim;
        },

        last: function() {
            return this._lastTranscripts;
        },

        start: function() {
            if (this.recognizing()) {
                return;
            }
            this.r.start();
            return true;
        },

        stop: function() {
            this.r.stop();
        },

        abort: function() {
            return this.r.abort();
        },

        onaudiostart: function(e) {
            this.trigger('audiostart');
        },

        onsoundstart: function(e) {
            this.trigger('soundstart');
        },

        onspeechstart: function(e) {
            this.trigger('speechstart');
        },

        onspeechend: function(e) {
            this.trigger('speechend');
        },

        onsoundend: function(e) {
            this.trigger('soundend');
        },

        onaudioend: function(e) {
            this.trigger('audioend');
        },

        onresult: function(e) {
            var transcripts = [];
            if (e.results.length > 0) {
                var result = e.results[0];
                for (var i = 0; i < result.length; ++i) {
                    transcripts.push(result[i].transcript);
                }
            }
            this.trigger('first.transcript', {transcript: transcripts[0]});
            this.trigger('all.transcripts', {transcripts: transcripts});
            this._lastTranscripts = transcripts;
        },

        onnomatch: function() {
            this.trigger('nomatch');
        },

        onerror: function() {
            this.recognizing(false);
            this.trigger('error');
        },

        onstart: function() {
            this.recognizing(true);
            this.trigger('start');
        },

        onend: function(e) {
            this.recognizing(false);
            this.trigger('end');
        },

        recognizing: function(val) {
            if (val != null) {
                this._recognizing = val;
                this.trigger('recognizing.' + (val ? 'on' : 'off'));
            }
            return this._recognizing;
        },

        on: function() {
            this.$dispatcher.on.apply(this.$dispatcher, arguments);
            return this;
        },

        trigger: function() {
            this.log.apply(this, arguments);
            this.$dispatcher.trigger.apply(this.$dispatcher, arguments);
            return this;
        },

        one: function() {
            this.$dispatcher.one.apply(this.$dispatcher, arguments);
            return this;
        },

        off: function() {
            this.$dispatcher.off.apply(this.$dispatcher, arguments);
            return this;
        },

        log: function(type) {
            var debug = this.options.debug || '';
            var args = Array.prototype.slice.call(arguments);
            if (debug === true || debug.indexOf(type) > -1) {
                args.unshift('[Recognition]');
                console.log.apply(console, args);
            }
        }
    };

    if( typeof exports !== 'undefined' ) {
        if( typeof module !== 'undefined' && module.exports ) {
            exports = module.exports = Recognition
        }
        exports.Recognition = Recognition;
    }
    else {
        scope.Recognition = Recognition;
    }

}).call(this, this.app || this);

