/**
Code Taker
Gia

Da Vinci?!
*/

"use strict";

$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "I know.": function () {
      $(this).dialog(`close`);
    },
  },
});

$(`.secret`).one(`mouseover`, function (event) {
  $(this).addClass(`found`, 500);
  $(this).draggable({
    helper: `clone`,
  });
});

$(`#answer`).droppable({
  drop: function (event, ui) {
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);

    //check if they got it
    if ($(this).text() === `Theremin`) {
      $(`#solved-dialog`).dialog(`open`);
    }
  },
});
