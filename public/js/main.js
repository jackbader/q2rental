'use strict';
$(document).ready(() => {
  console.log('Hi kids Do You Like Violence?')

  $('#myInput').val('')

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
    const $img = $('<img>').attr({ src: item.img_url, alt: item.title, height: 80, width: 80 });

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

  $('#myInput').keyup(function (e) {

    let input = $('#myInput').val()

    if (input === '') {
      console.log('blank')
      $('.your-class').empty()
      return
    }

    if (input.length === 1) {
      console.log('test')
      $('.your-class').empty()
    }

    let length = input.length

    const $items = $('.your-class');
      $.getJSON('/items')
        .done((items) => {
            for (const item of items) {
              let title = item.title
              let newarr = title.split(" ")

              if ($items.children().length === 3) {
                $('.your-class').empty()
              }

              for (const word of newarr) {
                if (word.slice(0, length) === input) {
                  let card = createCard(item)

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

                } else {
                  if (word.indexOf(input) !== -1 && input.length !== 1) {
                    let card = createCard(item)
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

                }
              }

              // if (item.title.indexOf(input) !== -1) {
              //
              //   let card = createCard(item)
              //   $items.append(card)
              // } else {
              //   console.log('yooo')
              //
              // }
            }
        })
        .fail(() => {
          Materialize.toast('Unable to retrieve items', 3000);
        });
  })

  $('.searchButton').click(function() {
    console.log('test')
    let input = $('#myInput').val()
    console.log(input)
    if (input === "") {
      console.log('null')
      return Materialize.toast('Must enter something into search!', 3000);
    } else {
      $('.your-class').empty()
    }
  })


    $('.parallax').parallax();

    $.getJSON('/items')
      .done((items) => {
        const $items = $('.your-class');

        for (const item of items) {
        const title = item.title


          const $anchor = $('<a>')
            .attr({
              href: `/item.html?id=${item.id}`,
              'data-delay': '50',
              'data-tooltip': item.titlqe
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
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        });
      })
      .fail(() => {
        Materialize.toast('Unable to retrieve items', 3000);
      });
  });
