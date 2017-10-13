'use strict';
$(document).ready(() => {
  console.log('Hi kids Do You Like Violence?')

  $('#myInput').val('')

  const $items = $('.your-class');


  function catFunction() {
    let cat = $('#dropdown').val()

    $.getJSON('/items')
      .done((items) => {

        $('.your-class').children().remove()
        $('.your-class').removeClass('slick-initialized slick-slider')

        for (const item of items) {
          console.log(item.cat)
          if (cat === 'All') {
            //add all items
            let $card = createCard(item)
            $items.append($card)
          }
          if (item.cat == cat) {
            //add item
            let $card = createCard(item)
            $items.append($card)
          }
        }
      })
      .fail(() => {
        Materialize.toast('Unable to retrieve items', 3000);
      })
  }

  $('#dropdown').change(function(event) {

      catFunction()

  })


  const slick = function () {
    $.getJSON('/items')
      .done((items) => {

        for (const item of items) {
        const title = item.title


          const $anchor = $('<a>')
            .attr({
              href: `/item.html?id=${item.id}`,
              'data-delay': '50',
              'data-tooltip': item.title
            })
            .tooltip();

            const $card = $('<div>').addClass('card col s4 m4 l4 ');
            $card.attr('style', 'padding: 0px;')
            const $cardimage = $('<div>').addClass('card-image')
            // $cardimage.attr('style', 'padding-bottom: 30px;')
            const $cardContent = $('<div>').addClass('card-content black-text')
            const $span = $('<span>').addClass('card-title')
            $span.text(item.title)
            const $pPrice = $('<p>')
            $pPrice.text("Price: $" + item.daily_price + " a day.")
            const $p = $('<p>')
            $p.text('Desc: ' + item.desc)
            const $img = $('<img>').attr({ src: item.img_url, alt: item.title, height: 200, width: 200, style: 'object-fit: contain;' });

            $card.append($anchor);
            $cardimage.append($img)
            $card.append($cardimage);
            $cardContent.append($span)
            $cardContent.append($pPrice)
            $cardContent.append($p)
            $card.append($cardContent)
            $items.append($card)

          // $items.append()

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

    const $card = $('<div>').addClass('card col s4 m4 l4 ');
    $card.attr('style', 'padding: 0px; width:371px;')
    const $cardimage = $('<div>').addClass('card-image')
    // $cardimage.attr('style', 'padding-bottom: 30px;')
    const $cardContent = $('<div>').addClass('card-content black-text')
    const $span = $('<span>').addClass('card-title')
    $span.text(item.title)
    const $pPrice = $('<p>')
    $pPrice.text("Price: $" + item.daily_price + " a day.")
    const $p = $('<p>')
    $p.text('Desc: ' + item.desc)
    const $img = $('<img>').attr({ src: item.img_url, alt: item.title, height: 200, width: 200, style: 'object-fit: contain;' });

    $card.append($anchor);
    $cardimage.append($img)
    $card.append($cardimage);
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

    let cat = $('#dropdown').val()

    if (input === '') {

      //check for cat selection
      if (cat != null) {
        searches = 0;
        $('.your-class').empty()
        $('.your-class').removeClass('slick-initialized slick-slider')
        return catFunction()
      }

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
          console.log(cat)
            for (const item of items) {
              let title = item.title
              let newarr = title.split(" ")

              for (const word of newarr) {
                if (word.slice(0, length).toLowerCase() === input.toLowerCase()) {
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

                    //check if matches cat
                    console.log('test' + item.cat)
                    if (cat === 'All' || cat === null) {
                      $items.append(card)
                      break
                    } else {
                      if (cat === item.cat) {
                        $items.append(card)
                        break
                      }
                    }

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
                      //check if matches cat
                      console.log(item.cat)
                      if (cat === 'All' || cat === null) {
                        $items.append(card)
                        break
                      } else {
                        if (cat === item.cat) {
                          $items.append(card)
                          break
                        }
                      }
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
