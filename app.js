var express = require("express");
var sys = require("sys");
// need to include middleware separately w/ express these days.
var middi = require("body-parser")

var app = express();


app.listen(8080)
app.use(middi())

sys.puts("Server listen on port:8080")

//tell to render layout with ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

var tweets = []

app.get('/', function(request, response){

        var title = 'Express - Web Application framework for node | EJS - Embedded JavaScript renderer for node',
            header = 'Welcome to Express';

            response.render('layout', {
                  locals: {
                      'title': title,
                      'header': header,
                      'tweets': tweets,
                      'stylesheet': ['/style.css']
                  }
            })
})

app.get('/tweets', function(request, response){

       response.send( tweets )
})

app.post('/send', function(request, response){

        if(request.body && request.body.tweet) {

          tweets.push(request.body.tweet)

           if(acceptsHTML(request.headers['accept']) ) {

             response.redirect("/", 303)

           } else {

             response.send({"status":"Ok","message": "Tweet received"})
           }

        } else {

          response.send({"status":"nok","message": "No Tweet received"})
        }

})


function acceptsHTML( header ) {

    var accepts = header.split(',')

    for(var i=0,j=accepts.length; i<j; i++) {

        if(accepts[i] == 'text/html') return true;
    }

  return false;
}
