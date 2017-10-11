$(document).ready(() => {

  console.log('profile js linked!')

  // $('#itemList').click(function(event) {
  //   console.log(event.target)
  // })


    $.getJSON('/token')
      .done((data) => {
        console.log(data)
        const user_id = data.cookies.userId
        console.log(user_id)

        const jaxObj = {
          method: "GET",
          url: `/users/${user_id}`
        }
        $.ajax(jaxObj)
          .done((user) => {

            console.log(user)

            const username = user[0].username
            $('#username').text('Username: ' + username)
            const join = user[0].created_at
            const date = new Date(join)
            $('#joindate').text("joindate: " + (date.getMonth() +1) + '/' + new Date(join).getDate() + '/' + date.getFullYear())

          })
          .fail(($xhr) => {
            Materialize.toast($xhr.responseText, 3000);
          })
        })
      })

      $.getJSON('/token')
        .done((data) => {
          console.log(data)
          const user_id = data.cookies.userId
          console.log("we made it")

          const jaxObj = {
            method: "GET",
            url: `/items`
          }
          $.ajax(jaxObj)
            .done((items) => {
              console.log(items);
              for(const item of items){
                if (item.owner_id === user_id) {



                  const $card = $('<div>').addClass('card card-image');

                  const $cardContent = $('<div>').addClass('card-content black-text')
                  const $span = $('<span>').addClass('card-title')
                  $span.text(item.title)
                  const $pPrice = $('<p>')
                  $pPrice.text("$" + item.daily_price + " a day.")
                  const $p = $('<p>')
                  $p.text(item.desc)
                  const $img = $('<img>').attr({ src: item.img_url, alt: item.title, height: 80, width: 80 });


                  $card.append($img);
                  $cardContent.append($span)
                  $cardContent.append($pPrice)
                  $cardContent.append($p)
                  $card.append($cardContent)
                  $card.click(function() {
                    window.location.href = `/item.html?id=${item.id}`
                  })
                  let li = $('<li>')
                  li.append($card)
                  $('#itemList').append(li);



                  console.log(item)
                }
              }


            })
            .fail(($xhr) => {
              Materialize.toast($xhr.responseText, 3000);
            })
          })
