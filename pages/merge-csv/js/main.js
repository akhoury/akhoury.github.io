$(function() {

	CSV.DETECT_TYPES = false;

	var leftEditor;
	var rightEditor;
	var mergedEditor;

	var defaultLeftCSV = ''
	+ 'josh@example.com,Josh,180 Million,1234567890\n'
	+ 'jen@example.com,Jen,150000,0987654321';

	var defaultRightCSV = ''
	+ 'josh@example.com,Josh,180 Million,1234567890\n'
	+ 'jen@example.com,Jen,150000,0987654321\n'
	+ 'aaa@aaa.com,aaaa,23123,098dsasd7654321';

	var leftColEl = $('#left-column');
	var rightColEl = $('#right-column');
	var leftHeadersEl = $('#left-headers');
	var rightHeadersEl = $('#right-headers');
	var ignoreCaseEl = $('#ignore-case');

	var parseAndMerge = function() {
			var push = function(editor, withHeaders) {
				var rows = CSV.parse(editor.getSession().getValue()) || [];
				if (withHeaders) {
					rows.shift();
				}
				return rows;
			};

			clearAlerts();

			var leftData;
			try {
				leftData = push(leftEditor, leftHeadersEl.is(':checked'));
			} catch (e) {
				$('.left-csv-alert').addClass('error').html('CSV ERROR:' + e);
				return;
			}

			var rightData;
			try {
				rightData = push(rightEditor, rightHeadersEl.is(':checked'));
			} catch (e) {
				$('.right-csv-alert').addClass('error').html('CSV ERROR:' + e);
				return;
			}

			var lci = leftColEl.val() || 0;
			var rci = rightColEl.val() || 0;

			var mergedData = [], str = '';
			var ic = ignoreCaseEl.is(':checked');
			leftData.forEach(function(lr, li) {
				var lv = lr[lci];
				rightData.forEach(function(rr, ri) {
					var rv = rr[rci];
					if ((ic && lv.toLowerCase() === rv.toLowerCase()) || lv === rv) {
						var mr = [].concat(['FROM-LEFT-ROW-' + (li + 1)],lr, ['FROM-RIGHT-ROW-' + (ri + 1)], rr);
						str += '\n' + mr.join(',');
						mergedData.push(mr);
					}
				});
			});

			mergedEditor.getSession().setValue(str);
		},

		attachActions = function(){
			$('#left-csv-editor').on('paste keypress keyup keydown', parseAndMerge);
			$('#right-csv-editor').on('paste keypress keyup keydown', parseAndMerge);
			$('input').on('change', parseAndMerge);
		},

		nodeValue = function(selector, value) {
			var getter, setter,
				tag = $(selector),
				tagName = tag.prop('tagName').toLowerCase();

			if ( (tagName === 'input' && tag.attr('type') !== 'file') || tagName === 'textarea') {
				getter = function() {
					return tag.val();
				};
				setter = function(value) {
					tag.val(value);
				};
			} else if (tag.hasClass('ace_editor')) {
				getter = function() {
					return editors[tag.attr('id')].getSession().getValue();
				};
				setter = function(value) {
					editors[tag.attr('id')].getSession().setValue(value);
				};
			} else {
				//todo add RADIO buttons support when I enable the client-site upload
				getter = function() {
					return tag.html();
				};
				setter = function(value) {
					tag.html(value);
				};
			}

			if (value !== undefined) {
				setter(value);
			}

			return getter();
		},

		clearAlerts = function() {
			$('.left-csv-alert').removeClass('error').empty();
			$('.right-csv-alert').removeClass('error').empty();
			$('.merged-csv-alert').removeClass('error').empty();
		};

	attachActions();

	leftEditor = ace.edit('left-csv-editor');
	rightEditor = ace.edit('right-csv-editor');
	mergedEditor = ace.edit('merged-csv-editor');

	leftEditor.getSession().setValue(defaultLeftCSV);
	rightEditor.getSession().setValue(defaultRightCSV);

	parseAndMerge();
});