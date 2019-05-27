var waypoint = new Waypoint({
    element: document.getElementById('intro1'),
    handler: function(direction) {
        if(direction === 'down') {
            $('#intro1').addClass('open');
        } else {

        }
    },
    offset: window.innerHeight
  })

  var waypoint2 = new Waypoint({
    element: document.getElementById('intro2'),
    handler: function(direction) {
        if(direction === 'down') {
            $('#intro1').removeClass('open');
            $('#intro2').addClass('open');
        } else {

        }


    },
    offset: window.innerHeight

  })

  var waypoint3 = new Waypoint({
    element: document.getElementById('about'),
    handler: function(direction) {
    },
    offset: window.innerHeight

  })