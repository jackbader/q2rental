$(document).ready(() => {

  const itemId = window.location.search.replace(/\D+/g, '')

  //if logged in
  $.getJSON('/token')
    .done((data) => {

      if (data.hasToken === false) {
        //is not logged in
        return
      }

      //check if item is users
      let userId = data.cookies.userId

      $.getJSON(`/items/${itemId}`)
        .done((item) => {
          if (item[0].owner_id === userId) {

            let editbutton = $('<a>')
            editbutton.addClass('waves-effect waves-light btn-large')
            editbutton.attr('id', 'ownerBtn')
            editbutton.text('Edit')
            editbutton.attr({
              href: `/itemEdit.html?id=${item[0].id}`,
            })
            let deletebutton = $('<a>')
            deletebutton.addClass('waves-effect waves-light btn-large')
            deletebutton.attr('id', 'deleteBtn')
            deletebutton.text('Delete')
            deletebutton.click(function(event) {
              const jaxObj = {
                method: "DELETE",
                url: `/items/${item[0].id}`
              }
              $.ajax(jaxObj)
                .done((data) => {
                  console.log(data)
                  console.log('got em')
                  window.location.href = `/userProfile.html?id=${userId}`
                })
                .fail(($xhr) => {
                  Materialize.toast($xhr.responseText, 3000);
                })
            })
            $('.buttonRow').append(editbutton)
            $('.buttonRow').append(deletebutton)

          }

        })
        .fail(() => {
          Materialize.toast('Unable to retrieve book', 3000);
        });
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
    $('.desc').text('Description: ' + item.desc)
    $('.title').text(item.title)
  }

  const rentButton = function(item) {

    if (item.rented === true) {
      $('.rentButton').addClass('disabled')
      $('.rentButton').text('Currently Rented')
    } else {
      $.getJSON('/token')
        .done((loggedIn) => {
          if (loggedIn.hasToken) {
            $('.rentButton').click(function() {
              $.ajax({
                method: "PATCH",
                url: `/items/${item.id}`,
                data: {rented: true},
              })
              .done(() => {
                $('.rentButton').addClass('disabled')
                $('.rentButton').text('Currently Rented')
                // window.location.href = 'paymentpage';
              })
            })
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

  const ownerBtn = function (item) {
    $('#ownerBtn').on('click', () => {
      window.location.href = `/userProfile.html?id=${item.owner_id}`;
      console.log(item)
    })
  }

  $.getJSON(`/items/${itemId}`)
  .done((item) => {
    renderItem(item[0])
    rentButton(item[0])
    ownerBtn(item[0])
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
