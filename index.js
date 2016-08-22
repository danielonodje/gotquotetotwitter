var request = require('superagent');
var co = require('co');
var chalk = require('chalk');
// console.log("Hello, World!");

request
    .get("https://got-quotes.herokuapp.com/quotes")
    .end(function(err,res){
        // console.log(res.body);
        console.log(chalk.green(res.body.quote));
        console.log(chalk.red("   - "+res.body.character));
    });