// Toggle active class on sidebar menu items
$(".sidebar-menu a").click(function () {
  $(".sidebar-menu a").removeClass("active");
  $(this).addClass("active");
});
