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
            .attr({
              href: `/item.html?id=${item.id}`,
              'data-delay': '50',
              'data-tooltip': item.title
            })
            .tooltip();

          const $card = $('<div>').addClass('card card-image col s6 m4 l3');
          const $cardContent = $('<div>').addClass('card-content black-text')
          const $span = $('<span>').addClass('card-title')
          $span.text(item.title)
          const $p = $('<p>')
          $p.text(item.desc)
          const $img = $('<img>').attr({ src: item.img_url, alt: item.title, height: 80, width: 80 });

          $card.append($anchor);
          $card.append($img);
          $cardContent.append($span)
          $cardContent.append($p)
          $card.append($cardContent)
          $items.append($card);
        }
      })
      .fail(() => {
        Materialize.toast('Unable to retrieve items', 3000);
      });
  });
