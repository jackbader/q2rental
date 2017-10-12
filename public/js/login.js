'use strict';

$(document).ready(() => {

  console.log('its ready kids')

  $('#loginForm').submit((event) => {

    event.preventDefault();

    const email = $('#email').val();
    const password = $('#password').val();

    if (!email) {
      return Materialize.toast('Must enter an email', 3000);
    }

    if (!password) {
      return Materialize.toast('Must have a password', 3000);
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ email, password }),
      dataType: 'json',
      type: 'POST',
      url: '/token'
    };

    $.ajax(options)
      .done((obj) => {
        console.log(obj)
        if (obj.error) {
          Materialize.toast(obj.error, 3000)
        } else {
          window.location.href = '/index.html';
        }
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });
})
