$(document).ready(() => {


  const itemId = window.QUERY_PARAMETERS.id;

  $('#submitButton').click(function(event) {
    event.preventDefault()

    const title = $('#title').val()
    const desc = $('#desc').val()
    const daily_price = $('#daily_price').val()
    const dropdown = $('#dropdown').val()
    const fileupload = $('#fileupload')
    console.log(fileupload)

    if (!title) {
      return Materialize.toast('Title must not be blank', 3000);
    }
    if (!desc) {
      return Materialize.toast('Description must not be blank', 3000);
    }
    if (!daily_price) {
      return Materialize.toast('Daily Price must not be blank', 3000);
    }
    if (!dropdown) {
      return Materialize.toast('Catergory must not be blank', 3000);
    }
    if (!fileupload.hasClass('valid')) {
      return Materialize.toast('File image must not be blank', 3000);
    }

    let item = {
      title: title,
      desc: desc,
      daily_price: daily_price,
      cat: dropdown,
      img_url: 'test',
    }

    const jaxObj = {
      method: "PATCH",
      url: `/items/${itemId}`,
      data: item,
    }
    $.ajax(jaxObj)
      .done(() => {
        console.log('got em')
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      })


  })

  $.getJSON(`/items/${itemId}`)
    .done((item) => {
        const title = item[0].title
        $('#title').attr({
          value: title
        })
        $('#desc').attr({
          value: item[0].desc
        })
        $('#daily_price').attr({
          value: item[0].daily_price
        })
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve book', 3000);
    });
})
