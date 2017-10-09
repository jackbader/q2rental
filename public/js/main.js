'use strict';
$(document).ready(() => {
  console.log('Hi kids Do You Like Violence?')

  // (function() {


    $('.parallax').parallax();

    $.getJSON('/items')
      .done((items) => {
        const $items = $('#items');

        for (const item of items) {
          const $anchor = $('<a>')
          //   .attr({
          //     href: `/index.html?id=${book.id}`,
          //     'data-delay': '50',
          //     'data-tooltip': book.title
          //   })
          //   .tooltip();

          const $card = $('<div>').addClass('card');
          const $cardImage = $('<div>').addClass('card-image');
          const $col = $('<div>').addClass('col s6 m4 l3');
          const $img = $('<img>').attr({ src: item.img_url, alt: item.title });


          $cardImage.append($img);
          $anchor.append($cardImage);
          $card.append($anchor);
          $col.append($card);
          $items.append($col);
        }
      })
      .fail(() => {
        Materialize.toast('Unable to retrieve books', 3000);
      });
  });
