require.config({
	paths:{
		jquery:'jquery-2.1.1.min'
	}
});

require(['jquery','carousel'],function($,carousel){
	new carousel.Carousel();
})