$("document").ready(function() {
	
	existing = localStorage.getItem('cite');
	if(existing) {
		existing = JSON.parse(existing);
		for(var key in existing) {
			$("#"+key).val(existing[key]);
		}
	}

	$.fn.amper = function(str) {
		str.replace(" and ", " &amp; ");
		return str;
	};

	
	$.fn.getData = function() {
		cite = new Object();
		$(".data").each(function() {
			id = $(this).attr("id");
			val = $.trim($(this).val());
			toamp = ['tag', 'author', 'authorc', 'pub', 'pubc'];
			if(jQuery.inArray(id, toamp)!==-1) {
				val = $().amper(val);
			}
			cite[id] = val;
		});
	};
	$(window).unload(function() {
	 	$().getData();
		localStorage.setItem('cite', JSON.stringify(cite));
	});

	$.fn.printData = function(cite) {
		var format = localStorage.getItem('format');
		if(format) {
			var format = JSON.parse(format);
		} else {
			var format = 'decratum';
		};
		$("input[value='"+format+"'][name='format']").attr("checked", "true");
		$.each(cite, function(id, val) {
			print[id] = '<span class="item" contenteditable="true" id="'+id+'">'+val+'</span>';
		});

		switch(format) {
			case "decratum":
				var card = '<b>'+print['tag']+'</b><br />';
				var card = card+'<i>';
				var card = card+print['author']+' <del>('+print['authorc']+')</del> ';
				var card = card+print['pub']+' <del>('+print['pubc']+')</del><br />';
				var card = card+print['date'];
				var card = card+'<br />';
				var card = card+'<u>'+print['url']+'</u>';
				var card = card+'</i>';
				var card = card+'<br /><br />';
				var card = card+'&#8220;'+print['quote']+'&#8221;';
			break;

			case "bluebook":
				var card = '<b>'+print['tag']+'</b><br />';
				var card = card+'<i>';
				var card = card+"<u>"+print['author']+"</u>"+' ('+print['authorc']+') ';
				var card = card+"<u>"+print['pub']+"</u>"+' ('+print['pubc']+') ';
				var card = card+print['date']+" ";
				var card = card+'<u>'+print['url']+'</u>';
				var card = card+'</i>';
				var card = card+'<br /><br />';
				var card = card+'&#8220;'+print['quote']+'&#8221;';
			break;

			case "source":
				var card = '<b>'+print['tag']+'</b><br />';
				var card = card+'<i>';
				var card = card+'<span class="source">'+print['author']+'</span>'+' <small>('+print['authorc']+')</small> ';
				var card = card+'<span class="source">'+print['pub']+'</span>'+' <small>('+print['pubc']+')</small> ';
				var card = card+'<span class="source">'+print['date']+'</span><br />';
				var card = card+'<u>'+print['url']+'</u>';
				var card = card+'</i>';
				var card = card+'<br /><br />';
				var card = card+'&#8220;'+print['quote']+'&#8221;';
			break;

			case "cog":
			break;

			case "ethos":
			break;
		}

		var card = card.replace(/ \'/g, " &#8216;");
		var card = card.replace(/\' /g, "&#8217; ");
		var card = card.replace(/\'/g, "&#8217;");
		var card = card.replace(".)\g", ")");
		var card = card.replace("<del>()</del>", "");

		var id = $("#cards .card:first-child").attr("id");
		if(id) {
			var numb = id.split("-");
			var num = numb[1];
			var num = ++num;
		} else {
			var num = '1';
		}
		var id = num;
		cards = localStorage.getItem('cards');
		if(cards) {
			cards = JSON.parse(cards);
		} else {
			cards = new Object();
		}
		cards[id] = cite;
		localStorage.setItem('cards', JSON.stringify(cards));
		$("div#cards").prepend('<span class="card" id="num-'+id+'"><br /><br />'+card+'</span>');
	};

	$("button#format").click(function() {
		$().getData();
		$().printData(cite);
	});

	$.fn.printExisting = function() {
		$("#cards").html("");
		existingCards = localStorage.getItem('cards');
		if(existingCards) {
			existingCards = JSON.parse(existingCards);
			$.each(existingCards, function(id, cite) {
				$().printData(cite);
			});
		}
	};
	$().printExisting();

	$(".item").live("keydown blur", function(event) {
		var type = $(this).attr("id");
		cards = localStorage.getItem('cards');
		cards = JSON.parse(cards);
		var id = $(this).closest(".card").attr("id").split("-");
		var id = id[1];
		cards[id][type] = $(this).html();
		localStorage.setItem('cards', JSON.stringify(cards));
		if(event.keyCode == 13) {
			event.preventDefault();
		}
		
	});

	$("[name='format']").change(function() {
		var format = $(this).val();
		localStorage.setItem('format', JSON.stringify(format));
		$().printExisting();
	});

	$("button#clearf").click(function() {
		$("div#formatter :input").val("");
	});

	$("button#clearc").click(function() {
		var cont = confirm("Are you sure you want to clear your evidence?");
		if(cont) {
			localStorage.removeItem('cards');
			$().printExisting();
		}
	});
});