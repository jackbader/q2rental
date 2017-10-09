$(document).ready(() => {
  console.log('item page ready')

  const itemId = window.QUERY_PARAMETERS.id;

  if (!itemId) {
    window.location.href = '/index.html';
  }

  $title.text()

  //for itemEdit.html

  $(document).ready(function() {
    $('select').material_select();
  });

})
