(function() {
    var $ = app.$;
    var Ractive = app.Ractive;

    var templates = ['content'];
    var deferreds = [];
    templates.forEach(function(name) {
        deferreds.push($.get('templates/' + name + '.mustache').done(function(response) {
            app.templates[name] = response;
        }));
    });

    //todo: I don't need the server yet, the answers are fake
    deferreds.push($.get('data/questions.json').done(function(list) {
        app.questions = new app.Questions(list);
    }));

    $.when.apply(null, deferreds).then(init);

    var view;

    function init () {
        var recognition = app.recognition = new app.Recognition({debug: true});

        recognition.on('recognizing.on recognizing.off', function() {
            var v = recognition.recognizing();
            view.set({
                'recognizing': v,
                'mic.on': !v,
                'mic.off': v
            });
        });

        recognition.on('first.transcript', function(e, data) {
            var text = data.transcript;
            view.set('transcript', text);
            guess(text).done(onGuess);
        });

        view = app.view = new Ractive({
            el: '#content',
            template: app.templates['content'],
            data: {
                recognizing: false,
                transcript: '',
                mic: {
                    on: true,
                    off: false
                },
                root: window.__static_page__ ? '.' : ''
            },
            oninit: function () {
                this.on({
                    'micToggle': this.onMicToggle,
                    'inputKeydown': this.onInputKeydown
                });
            },
            onMicToggle: function() {
                if (!recognition.start()) {
                    recognition.stop();
                }
            },
            onInputKeydown: function (e) {
                var key = e.original.which || e.original.keyCode || e.original.charCode;

                clearTimeout(this._timeout);

                var go = function() {
                    guess(e.node.value).done(onGuess);
                }.bind(this);

                // enter will fire a search
                if (key === 13) {
                    go();
                } else if (key === 27) {
                    // esc key will clear the input field
                    e.node.value = "";
                } else {
                    // if you type and wait 2 seconds, it till fire a search
                    this._timeout = setTimeout(go, 2000);
                }

            }
        });
    }

    function onGuess (questions) {
        view.set('questions', questions);

        questions.sort(function(q1, q2) {
            return q1.hits < q2.hits ? 1 : q1.hits > q2.hits ? -1 : 0;
        });
        var answer = questions[0];
        view.set('answer', answer);

        var $v = $(view.el).find('video');
        var v = $v.get(0);
        v.load();

        $v.one('seeked', function() {
            v.play();
        });
        v.currentTime = answer.start;

        var ontimeupdate = function() {
            if (v.currentTime >= answer.stop) {
                v.pause();
                $v.off('timeupdate', ontimeupdate);
            }
        };
        $v.on('timeupdate', ontimeupdate);
    }

    function guess (str) {
        var dfd = new $.Deferred();
        if (!str) return dfd.reject('no value');

        if (!app.questions) {
            return $.get('/question?q=' + str);
        }
        setTimeout(function() {
            dfd.resolve(app.questions.guess(str));
        });
        return dfd;
    }

}).call(this, this.app || this);