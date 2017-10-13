$(document).ready(() => {

  console.log('profile js linked!')

  $('.loader').hide()

  const userId = window.QUERY_PARAMETERS.id;

  $('#profilePic').change('change', function() {

    $('.loader').show()

    let fileupload = $('#profilePic')

    var link_src
    var file = fileupload[0].files[0];
    var fd = new FormData();
    fd.append("image", file);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image.json");
    xhr.onload = function() {
        link_src=JSON.parse(xhr.responseText).data.link;
        console.log(link_src)

        $('#actualImg').attr('src', link_src)

        const jaxObj = {
          method: "PATCH",
          url: `/users/${userId}`,
          data: {profile_img: link_src}
        }
        $.ajax(jaxObj)
          .done(() => {
            $('.loader').hide()
            console.log('got em')
          })
          .fail(($xhr) => {
            Materialize.toast($xhr.responseText, 3000);
          })

    }
    xhr.setRequestHeader('Authorization', 'Client-ID fa42fb8d48b7ea2');
    xhr.send(fd);
  });

  // $('#itemList').click(function(event) {
  //   console.log(event.target)
  // })

  function getUser(user_id) {
    const jaxObj = {
      method: "GET",
      url: `/users/${user_id}`
    }
    $.ajax(jaxObj)
      .done((user) => {

        const email = user[0].email
        $('#Email').text('email: ' + email)
        const username = user[0].username
        $('#username').text('Username: ' + username)
        const join = user[0].created_at
        const date = new Date(join)
        $('#joindate').text("joindate: " + (date.getMonth() +1) + '/' + new Date(join).getDate() + '/' + date.getFullYear())

        //update photo
        if (!user[0].profile_img) {

        } else {
          $('#actualImg').attr('src', user[0].profile_img)
        }
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      })
  }

    $.getJSON('/token')
      .done((data) => {

        if (data.hasToken === false) {
          //is not logged in
          getUser(user_id)
          loadRentables(user_id)
          $('#profilePic').hide()
          $('.jfilestyle').hide()
        } else {
          // is logged in // check if matches QUERY_PARAMETERS
          const user_id = data.cookies.userId
          if (userId == user_id) {
            console.log('user is viewing their own page')
            getUser(user_id)
            //user is viewing their page
            loadRentables(user_id)
            //add new item button
            //<a class="waves-effect waves-light btn">button</a>
            let button = $('<a>')
            button.addClass('waves-effect waves-light btn')
            button.text('Add new item')
            button.attr('href', '/createItem.html')
            $('#userStats').append(button)

            //change profile pic button
            let editPic = $('<a>')
            editPic.addClass("waves-effect waves-light btn")
            $('.content').append(editPic)

          } else {
            // show query parameters
            getUser(userId)
            loadRentables(userId)
            $('#edit').hide()
            $('.jfilestyle').hide()
          }
        }
      })

      function loadRentables(user_id) {
        $.getJSON('/token')
          .done((data) => {

            const jaxObj = {
              method: "GET",
              url: `/items`
            }
            $.ajax(jaxObj)
              .done((items) => {

                for(const item of items){

                  if (item.owner_id == user_id) {

                    console.log('test')
                    const $card = $('<div>').addClass('card card-image');

                    const $cardContent = $('<div>').addClass('card-content black-text')
                    const $span = $('<span>').addClass('card-title')
                    $span.text(item.title)
                    const $pPrice = $('<p>')
                    $pPrice.text("$" + item.daily_price + " a day.")
                    const $p = $('<p>')
                    $p.text(item.desc)
                    const $img = $('<img>').attr({ alt: item.title, height: 80, width: 80 });


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
                  }
                }


              })
              .fail(($xhr) => {
                Materialize.toast($xhr.responseText, 3000);
              })
            })
      }

})
