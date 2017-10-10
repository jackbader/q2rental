'use strict';
$(document).ready(() => {
  console.log('item page ready')

  const itemId = window.location.search.replace(/\D+/g, '')

  //if logged in
  $.getJSON('/token')
    .done((data) => {

      console.log(data)

      if (data.hasToken) {
        console.log('is logged in')

        //check if item is users
        let userId = data.cookies.userId
        console.log('userid: ' + userId)
        console.log('itemid: ' + itemId)

        $.getJSON(`/items/${itemId}`)
          .done((item) => {
            console.log(item[0].owner_id)
            if (item[0].owner_id === userId) {

                      let editbutton = $('<a>')
                      editbutton.addClass('waves-effect waves-light btn-large')
                      editbutton.text('Edit')
                      editbutton.attr({
                        href: `/itemEdit.html?id=${item[0].id}`,
                        'data-delay': '50',
                        'data-tooltip': item.title
                      })
                      .tooltip();
                      $('.buttonRow').append(editbutton)
            }

          })
          .fail(() => {
            Materialize.toast('Unable to retrieve book', 3000);
          });
      }
      else {
        console.log('is not logged in')
      }
    })
    .fail(($xhr) => {
      Materialize.toast($xhr.responseText, 3000);
    });

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

  //for itemEdit.html

  $(document).ready(function() {
    $('select').material_select();
  });

})
