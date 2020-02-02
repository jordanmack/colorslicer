// Source: http://stackoverflow.com/a/5624139/9979
function rgbToHex(r, g, b) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Source: http://stackoverflow.com/a/5624139/9979
function hexToRgb(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

jQuery(document).ready(function()
{
	jQuery("#calculate").on("click", function(e)
	{
		e.preventDefault();

		var color1 = hexToRgb(jQuery("#color1").val());
		var color2 = hexToRgb(jQuery("#color2").val());
		var slices = parseInt(jQuery("#slices").val());
		var outputHtml = "";
		var outputJson = [];

		for(var i = 0; i < slices; ++i)
		{
			var r = Math.round((color2.r - color1.r) / (slices - 1) * i) + color1.r;
			var g = Math.round((color2.g - color1.g) / (slices - 1) * i) + color1.g;
			var b = Math.round((color2.b - color1.b) / (slices - 1) * i) + color1.b;
			var colorHex = rgbToHex(r, g, b); 

			outputHtml += "<div class='color' style='background: "+colorHex+"'><input type='text' class='label' value='"+colorHex+"'></div>";
			outputJson.push(colorHex);
		}

		jQuery("#outputColors").html(outputHtml);
		jQuery("#outputJson").html(JSON.stringify(outputJson));

		jQuery(".color").on("click", function()
		{
			jQuery(this).children("input")[0].select();
		});
	});

	jQuery("#color1, #color2").each(function()
	{
		var $this = jQuery(this);
		$this.colorPicker({opacity: false});
	});

	jQuery("#outputJson").on("click", function()
	{
		this.select();
	});
});