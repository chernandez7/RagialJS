var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  url = 'http://ragi.al/item/iRO-Renewal/hzE'; // Test URL

  request(url, function(error, response, html) {
    if(!error) {
        var $ = cheerio.load(html);

        // Initialize JSON object
        var name, img_src, short, long, amount, min, max, average, deviation, confidence;
        var json = {
          name : "",
          img_src : "",
          short : {
            amount : "",
            min : "",
            max : "",
            average : "",
            deviation : "",
            confidence : ""
          },
          long: {
            amount : "",
            min : "",
            max : "",
            average : "",
            deviation : "",
            confidence : ""
          }
        };

        // Item Name
        $('.mkt_left').filter(function() {
            var data = $(this);
            name = trimString(data.children().first().text());
            console.log("title: " + name);
            json.name = name;

            // Short (7 Days) Metrics
            var avgtable = data.children().first().next();
            var short = avgtable.children().children().last().prev().children().text();
            var long = avgtable.children().children().last().children().text();
            console.log(short);
            console.log(long);
        })

        // Image url
        $('.itemdb').filter(function() {
          var data = $(this);
          img_src = trimString(data.children().first().attr('src'));
          console.log("img_src: " + img_src);
          json.img_src = img_src;
        })

    }

  }); // End request
}) // End app.get

// Function to remove whitespace and escape code
function trimString(str) {
  return str.replace(/[\n\t\r]/g,"").trim();
}

// listening
app.listen('8081')

exports = module.exports = app;
