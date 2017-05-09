var search = function () {
  var query = $('#search-input').val();
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'color.json',
    success: function(data) {
      console.log(data);
	for (var i in data) {
		if (i == query)
			window.location.href = data[i][0].link;
	}
    },
    error: function (data) {
      console.log(data);
    }
  });
};

$(document).ready(function() {
  $('#search-input').on('keypress', function (e) {
    if (e.keyCode == 13) {
      search();
    }
  });
});
