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

            guess(text).done(function(questions) {
                view.set('questions', questions);

                questions.sort(function(q1, q2) {
                    return q1.hits < q2.hits ? 1 : q1.hits > q2.hits ? -1 : 0;
                });
                var answer = questions[0];
                view.set('answer', answer);

                var $v = $(view.el).find('video');
                var v = $v.get(0);

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
            })
        });

        var view = app.view = new Ractive({
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
                    'micToggle': this.onMicToggle
                });
            },
            onMicToggle: function() {
                if (!recognition.start()) {
                    recognition.stop();
                }
            }
        });
    }

    function guess (str) {
        if (!app.questions) {
            return $.get('/question?q=' + str);
        }
        var dfd = new $.Deferred();
        setTimeout(function() {
            dfd.resolve(app.questions.guess(str));
        });
        return dfd;
    }

}).call(this, this.app || this);