$(document).ready(() => {

  console.log('profile js linked!')


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
            //new Date(join)
          })
          .fail(($xhr) => {
            Materialize.toast($xhr.responseText, 3000);
          })
        })
      })
