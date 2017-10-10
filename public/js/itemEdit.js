(function() {
  'use strict';

  const bookId = window.QUERY_PARAMETERS.id;

  if (!bookId) {
    window.location.href = '/itemEdit.html';
  }

  const renderBook = function(item) {
    $('#title').val(item.title);
    $('#desc').text(item.description);
    $('#daily_price').val(item.daily_price);
    $('#cancel').attr('href', `/book.html?id=${book.id}`);

    Materialize.updateTextFields();
  };

  const attachListeners = function(book) {
    // eslint-disable-next-line max-statements
    $('#editBookForm').submit((event) => {
      event.preventDefault();

      const title = $('#title').val().trim();
      const desc = $('#desc').val().trim();
      const dailyPrice = $('#daily_price').val().trim();


      if (!title) {
        return Materialize.toast('Title must not be blank', 3000);
      }

      if (!author) {
        return Materialize.toast('Author must not be blank', 3000);
      }

      if (!genre) {
        return Materialize.toast('Genre must not be blank', 3000);
      }

      if (!description) {
        return Materialize.toast('Description must not be blank', 3000);
      }

      if (!coverUrl) {
        return Materialize.toast('Cover URL must not be blank', 3000);
      }

      const options = {
        contentType: 'application/json',
        data: JSON.stringify({ title, author, genre, description, coverUrl }),
        dataType: 'json',
        type: 'PATCH',
        url: `/books/${book.id}`
      };

      $.ajax(options)
        .done(() => {
          window.location.href = `/book.html?id=${book.id}`;
        })
        .fail(($xhr) => {
          Materialize.toast($xhr.responseText, 3000);
        });
    });
  };

  $.getJSON(`/books/${bookId}`)
    .done((book) => {
      renderBook(book);
      attachListeners(book);
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve book', 3000);
    });
})();
