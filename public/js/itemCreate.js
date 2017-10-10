$(document).ready(() => {

  $("form").on('submit', (e) => {
    const title = $('#title').val()
    const desc = $('#desc').val()
    const daily_price = $('#daily_price').val()
    const cat = $('#cat').val()
    const img = $('#img').val()

    $.getJSON('/token')
      .done((data) => {
        console.log(data)
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      })

  // const item = {
  //   title: title,
  //   desc: desc,
  //   img_url: img,
  //   cat: cat,
  //   owner_id: user_id,
  //   rented: false,
  //   daily_price: daily_price
  // }

  // $.ajax(item)
  //   .done(() => {
  //     // window.location.href = '/index.html';
  //   })
  //   .fail(($xhr) => {
  //     Materialize.toast($xhr.responseText, 3000);
  //   })
})
