 var lines, markov;

 $(document).ready(function () {

     markov = new RiMarkov(4);

     RiTa.loadString('../txt/adlib.txt', function (data1) {
         markov.loadText(data1);
     });

     $('body').click(generate);
 });

 function generate() {

     if (!markov.ready()) return;

     lines = markov.generateSentences(2);
     console.log(lines);

    
 }