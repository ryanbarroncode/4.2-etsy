var handlebars = require("handlebars");
var $ = require('jquery');
var underscore = require('underscore');

var source=$('.tile-template').html();
var template = handlebars.compile(source);
$('.template-container').append(template());

var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";


fetchJSONP(url, function(data) {
  // do something with data
  data.results.forEach(function(item){
    var itemInfo = {
      hbimage: item.Images[0].url_170x135,
      title: item.title,
      price: item.price,
      shopName: item.Shop.shop_name
    };
    console.log(item.title);
    $('.template-container').append(template(itemInfo));

  });
  console.log(data.results);
});




















/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

  Examples
      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // do something with data
      });

      // OR

      function logData(data) {
        console.log(data);
      }

      fetchJSONP(url, logData);
*/
function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
