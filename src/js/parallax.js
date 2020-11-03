import lax from 'lax.js'

window.onload = function() {
	lax.setup() // init

	const updateLax = () => {
		lax.update(window.scrollY)
		window.requestAnimationFrame(updateLax)
	}

	window.requestAnimationFrame(updateLax)

	// if (o["data-lax-anchor"] == el && o.el.style.hasOwnProperty('transform')) {
	// 	o.anchorTop -= Math.floor(o.el.style.transform.replace(/.*translateY\(([\d\.]*)px\).*/g, '$1'));
	// }
}