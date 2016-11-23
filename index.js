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

            // Metric Table
            var avgtable = data.children().first().next(); // <div id=avgtable>

            // Short Time Span
            var short = avgtable.children().children().last().prev().children(); // <tr>

            var shortamount = short.eq(1).text();
            json.short.amount = shortamount;

            var shortmin = short.eq(2).text();
            json.short.min = shortmin;

            var shortmax = short.eq(3).text();
            json.short.max = shortmax;

            var shortavg = short.eq(4).text();
            json.short.average = shortavg;

            var shortdev = short.eq(5).text();
            json.short.deviation = shortdev;

            var shortconfidence = short.eq(6).text();
            json.short.confidence = shortconfidence;

            // Long Time Span
            var long = avgtable.children().children().last().children(); // <tr>

            var longamount = long.eq(1).text();
            json.long.amount = longamount;

            var longmin = long.eq(2).text();
            json.long.min = longmin;

            var longmax = long.eq(3).text();
            json.long.max = longmax;

            var longavg = long.eq(4).text();
            json.long.average = longavg;

            var longdev = long.eq(5).text();
            json.long.deviation = longdev;

            var longconfidence = long.eq(6).text();
            json.long.confidence = longconfidence;

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
