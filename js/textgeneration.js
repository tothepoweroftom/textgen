 var lines, markov;
 var articles, articleIndex;
 articleIndex =0;
 var concatArticleTitles = '';


 var bits = ['could be', 'was']
 var preUsedNounBuffer = []
 const BUFFERLEN = 32;
 (function($) {

    if ( WEBGL.isWebGLAvailable() ) {


        

    
    } else {
    
        var warning = WEBGL.getWebGLErrorMessage();
        document.getElementById( 'container' ).appendChild( warning );
    
    }

    // Based on https://gist.github.com/asgeo1/1652946
  
    /**
     * Bind an event handler to a "double tap" JavaScript event.
     * @param {function} handler
     * @param {number} [delay=300]
     */
    $.fn.doubletap = $.fn.doubletap || function(handler, delay) {
      delay = delay == null ? 300 : delay;
      this.bind('touchend', function(event) {
        var now = new Date().getTime();
        // The first time this will make delta a negative number.
        var lastTouch = $(this).data('lastTouch') || now + 1;
        var delta = now - lastTouch;
        if (delta < delay && 0 < delta) {
          // After we detect a doubletap, start over.
          $(this).data('lastTouch', null);
          if (handler !== null && typeof handler === 'function') {
            handler(event);
          }
        } else {
          $(this).data('lastTouch', now);
        }
      });
    };
  
  })(jQuery);

 $(document).ready(function () {

    // CHECK FOR DEVICE MOTION
    if (window.DeviceMotionEvent == undefined) {
        //No accelerometer is present. Use buttons. 
        // alert("NO SHAKING BOOTY");
    
    }
    else {
        // alert("SHAKING BOOTY");

    }


    $('#cyclops2').fadeOut();

    $('#cyclops2').click(function() {

        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('#cyclops2').fadeOut();
        // alert("")

    });

     $(window).scroll(function() {
        //  console.log(window.scrollTop());
        if ($(document).scrollTop() < 50) {
            $('#cyclops').fadeIn();
            $('#cyclops2').fadeOut();


        } else if( $(document).scrollTop() > 50 &&  $(document).scrollTop() < 1230 ) {
            $('#cyclops').fadeOut();

            // $('#roboto').fadeOut();
            // $('#question').fadeOut();
            // $('#side-cyclops').fadeIn();

        }
      });
     
    //   https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=API_KEY

     var url =
         "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=9097f737932c4681bd54a2ed6a71dbf1";
     fetch(url)
         .then(response => {
             return response.json();
         })
         .then(myJson => {
             if (articleIndex >= myJson.articles.length) {
                 articleIndex = 0;
             }
             articles = myJson.articles;

             for(let i=0; i<articles.length; i++) {
                 concatArticleTitles += articles[i].title + ' '
             }

         });

    //  markov = new RiMarkov(4);

    //  markov.loadText(adlibtext);
     

     $('body').dblclick(generate);
     $('body').doubletap(()=>{
         generate();
         tweencolor();
     });
  
        

     var myShakeEvent2 = new Shake({
         threshold: 10, // optional shake strength threshold
         timeout: 1000 // optional, determines the frequency of event generation
     });
     myShakeEvent2.start();

     console.log()

    //  $('#tap-hold').fadeOut();
    $('#tap-hold').fadeToggle("slow", "linear" );

     setInterval(() => {
        $('#tap-hold').fadeToggle("slow", "linear" );

        $('#shake').fadeToggle("slow", "linear" );
        
     }, 2000)

     window.addEventListener('shake', generate, false);
 });

 function generate() {
      console.log('generate')
     if (articleIndex >= articles.length) {
        articleIndex = 0;
    }
    //  if (!markov.ready()) return;

     let questionNouns = getNounsFromArticles(articles);
     let questionAdjectives = getAdjectivesFromArticles(concatArticleTitles);
    //  lines = markov.generateSentences(4);
    //  lines = lines[0] + " " +  lines[1] + " " + lines[2] + " " + lines[3];
      //console.log(lines);
     formQuestion(questionNouns, questionAdjectives, "");

  


 }

 function getAdjectivesFromArticles(concat) {
     
    let split = RiTa.tokenize(concat);
    let tags = RiTa.getPosTags(concat, true);
    let verbs = [];
    let adj = []

    tags.forEach((element, index) => {

         //console.log(element, split[index])
  
        if (element.includes("a") || element.includes("n")) {
            if (split[index].length > 4) {
                adj.push(split[index]);

            }
        }

    });

     //console.log(adj);

    let rand = Math.floor(Math.random()*adj.length);


    return `${adj[rand]}`;
 }

 function getNounsFromArticles(articles) {
     let topArticle = articles[articleIndex].title;
     let doc = window.nlp(topArticle);


    //  Get nouns
     let nouns = doc.nouns().data()


     let rand = Math.floor(Math.random()*nouns.length);
     let word = nouns[rand].main
     if(word.includes("\'") || word === 'npr'){
         word = nouns[Math.floor(Math.random()*nouns.length)].main;
     }

     word = RiTa.singularize(word);
     word = RiTa.stripPunctuation(word);
      //console.log(nouns);
     let question = `${word}`;


     return question;
 


 }
 function formQuestion(qNouns,qAdj, markovText) {
    let text = window.nlp(markovText);

     let split = RiTa.tokenize(markovText);
     let tags = RiTa.getPosTags(markovText);
     let verbs = [];
     let adj = []
     let seed = articles[articleIndex%articles.length]
    let nouns = text.nouns().data();
    let rand = Math.floor(Math.random()*nouns.length);

     //console.log(nouns);


    //  tags.forEach((element, index) => {
  
    //      if (element.includes("vbz")) {
    //          if (split[index].length > 4) {
    //              verbs.push(split[index]);

    //          }
    //      }
    //      if (element.includes("jjs") || element.includes("rbs")) {
    //          if (split[index].length > 4) {
    //              adj.push(split[index]);

    //          }
    //      }

    //  });


    //  let verb = verbs[0] ? verbs[0] : ' '
    //  let noun = nouns[rand].singular ? nouns[rand].singular : ' '

   
    // //  let article = nouns[rand].article ? nouns[rand].article : 'the'
    // //  let adverb = adj[0] ? adj[0] : '  '
     let word = bits[Math.floor(Math.random()*bits.length)];
    //  noun = RiTa.stripPunctuation(noun);


    //  Pull NOUN
     let testNoun = getRandomPrefabNoun();

 




     articleIndex += 1;

     Scrambler({
        target: '#artNoun',
        random: [100, 500],
        speed: 100,
        text: qAdj + ' ' + qNouns
      });

      Scrambler({
        target: '#end',
        random: [100, 500],
        speed: 100,
        text: ` ${word} ${testNoun}`
      });

    //   $("#bit").text = ` ${word}`;



 }

 function getRandomPrefabNoun() {
    let noun = ''

    do {
        let rand = Math.floor(Math.random()*preFabNouns.length);
        noun = preFabNouns[rand];
    } while (preUsedNounBuffer.includes(noun));

    if(preUsedNounBuffer.length < BUFFERLEN) {
        preUsedNounBuffer.push(noun);
    } else {
        preUsedNounBuffer.shift();
        preUsedNounBuffer.push(noun);
    }
    return noun;
 }