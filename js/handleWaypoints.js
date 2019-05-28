// var waypointRoboto = new Waypoint({
//   element: document.getElementById('roboto'),
//   handler: function(direction) {
//     $( "#roboto" ).fadeOut( "slow", function() {
//       // Animation complete.
//     });


//   },
//   offset: 0
// })



var waypoint = new Waypoint({
    element: document.getElementById('intro1'),
    handler: function(direction) {
        $('#intro1').toggleClass('open-left');
        $('#question').show();

        $('#cyclops2').fadeIn();

    },
    offset: 3*window.innerHeight/4 
  })

  var waypoint2 = new Waypoint({
    element: document.getElementById('intro2'),
    handler: function(direction) {
        $('#intro1').toggleClass('open-left');
        $('#intro2').toggleClass('open-right');
        $('#question').hide();


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
    element: document.getElementById('reel'),
    handler: function(direction) {

        $('#projects').toggleClass('open-right');
        $('#reel').toggleClass('open-left');


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