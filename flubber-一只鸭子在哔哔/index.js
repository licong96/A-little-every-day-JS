
InitFlubber();

function InitFlubber() {
  var flubbers = $(".flubber");
  var flubberQuotes = flubbers.children(".flubber-quote");
  var flubberEyes = flubbers.find(".flubber-eyes");

  var flubX = 0;
  var flubY = 0;
  var statusNo = 0;

  function WalkFlubber() {
    flubbers.animate({
      'margin-top': Math.floor(flubY / 3) % 2 == 0 ? '+=30px' : '-=30px',
      'margin-left': flubX % 2 == 0 ? '+=150px' : '-=150px'
    }, 1000, function () {

      flubX++;
      flubY++;

      flubberQuotes.addClass('show').children('li').hide().eq(statusNo++ % 4).show();
      setTimeout(function () {
        flubberQuotes.removeClass('show');
        WalkFlubber();
      }, 4000);
    });
  }

  WalkFlubber();

  flubbers.each(function () {
    var flubber = $(this);

    $(document).mousemove(function (e) {
      var p = flubber.position();
      var ml = parseInt(flubber.css('margin-left').replace('px', ''));
      var mt = parseInt(flubber.css('margin-top').replace('px', ''));

      var pl = p.left + ml + 11;
      var pt = p.top + mt;

      if (e.clientY < pt) {
        return false;
      }

      var angle = 0;

      if (e.clientX == pl) {
        angle = 0;
      }
      if (e.clientX > pl) {
        var ab = Math.round(e.clientX - pl);
        var ac = Math.round(e.clientY - pt);
        var r = ab / ac;
        var rt = r + 1;
        var angle = (90 - (90 / rt)) * -1;
      }
      else {
        var ab = Math.round(pl - e.clientX);
        var ac = Math.round(e.clientY - pt);
        var r = ab / ac;
        var rt = r + 1;
        var angle = (90 - (90 / rt));
      }

      angle = angle < -60 ? -60 : angle;
      angle = angle > 60 ? 60 : angle;
      angle = angle / 2;

      flubberEyes.css({
        'transform': 'rotate(' + angle + 'deg)',
        '-ms-transform': 'rotate(' + angle + 'deg)',
        '-webkit-transform': 'rotate(' + angle + 'deg)',
        '-o-transition': 'rotate(' + angle + 'deg)'
      });
    });
  });
}