'use strict';

$(document).ready(() => {

  console.log('its ready kids')

  $('#loginForm').submit((event) => {

    console.log('lol')
    event.preventDefault();

    const email = $('#email').val();
    console.log(email)
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
      .done(() => {
        window.location.href = '/index.html';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });
})
