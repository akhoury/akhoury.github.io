(function(scope) {

    var Questions = function(array) {
        this.list = array;
        this.hash = array.reduce(function(prev, curr) {
            prev[curr.id] = curr;
            return prev;
        }, {});
    };

    Questions.prototype = {
        get: function(id) {
            if (id == null) {
                return this.list;
            }
            return this.hash[id];
        },

        // this is where the natural language processing comes into play
        guess: function(str) {
            str = (str || '').replace(/\s+/g,' ').trim();
            var array = [];
            var words = str.split(' ').filter(function(word) {
                return word && word.length > 2;
            });

            this.list.forEach(function(question, i) {
                var hits = 0;
                words.forEach(function(word) {
                    if (question.question.indexOf(word) > -1) {
                        hits += 1;
                    }
                });
                if (hits) {
                    var hash = question;
                    hash.hits = hits;
                    array.push(hash);
                }
            });

            if (!array.length) {
                array.push({
                    answer: "I cannot answer this question",
                    media: "/media/-1.mp4"
                });
            }

            return array;
        }
    };

    if( typeof exports !== 'undefined' ) {
        if( typeof module !== 'undefined' && module.exports ) {
            exports = module.exports = Questions
        }
        exports.Questions = Questions;
    }
    else {
        scope.Questions = Questions;
    }

}).call(this, this.app || this);