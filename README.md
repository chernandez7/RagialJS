# RagialJS #
[![Build Status](https://travis-ci.org/chernandez7/RagialJS.svg?branch=master)](https://travis-ci.org/chernandez7/RagialJS)

Future NPM module that will parse data from http://ragi.al.

## Current Functionality ##
Following works for all 3 iRO servers (Renewal, Classic, Thor):
- Get url page of item from name and server
  `getItemURL("Minor Brisket", "Renewal")` should return `http://ragi.al/item/iRO-Renewal/jzA`

- Get item metrics from name and server
  `getItemJSON("Minor Brisket", "Renewal")` should return:

  ```
  {
    name : "Minor Brisket",
    img_src : "http://ragi.al/res/img/item/re/12431.png",
    item_src : "http://db.irowiki.org/db/item-info/12431/",
    short : {
      amount : "12",
      min : "33,000z",
      max : "40,900z",
      average : "35,000z",
      deviation : "±1,000z",
      confidence : "0.97"
    },
    long: {
      amount : "32",
      min : "33,000z",
      max : "48,000z",
      average : "43,000z",
      deviation : "±3,000z",
      confidence : "0.93"
    }
  }
  ```
  
  as shown [here](http://ragi.al/item/iRO-Renewal/jzA).

## TODO ##
- Fix `undefined` values outside of requests
- Get Vend History
- Get Buy History
- Get Seller / Map Locations

## Dependencies ##
- NodeJS
- ExpressJS
- Request
- Cheerio

## License ##
- MIT
