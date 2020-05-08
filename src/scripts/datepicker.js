$(function () {
  $('input[name="datetimes"]').daterangepicker({
    locale: {
      format: 'DD/MM/YYYY'
    }
  }, function (start, end) {
    priceUpdate(end.diff(start, 'days'));
  });
});
