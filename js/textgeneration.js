 var lines, markov;
 var articles, articleIndex;

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

     RiTa.loadString('txt/adlib.txt', function (data1) {
         markov.loadText(data1);
     });

     $('body').dblclick(generate);
     var myShakeEvent2 = new Shake({
         threshold: 10, // optional shake strength threshold
         timeout: 1000 // optional, determines the frequency of event generation
     });
     myShakeEvent2.start();

     window.addEventListener('shake', generate, false);
 });

 function generate() {

     if (!markov.ready()) return;

     lines = markov.generateSentences(2);
     console.log(lines);
     $('#question').text(lines[0]);


 }