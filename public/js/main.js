'use strict';
$(document).ready(() => {
  console.log('Hi kids Do You Like Violence?')

  $('#myInput').val('')

//djklsfhkjsdflkdhsfksldfglsd
  const slick = function () {
    $.getJSON('/items')
      .done((items) => {
        const $items = $('.your-class');

        for (const item of items) {
        const title = item.title


          const $anchor = $('<a>')
            .attr({
              href: `/item.html?id=${item.id}`,
              'data-delay': '50',
              'data-tooltip': item.title
            })
            .tooltip();

          const $card = $('<div>').addClass('card card-image col s2 m2 l2 ');
          //$card.attr('style', 'background-color: blue;')
          const $cardContent = $('<div>').addClass('card-content black-text')
          const $span = $('<span>').addClass('card-title')
          $span.text(item.title)
          const $pPrice = $('<p>')
          $pPrice.text("$" + item.daily_price + " a day.")
          const $p = $('<p>')
          $p.text(item.desc)
          const $img = $('<img>').attr({ src: item.img_url, alt: item.title, height: 80, width: 80 });

          $card.append($anchor);
          $card.append($img);
          $cardContent.append($span)
          $cardContent.append($pPrice)
          $cardContent.append($p)
          $card.append($cardContent)
          $items.append($card);

          $card.click(function() {
            window.location.href = `item.html?id=${item.id}`;
          })
        }
        $('.your-class').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        });
      })
      .fail(() => {
        Materialize.toast('Unable to retrieve items', 3000);
      });
  }

  function createCard(item) {
    const $anchor = $('<a>')
      .attr({
        href: `/item.html?id=${item.id}`,
        'data-delay': '50',
        'data-tooltip': item.title
      })
      .tooltip();

    const $card = $('<div>').addClass('card card-image col s2 m2 l2 ');
    const $cardContent = $('<div>').addClass('card-content black-text')
    const $span = $('<span>').addClass('card-title')
    $span.text(item.title)
    const $pPrice = $('<p>')
    $pPrice.text("$" + item.daily_price + " a day.")
    const $p = $('<p>')
    $p.text(item.desc)
    const $img = $('<img>').attr({ src: item.img_url, alt: item.title });

    $card.append($anchor);
    $card.append($img);
    $cardContent.append($span)
    $cardContent.append($pPrice)
    $cardContent.append($p)
    $card.append($cardContent)

    $card.click(function() {
      window.location.href = `item.html?id=${item.id}`;
    })

    return $card
  }
  $('#myInput').keydown(function (e) {
    e.stopPropagation();
    if (e.keyCode === 40) {
        e.preventDefault();
        console.log(40);
    } else if (e.keyCode === 38) {
        e.preventDefault();
        console.log(38);
    }
  })

  let searches = 0

  $('#myInput').keyup(function (e) {

    if (searches === 0) {
      $('.your-class').children().remove()
      $('.your-class').removeClass('slick-initialized slick-slider')
    }

    searches++

    let input = $('#myInput').val()

    if (input === '') {
      console.log('blank')
      searches = 0;
      $('.your-class').empty()
      $('.your-class').removeClass('slick-initialized slick-slider')
      slick()
      return
    }



    let length = input.length

    const $items = $('.your-class');
      $.getJSON('/items')
        .done((items) => {
            for (const item of items) {
              let title = item.title
              let newarr = title.split(" ")

              console.log()

              for (const word of newarr) {
                if (word.slice(0, length) === input) {
                  let card = createCard(item)

                  let alreadyin = false;
                  $items.children().each(function() {
                    const $div = this
                    if ($($div).find('img')[0] === undefined) {
                      console.log('undefined yo')
                      alreadyin = false
                    } else {
                      let name = $($div).find('img')[0].alt
                      if (item.title === name) {
                        console.log('item already in search')
                        alreadyin = true
                      }
                    }
                  })

                  if (alreadyin === true) {

                  } else {
                    $items.append(card)
                    break
                  }

                } else {
                  let card = createCard(item)
                  if (word.indexOf(input) !== -1 && input.length !== 1) {

                    let alreadyin = false;
                    console.log($items.children())
                    $items.children().each(function() {
                      const $div = this
                      if ($($div).find('img')[0] === undefined) {
                        console.log('undefined yo')
                      } else {
                        let name = $($div).find('img')[0].alt
                        if (item.title === name) {
                          console.log('item already in search')
                          alreadyin = true
                        }
                      }
                    })

                    if (alreadyin === true) {

                    } else {
                      $items.append(card)
                      break
                    }
                  }
                  else {

                  }

                }
              }

            }
        })
        .fail(() => {
          Materialize.toast('Unable to retrieve items', 3000);
        });
  })


    $('.parallax').parallax();

    slick()

});
