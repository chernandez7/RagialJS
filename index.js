var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var RagialJS     = express();

RagialJS.get('/scrape', function(req, res){

  console.log(getItemJSON("Minor Brisket", "Renewal"));

}) // End RagialJS.get

// Function to remove whitespace and escape code
function trimString(str) {
  return str.replace(/[\n\t\r]/g,"").trim();
}

// Returns url of item in Ragi.al
function getItemURL(itemName, server) {
  var prefix;

    switch (server) {
      case "Renewal":
        prefix = "http://ragi.al/search/iRO-Renewal/";
        break;
      case "Classic":
        prefix = "http://http://ragi.al/item/iRO-Classic/";
        break;
      case "Thor":
        prefix = "http://http://ragi.al/shop/iRO-Thor/";
        break;
    }

  // Account for percent encoding (%20)
  var suffix = itemName.split(' ').join('%20');
  var url = prefix.concat(suffix); // Merge prefix and suffix

  // Parse for href in results
  request(url, function(error, response, html) {
    if(!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

        // db class
        $('.itemdb').filter(function() {
          var data = $(this);

          // Ragi.al Item
          item_src = trimString(data.next().attr('href'));
          return item_src;
        })
      } else {
        console.log(error);
        }
  }) // End Request
}

// Returns buy, sell, and metrics of item as a JSON
function getItemJSON(itemName, server) {
  var url = getItemURL(itemName, server);
  request(url, function(error, response, html) {
    if(!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

        // Initialize JSON object
        var name, img_src, item_src, short, long, amount, min, max, average, deviation, confidence;

        json = {
          name : "",
          img_src : "",
          item_src : "",
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

        // db class
        $('.itemdb').filter(function() {
          var data = $(this);

          // Image url
          img_src = trimString(data.children().attr('src'));
          json.img_src = img_src;

          // Item iroWiki url
          item_src = trimString(data.attr('href'));
          json.item_src = item_src;
        })
    return json;
  } else {
    console.log(error);
    }
  }); // End request
}

// listening
RagialJS.listen('8081')

exports = module.exports = RagialJS;
