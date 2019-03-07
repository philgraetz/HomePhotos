$(document).ready(function() {
  console.log("document ready");

  // DEBUG
  // $(".collapse").on('show.bs.collapse', function() {
  //   console.log($(this).attr("id") + " (about to be shown)");
  // });
  // $(".collapse").on('shown.bs.collapse', function() {
  //   console.log($(this).attr("id") + " (shown) class='" + $(this).attr("class") + "'");
  // });
  // $(".collapse").on('hide.bs.collapse', function() {
  //   console.log($(this).attr("id") + " (about to be hidden)");
  // });
  // $(".collapse").on('hidden.bs.collapse', function() {
  //   console.log($(this).attr("id") + " (hidden) class='" + $(this).attr("class") + "'");
  // });


  // check navbar transparency now, and on these events
  checkNavbarTransparent();
  $(window).scroll(checkNavbarTransparent);
  $(window).resize(checkNavbarTransparent);
  $("#hamburger-button").click(checkNavbarTransparent);

  // displayPage("#home-page");
  displayPage("#home-page");
});

// Events that potentially change navbar background:
// - Document ready
// - Scroll
// - Resize
// - hamburger button click
// If scrollPos > 0
//   transparent = false
// else if hamburgerMenu visible and nav-item-list visible
//   transparent = false
// else
//   transparent = true
function checkNavbarTransparent() {
  let scrollPos = $(document).scrollTop();
  let buttonVis = $("#hamburger-button").is(":visible");
  let itemVis = $("#nav-item-list").is(":visible");
  let thisId = $(this).attr("id")

  // If the toggler button was just pressed,
  // itemVis is about to be inverted. So use the inverse
  if (thisId === "hamburger-button")
    itemVis = !itemVis;

  // console.log("this id = " + thisId);
  // console.log("Scroll position = " + scrollPos);
  // console.log("hambuger-button visible: " + buttonVis);
  // console.log("navbaritem-list visible: " + itemVis);
  if (scrollPos !== 0) {
    setNavbarTransparent(false);
  } else if (buttonVis && itemVis) {
    setNavbarTransparent(false);
  } else {
    setNavbarTransparent(true);
  }
}

// Set navbar transparency 
// (modify classes only if they need to change)
let nbIsTransparent = true;
function setNavbarTransparent(toTransparent) {
  if (toTransparent && !nbIsTransparent) {
    $("#page-navbar").removeClass("bg-light");
    $("#page-navbar").addClass("bg-transparent");
    nbIsTransparent = true;
  } else if (!toTransparent && nbIsTransparent) {
    $("#page-navbar").removeClass("bg-transparent");
    $("#page-navbar").addClass("bg-light");
    nbIsTransparent = false;
  }
}

function displayPage(page) {
  let doHide = false;
  if (!$(page).hasClass("show")) {
    // This page is not currently shown
    // Hide page(s) currently shown (There really should be at most one)
    doHide = true;
  } 
  $(page).collapse("show");
  if (doHide) {
    $("#pages div.collapse.show").collapse("hide");
  }
}
