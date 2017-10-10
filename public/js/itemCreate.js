$(document).ready(() => {

  $("form").on('submit', (e) => {
    e.preventDefault()

    $.getJSON('/token')
      .done((data) => {
        const user_id = data.cookies.userId
        const title = $('#title').val()
        const desc = $('#desc').val()
        const daily_price = $('#daily_price').val()
        const cat = $('#cat').val()
        const img = $('#img').val()

        const item = {
          title: title,
          desc: desc,
          img_url: img,
          cat: cat,
          owner_id: user_id,
          rented: false,
          daily_price: daily_price
        }

        post(item)

      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      })
    })

  function post(item) {

    const jaxObj = {
      method: "POST",
      url: '/items',
      data: item,
    }
    $.ajax(jaxObj)
      .done(() => {
        console.log('got em')
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      })
    }
})
