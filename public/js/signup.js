$(document).ready(() => {

  console.log('test')
  'use strict';

  // eslint-disable-next-line max-statements
  $('#signUpForm').submit((event) => {
    console.log('test')
    event.preventDefault();

    const first_name = $('#firstName').val().trim();
    const last_name = $('#lastName').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val();
    const username = $('#userName').val().trim();

    if (!first_name) {
      return Materialize.toast('First name must not be blank', 3000);
    }

    if (!last_name) {
      return Materialize.toast('Last name must not be blank', 3000);
    }

    if (!username || username.length < 8) {
      return Materialize.toast(
        'Username must be at least 8 characters long',
        3000
      );
    }

    if (!email) {
      return Materialize.toast('Email must not be blank', 3000);
    }

    if (email.indexOf('@') < 0) {
      return Materialize.toast('Email must be valid', 3000);
    }

    if (!password || password.length < 8) {
      return Materialize.toast(
        'Password must be at least 8 characters long',
        3000
      );
    }



    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ first_name, last_name, email, password, username }),
      dataType: 'json',
      type: 'POST',
      url: '/users'
    };

    $.ajax(options)
      .done(() => {
        window.location.href = 'userSignIn.html';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });
});
