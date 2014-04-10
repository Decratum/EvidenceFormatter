$("document").ready(function() {
	existing = localStorage.getItem('cite');
	existing = JSON.parse(existing);
	for(var key in existing) {
		$("#"+key).val(existing[key]);
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

	$("input, textarea").blur(function() {
		$().getData();
		localStorage.setItem('cite', JSON.stringify(cite));
	});

	$("button#clearf").click(function() {
		$("div#formatter :input").val("");
	});

	$("button#clearc").click(function() {
		$("div#card").html("");
	});

	$("button#format").click(function() {
		
		$().getData();
		var format = $("input[name='format']:checked").val();
		switch(format) {
			case "decratum":
				var card = '<b>'+cite['tag']+'</b><br />';
				var card = card+'<i>';
				var card = card+cite['author']+' <strike>('+cite['authorc']+')</strike> ';
				var card = card+cite['pub']+' <strike>('+cite['pubc']+')</strike> ';
				var card = card+cite['date'];
				var card = card+'<br />';
				var card = card+'<u><a href="'+cite['url']+'">'+cite['url']+'</a></u>';
				var card = card+'</i>';
				var card = card+'<br /><br />';
				var card = card+'&#8220;'+cite['quote']+'&#8221;';
			break;

			case "bluebook":
				var card = '<b>'+cite['tag']+'</b><br />';
				var card = card+'<i>';
				var card = card+"<u>"+cite['author']+"</u>"+' ('+cite['authorc']+') ';
				var card = card+"<u>"+cite['pub']+"</u>"+' ('+cite['pubc']+') ';
				var card = card+cite['date']+" ";
				var card = card+'<u><a href="'+cite['url']+'">'+cite['url']+'</a></u>';
				var card = card+'</i>';
				var card = card+'<br /><br />';
				var card = card+'&#8220;'+cite['quote']+'&#8221;';
			break;

			case "source":
				var card = '<b>'+cite['tag']+'</b><br />';
				var card = card+'<i>';
				var card = card+"<span>"+cite['author']+"</span>"+' <small>('+cite['authorc']+')</small> ';
				var card = card+"<span>"+cite['pub']+"</span>"+' <small>('+cite['pubc']+')</small> ';
				var card = card+"<span>"+cite['date']+"</span><br />";
				var card = card+'<u><a href="'+cite['url']+'">'+cite['url']+'</a></u>';
				var card = card+'</i>';
				var card = card+'<br /><br />';
				var card = card+'&#8220;'+cite['quote']+'&#8221;';
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
		var card = card.replace("<strike>()</strike>", "");

		var prev = $("div#card").html();

		$("div#card").html(card+"<br /><br />"+prev);
	});
});