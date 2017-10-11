$(document).ready(() => {

  $("form").on('submit', (e) => {
    e.preventDefault()

    $.getJSON('/token')
      .done((data) => {
        const user_id = data.cookies.userId
        const title = $('#title').val()
        const desc = $('#desc').val()
        const daily_price = $('#daily_price').val()
        const cat = $('#dropdown').val()
        const img = $('#img')
        console.log(img[0].files[0])

        if (!title) {
          return Materialize.toast('Title must not be blank', 3000);
        }
        if (!desc) {
          return Materialize.toast('Description must not be blank', 3000);
        }
        if (!daily_price) {
          return Materialize.toast('Daily Price must not be blank', 3000);
        }
        if (!cat) {
          return Materialize.toast('Catergory must not be blank', 3000);
        }
        if (!img[0].files[0]) {
          return Materialize.toast('File image must not be blank', 3000);
        }

        var link_src
        var file = img[0].files[0];
        var fd = new FormData();
        fd.append("image", file);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.imgur.com/3/image.json");
        xhr.onload = function() {
            link_src=JSON.parse(xhr.responseText).data.link;


            const item = {
              title: title,
              desc: desc,
              img_url: link_src,
              cat: cat,
              owner_id: user_id,
              rented: false,
              daily_price: daily_price
            }

            post(item)

        }
        xhr.setRequestHeader('Authorization', 'Client-ID fa42fb8d48b7ea2');
        xhr.send(fd);

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
      .done((data) => {
        console.log(data)
        console.log('got em')
        window.location.href = `/item.html?id=${data.id}`;
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      })
    }
})
