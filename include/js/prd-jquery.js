var basePath = "/prd-ita/";
var myScroll;


$(function(){
	$('body').addClass('js');
	var menu = $('#menu'),
		menulink = $('.menu-link'),
		menuTrigger = $('.has-subnav > a');
		anchor = $('#anchor');
	
	anchor.on('click', '.menu-link', function(e) {
		console.log('menulink clicked');
		e.preventDefault();
		menulink.toggleClass('active');
		menu.toggleClass('active');
	});
	
	/* Espande menu e scambia +/- */
	anchor.on('click', '.has-subnav > a', function(e) {
		console.log('menutrigger clicked');
		e.preventDefault();
		$(this).toggleClass('active').next('ul').toggleClass('active');
	});

	/* tiene aperto il menu al cambio di pagina */
	anchor.on('click', 'a[href*=#]:not([href=#])', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({ scrollTop: target.offset().top }, 600);
				return false;
			}
		}
	});

    $(".table").wrap("<div class = 'wrapper'><div class = 'scroller'>");
	buildNavPath();
	myScroll = {};//new IScroll('.wrapper', { scrollX: true, scrollY: true, mouseWheel: true, click: true });
});

function buildNavPath() {
	var navPathElement = $('#nav-path');
	if (globalNavPath && navPathElement)
	{
		navPathElement.append("<a href='/prd-ita/'>PRD Home</a>");

		for(x = 0 ; x < globalNavPath.length ; x++)
		{
			navPathElement.append(" / ");
			navPathElement.append("<a href='" + globalNavPath[x].href + "'>" + globalNavPath[x].name + "</a>");
		}
		navPathElement.append(" / <a href='#'>" + globalTitle + "</a>");
	}
};

function highlightNavLocation(navPath) {
	if (navPath == undefined || navPath == null || navPath.length <= 0) {
		var loc = window.location.href;
		loc = loc.substring(loc.indexOf(basePath));
		
		if (loc.indexOf("#") > 0) {
			loc = loc.substring(0, loc.indexOf("#"));
		}
		if (loc.indexOf("?") > 0) {
			loc = loc.substring(0, loc.indexOf("?"));
		}
		navPath = [{ href: loc }];
	}

	for (var i=0; i<navPath.length; i++) {
		var path = navPath[i].href;

		if (path == null || path == undefined || path == "#") {
			continue;
		}

		var link = $("#nav-menu a[href='" + path + "']");

		if (link.length > 0) {
			//Found one, so let's do our thing
			$("#nav-menu .active").removeClass("active");
			$("#nav-menu .active-level").removeClass("active-level");
			
			link.addClass("active active-level");
			link.parents("ul").addClass("active").siblings("a").addClass("active active-level");

			return;
		}
	}
}