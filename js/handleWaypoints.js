var waypoint = new Waypoint({
    element: document.getElementById('intro1'),
    handler: function(direction) {
        $('#intro1').toggleClass('open-left');


    },
    offset: 3*window.innerHeight/4 
  })

  var waypoint2 = new Waypoint({
    element: document.getElementById('intro2'),
    handler: function(direction) {
        $('#intro1').toggleClass('open-left');
        $('#intro2').toggleClass('open-right');


    },
    offset: window.innerHeight/2

  })

  var waypoint3 = new Waypoint({
    element: document.getElementById('about'),
    handler: function(direction) {
        $('#intro2').toggleClass('open-right');

        $('#about').toggleClass('open-right');

    },
    offset: window.innerHeight/2

  })


  var waypoint4 = new Waypoint({
    element: document.getElementById('projects'),
    handler: function(direction) {

        $('#about').toggleClass('open-right');
        $('#projects').toggleClass('open-left');


    },
    offset: window.innerHeight/2

  })


  var waypoint5 = new Waypoint({
    element: document.getElementById('social'),
    handler: function(direction) {

        $('#projects').toggleClass('open-right');
        $('#social').toggleClass('open-left');


    },
    offset: window.innerHeight/2

  })

  var waypoint6 = new Waypoint({
    element: document.getElementById('experiment'),
    handler: function(direction) {
        $('#social').toggleClass('open-left');



    },
    offset: window.innerHeight/2

  })