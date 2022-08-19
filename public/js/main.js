$("#repositoryCollapseBtn").click(function () {
  $(this).toggleClass("active");
  if ($(this).hasClass("active")) {
    $(this).text("Show Repositories");
  } else {
    $(this).text("Hide Repositories");
  }
});
$("#snippetCollapseBtn").click(function () {
  $(this).toggleClass("active");
  if ($(this).hasClass("active")) {
    $(this).text("Show Code Snippets");
  } else {
    $(this).text("Hide Code Snippets");
  }
});

$(".jumbotron").css({ height: $(window).height() + "px" });

$(window).on("resize", function () {
  $(".jumbotron").css({ height: $(window).height() + "px" });
});

// initialize code syntax highlighting
hljs.highlightAll();
