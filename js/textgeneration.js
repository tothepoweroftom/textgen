 var lines, markov;
 var articles, articleIndex;
 articleIndex =0;

 var bits = ['could be', 'could', 'should be', 'might be']

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

     lines = markov.generateSentences(3);
     lines = lines[0] + lines[1] + lines[2]
     console.log(lines);
     let formedQuestion = formQuestion(questionNouns, lines);

     $('#question').text(formedQuestion);


 }

 function getNounsFromArticles(articles) {
     let topArticle = articles[articleIndex].title;
     console.log(topArticle);
     let split = RiTa.tokenize(topArticle);
     let tags = RiTa.getPosTags(topArticle);
     let nouns = [];
     tags.forEach((element, index) => {
         // console.log(element);
         if (element.includes("nn")) {
             nouns.push(split[index]);
         }
     });

     console.log(nouns);
     let question = "";
     // this.lstm.generate(this.question)

     if (nouns.length > 1) {
         let rand = Math.floor(Math.random()*nouns.length);
         let rand2 = (rand+1)%nouns.length;
         question = `${nouns[rand]} ${nouns[rand2]} `;
     } else {
         question = ` ${nouns[0]}`;
     }

     return question;
 }

 function formQuestion(qNouns, markovText) {
    console.log(qNouns)

     let split = RiTa.tokenize(markovText);
     let tags = RiTa.getPosTags(markovText);
     let nouns = [];
     let verbs = [];
     let adj = []
     let seed = articles[articleIndex%articles.length]



     tags.forEach((element, index) => {
         if (element.includes("nn")) {
             if (split[index].length > 4) {

                 nouns.push(split[index]);
             }
         }
         if (element.includes("vb")) {
             if (split[index].length > 4) {
                 verbs.push(split[index]);

             }
         }
         if (element.includes("jj") || element.includes("rb")) {
             if (split[index].length > 4) {
                 adj.push(split[index]);

             }
         }

     });


     let verb = verbs[0] ? verbs[0] : ' '
     let noun = nouns[0] ? nouns[0] : ' '
     let adverb = adj[0] ? adj[0] : '  '
     let word = bits[Math.floor(Math.random()*bits.length)];

     if(noun === ' ' && adverb === ' ') {
         noun = adverb ? adverb : 'huge'
     }


     articleIndex += 1;

     return "What if " + qNouns +  ` ${word}` + ` ${adverb} ${noun} ?`;


 }