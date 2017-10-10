$(document).ready(() => {

  $("form").on('submit', (e) => {
    console.log($('#title').val())
    e.preventDefault()
})

  // const item = {
  //   title,
  //   desc,
  //   img_url,
  //   cat,
  //   owner_id,
  //   rented,
  //   daily_price
  // }

  // $.ajax(item)
})
