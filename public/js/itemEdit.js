

$(document).ready(() => {



  // cloudinary.config({
  //   cloud_name: 'sample',
  //   api_key: '874837483274837',
  //   api_secret: 'a676b67565c6767a6767d6767f676fe1'
  // });

  function getBase64Image(img) {
      // Create an empty canvas element
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      // Copy the image contents to the canvas
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Get the data-URL formatted image
      // Firefox supports PNG and JPEG. You could check img.src to guess the
      // original format, but be aware the using "image/jpg" will re-encode the image.
      var dataURL = canvas.toDataURL("image/png");

      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }


  const itemId = window.QUERY_PARAMETERS.id;

  $('#submitButton').click(function(event) {
    event.preventDefault()

    const title = $('#title').val()
    const desc = $('#desc').val()
    const daily_price = $('#daily_price').val()
    const dropdown = $('#dropdown').val()
    const fileupload = $('#fileupload')
    console.log(fileupload[0].files[0])

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
    // if (!fileupload.hasClass('valid')) {
    //   return Materialize.toast('File image must not be blank', 3000);
    // }
    var link_src
    var file = fileupload[0].files[0];
    var fd = new FormData();
    fd.append("image", file);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image.json");
    xhr.onload = function() {
        link_src=JSON.parse(xhr.responseText).data.link;
        console.log(link_src)
        console.log($('#imgyo'))
        $('#imgyo').attr('src', link_src)
        $('#imgyo').attr('alt', 'test')



            let item = {
              title: title,
              desc: desc,
              daily_price: daily_price,
              cat: dropdown,
              img_url: link_src
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
    }
    xhr.setRequestHeader('Authorization', 'Client-ID fa42fb8d48b7ea2');
    xhr.send(fd);


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
        $('#imgyo').attr('src', item[0].img_url)
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve book', 3000);
    });
})
