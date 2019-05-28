 var lines, markov;
 var articles, articleIndex;
 articleIndex =0;
 var concatArticleTitles = '';


 var bits = ['could be', 'was']
 var preUsedNounBuffer = []
 const BUFFERLEN = 32;


 $(document).ready(function () {

     $(window).scroll(function() {
        if ($(document).scrollTop() < 100) {
            $('#roboto').fadeIn();
            $('#side-cyclops').fadeOut();


            // $('#question').fadeIn();

        } else {
            $('#roboto').fadeOut();
            // $('#question').fadeOut();
            $('#side-cyclops').fadeIn();

        }
      });
     

     var url =
         "https://newsapi.org/v2/top-headlines?" +
         "country=us&" +
         "apiKey=9097f737932c4681bd54a2ed6a71dbf1";
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

     markov = new RiMarkov(4);

         markov.loadText(adlibtext);
     

     $('body').dblclick(generate);
     var myShakeEvent2 = new Shake({
         threshold: 10, // optional shake strength threshold
         timeout: 1000 // optional, determines the frequency of event generation
     });
     myShakeEvent2.start();

     window.addEventListener('shake', generate, false);
 });

 function generate() {
      //console.log('generate')
     if (articleIndex >= articles.length) {
        articleIndex = 0;
    }
     if (!markov.ready()) return;

     let questionNouns = getNounsFromArticles(articles);
     let questionAdjectives = getAdjectivesFromArticles(concatArticleTitles);
     lines = markov.generateSentences(4);
     lines = lines[0] + " " +  lines[1] + " " + lines[2] + " " + lines[3];
      //console.log(lines);
     formQuestion(questionNouns, questionAdjectives, lines);

  


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
     if(word.includes("\'")){
         word = noun[Math.floor(Math.random()*nouns.length)].main;
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


     tags.forEach((element, index) => {
  
         if (element.includes("vbz")) {
             if (split[index].length > 4) {
                 verbs.push(split[index]);

             }
         }
         if (element.includes("jjs") || element.includes("rbs")) {
             if (split[index].length > 4) {
                 adj.push(split[index]);

             }
         }

     });


     let verb = verbs[0] ? verbs[0] : ' '
     let noun = nouns[rand].singular ? nouns[rand].singular : ' '

   
     let article = nouns[rand].article ? nouns[rand].article : 'the'
     let adverb = adj[0] ? adj[0] : '  '
     let word = bits[Math.floor(Math.random()*bits.length)];
     noun = RiTa.stripPunctuation(noun);


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