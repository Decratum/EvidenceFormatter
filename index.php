<!DOCTYPE>

<html>

	<head>

		<title>Evidence Formatter</title>

		<link href="styles/style.less" rel="stylesheet/less" type="text/css" />

		<script src="js/less.js"></script>
		<script src="js/jquery.js"></script>

		<script>

			$("document").ready(function() {
				
				$("button#clearf").click(function() {
					$("div#formatter :input").val("");
				})

				$("button#clearc").click(function() {
					$("div#card").html("");
				})

				$("button#format").click(function() {
					
					//CARD INPUTS
					var tag    = $.trim($("input#tag").val().replace(" and ", " &amp; "));
					var auth   = $.trim($("input#author").val().replace(" and ", " &amp; "));
					var acreds = $.trim($("input#authorc").val().replace(" and ", " &amp; "));
					var pub    = $.trim($("input#pub").val().replace(" and ", " &amp; "));
					var pcreds = $.trim($("input#pubc").val().replace(" and ", " &amp; "));
					var date   = $.trim($("input#date").val());
					var url    = $.trim($("input#url").val());
					var quote  = $.trim($("textarea#quote").val());

					//OPTIONS
					var format = $("input[name='format']:checked").val();

					switch(format) {
						case "decratum":
							var card = '<b>'+tag+'</b><br />';
							var card = card+'<i>';
							var card = card+auth+' <strike>('+acreds+')</strike> ';
							var card = card+pub+' <strike>('+pcreds+')</strike> ';
							var card = card+date;
							var card = card+'<br />';
							var card = card+'<u><a href="'+url+'">'+url+'</a></u>';
							var card = card+'</i>';
							var card = card+'<br /><br />';
							var card = card+'&#8220;'+quote+'&#8221;';
						break;

						case "bluebook":
							var card = '<b>'+tag+'</b><br />';
							var card = card+'<i>';
							var card = card+"<u>"+auth+"</u>"+' ('+acreds+') ';
							var card = card+"<u>"+pub+"</u>"+' ('+pcreds+') ';
							var card = card+date+" ";
							var card = card+'<u><a href="'+url+'">'+url+'</a></u>';
							var card = card+'</i>';
							var card = card+'<br /><br />';
							var card = card+'&#8220;'+quote+'&#8221;';
						break;

						case "source":
							var card = '<b>'+tag+'</b><br />';
							var card = card+'<i>';
							var card = card+"<span>"+auth+"</span>"+' <small>('+acreds+')</small> ';
							var card = card+"<span>"+pub+"</span>"+' <small>('+pcreds+')</small> ';
							var card = card+"<span>"+date+"</span><br />";
							var card = card+'<u><a href="'+url+'">'+url+'</a></u>';
							var card = card+'</i>';
							var card = card+'<br /><br />';
							var card = card+'&#8220;'+quote+'&#8221;';
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

		</script>

	</head>

	<body>

		<h1>Evidence Formatter</h1>
		<h2 class="subtitle">A product of <a href="http://decratum.com/">Decratum Debate Publications</a></h2>

		<div id="formatter">

		
			<label for="tag"><h2>Tagline</h2></label>
		
		
			<input type="text" id="tag" value="A stable bridge it is" />
			
			<br />

			<h2>Citations</h2>

			<div class="citations">

				<label class="short" for="author">Author</label>
				<input class="short" type="text" id="author" value="JP Wilkerson" />

				<label class="long" for="authorc">Credentials</label>
				<input class="long" type="text" id="authorc" value="PhD in Mechanical Engineering" />

				<br />

				<label class="short" for="pub">Publisher</label>
				<input class="short" type="text" id="pub" value="Popular Science" />

				<label class="long" for="pubc">Credentials</label>
				<input class="long" type="text" id="pubc" value="The Future Now" />

				<br />

				<label class="short" for="date">Date</label>
				<input class="short" type="text" id="date" value="May 21, 2011" />
				
				<label class="long" for="url">URL</label>
				<input class="long" type="text" id="url" value="http://www.popsci.com/bridge/" />

			</div>

			<label for="quote"><h2>Quote</h2></label>
			<textarea id="quote" placeholder="quote"></textarea>

		</div>

		<div class="format">
			<input type="radio" name="format" id="decratum" value="decratum" checked="true" />
			<input type="radio" name="format" id="bluebook" value="bluebook" />
			<input type="radio" name="format" id="source" value="source" />
			<input type="radio" name="format" id="cog" value="cog" />
			<input type="radio" name="format" id="ethos" value="ethos" />
		</div>

			

		<div style="text-align: right;">
			<button id="clearf">Clear Citations</button>
			<button id="clearc">Clear Evidence</button>
			<button id="format">Format</button>
		</div>

		<div id="card"></div>



	</body>

</html>