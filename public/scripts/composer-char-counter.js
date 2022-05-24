$(document).ready(function () {
  $('#tweet-text').on('input', function () {
    let max = 140;
    console.log($(this).val());
    const inputChar = $(this).val().length;
    const charLeft = max - inputChar;
    const $total = $('.counter');
    $total.text(charLeft);

    if (charLeft < 0) {
      $total.css('color', 'red');
    }
    else {
      $total.css('color', '#545149');
    };
  });
});