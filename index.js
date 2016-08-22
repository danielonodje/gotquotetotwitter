var request = require('superagent');
var keys = require("./keys.js");
var co = require('co');
var chalk = require('chalk');
var prompt = require('co-prompt');
var program = require('commander');
var readline = require('readline');
var Twit = require('twit');

var twittybird = new Twit({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token: keys.access_token,
    access_token_secret: keys.access_token_secret,
    timeout_ms: 60*1000
});

twittybird.get('users/suggestions/:slug', { slug: 'funny' }, function (err, data, response) {
            console.log(err);
        });

 request
    .get("https://got-quotes.herokuapp.com/quotes")
    .end(function(err,res){
        // console.log(res.body);
        let quote = res.body.quote;
        let character = res.body.character
        let status = quote.slice(0,character.length + 3);

        let tweet = quote + " - " + character;
        console.log(tweet);

        // console.log(chalk.green(quote));
        // console.log(chalk.red("   - "+character));

        var rlobject = readline.createInterface({
            input : process.stdin,
            output : process.stdout
        });

        rlobject.question("would you like to tweet this? y/n : ",function(answer){
            if(answer == "yes" || answer == "Yes" || answer == "y" || answer == "Y"){
                twittybird.post('statuses/update', { status: tweet }, function(err, data, response) {
                    console.log("Tweet sent. Tis a pleasure to serve thee, milord");
                    // console.log(data)
                })
                
                rlobject.close();
            }
            else if(answer == "no" || answer == "No" || answer == "n" || answer == "N"){
                console.log("Quote was not tweeted. You should be braver little Stark");
                rlobject.close();
            }
            else{
                console.log("You should have spoke true foul knave. I leave you, task unfinished.");
                rlobject.close();
            }


        });
       
});