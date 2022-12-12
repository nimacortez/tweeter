$(document).ready(function () {
  $("#tweet-text").on("keyup", function () {
    let characterLimit = 140;
    let charactersRemaining = characterLimit - $(this).val().length;
    $(".counter").text(charactersRemaining);
    if (charactersRemaining < 0) {
      $(".counter").addClass("counter-overlimit");
    } else {
      $(".counter").removeClass("counter-overlimit");
    }
  });
});
