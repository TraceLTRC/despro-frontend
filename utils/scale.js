export function scale(x, inMax, inMin, outMax, outMin) {
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export function perc2color(perc) {
	if (perc < 0) perc = 0;
	if (perc > 100) perc = 100;

	var r, g, b = 0;
	if(perc < 50) {
		r = 255;
		g = Math.round(5.1 * perc);
	}
	else {
		g = 255;
		r = Math.round(510 - 5.10 * perc);
	}
	var h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
}