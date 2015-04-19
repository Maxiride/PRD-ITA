function toggleLinks(className, visible) {
	var ctls = $("." + className);
	if (visible) {
		ctls.show();
	} else {
		ctls.hide();
	}
}

function showLinks() {
	if (this.type === "radio")
	{
		var ctls = $("input[name='" + this.name + "']:not(:checked)");
		ctls.each(function (i, o) {
			toggleLinks("link-" + o.value, false);
			$.cookie("link-by-book-" + o.value, "0", 1000);
		});
	}

	toggleLinks("link-" + this.value, this.checked);
	$.cookie("link-by-book-" + this.value, this.checked ? "1" : "0", 1000);

	return true;
}

function setupLinkByBook() {
	$(".link-by-book").each(function (i, o) {
		var visible = !($.cookie("link-by-book-" + o.value) === "0");

		o.checked = visible;
		toggleLinks("link-" + o.value, visible);
	}).change(showLinks);
}

function setupLinkByArchetype() {
}

$(function () {
	setupLinkByBook();
	setupLinkByArchetype();
});