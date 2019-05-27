 var lines, markov;
 var articles, articleIndex;
 articleIndex =0;

 var bits = ['could be', 'was']

//  var standinverbs 


 $(document).ready(function () {
     

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
     console.log('generate')
     if (articleIndex >= articles.length) {
        articleIndex = 0;
    }
     if (!markov.ready()) return;

     let questionNouns = getNounsFromArticles(articles);
     lines = markov.generateSentences(4);
     lines = lines[0] + " " +  lines[1] + " " + lines[2] + " " + lines[3];
     console.log(lines);
     let formedQuestion = formQuestion(questionNouns, lines);

  


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

     console.log(nouns);
     let question = `${word}`;


     return question;
 


 }
 function formQuestion(qNouns, markovText) {
    console.log(qNouns)
    let text = window.nlp(markovText);

     let split = RiTa.tokenize(markovText);
     let tags = RiTa.getPosTags(markovText);
     let verbs = [];
     let adj = []
     let seed = articles[articleIndex%articles.length]
    let nouns = text.nouns().data();


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
     let noun = nouns[0].main ? nouns[0].main : ' '
     let article = nouns[0].article ? nouns[0].article : 'the'
     let adverb = adj[0] ? adj[0] : '  '
     let word = bits[Math.floor(Math.random()*bits.length)];



     articleIndex += 1;

     Scrambler({
        target: '#artNoun',
        random: [100, 500],
        speed: 100,
        text: qNouns
      });

      Scrambler({
        target: '#end',
        random: [100, 500],
        speed: 100,
        text: ` ${word} ${nouns[0].article} ${adverb} ${noun} `
      });

      $("#bit").text = ` ${word}`;



 }