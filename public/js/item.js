'use strict';
$(document).ready(() => {
  console.log('item page ready')

  const itemId = window.location.search.replace(/\D+/g, '')

  if (!itemId) {
    window.location.href = '/index.html';
  }

  const renderItem = function(item) {
    $(document).prop('title', item.title);
    $('.img').attr({src: item.img_url})
    $('.desc').text(item.desc)
  }

  const rentButton = function(item) {

    if (item.rented === true) {
      $('.rentButton').addClass('disabled')
      $('.rentButton').text('Currently Rented')
    } else {
      $.getJSON('/token')
        .done((loggedIn) => {
          if (loggedIn) {

          } else {
            $('.rentButton').click(function() {
              Materialize.toast('You must be logged in to rent!', 3000)
            })
          }
        })
        .fail(($xhr) => {
          Materialize.toast($xhr.responseText, 3000);
        });
    }

  }


  $.getJSON(`/items/${itemId}`)
  .done((item) => {
    console.log(item)
    renderItem(item[0]);
    rentButton(item[0])
    //attachListeners(item);
  })
  .fail(() => {
    Materialize.toast('Unable to retrieve item', 3000);
  });


})
