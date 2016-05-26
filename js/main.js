"use strict";

window.app = {
	author : "juandavid.grisales@gmail.com"
};

app.config = {
	urlCharacters : "http://gateway.marvel.com:80/v1/public/characters",
	idKey : "?apikey=f2dc0b5c724033c1798ec3e789563491",
	boxCharacters: "#characters",
	ts : new Date().getTime(),
	hash: function (){
		return md5(this.ts + "2d0117b8468e742c1a5962058b11b134b5a162e3f2dc0b5c724033c1798ec3e789563491");
	},
	complete: function () {
		return  this.urlCharacters + this.idKey + "&ts=" + this.ts + "&hash=" + this.hash();
	},
	completeCall: function (value) {
		return this.complete() + "&nameStartsWith=" + value;
	}
};

console.log(app.config.completeCall("batman"));

var heroURL;

function findHero () {
	var nameHero = document.getElementById("name-hero").value;
	console.log(nameHero);
	
	$.ajax({
        url: app.config.completeCall(nameHero)
    }).then(function(data) {
    	var firtsResult = data.data.results[0];
    	console.log(firtsResult);
    	$('.result-name').append(firtsResult.name);
	    $('.result-content').append(firtsResult.description);
	    $('.result-image').empty().append('<img src="'+firtsResult.thumbnail.path+'" height="64px" width="64px">');
    });

    //Getting a hero

    //console.log(heroURL);

    /*if (heroURL != null) {
    	$.ajax({
	        url: heroURL
	    }).then(function(data) {
	    	//var firtsResult = data.data.results[0];
	    	console.log(data);
	       	/*$('.result-name').append(firtsResult.name);
	       	$('.result-content').append(firtsResult.description);
	       	$('.result-image').empty().append('<img src="'+firtsResult.+'" height="64px" width="64px">');
	    });
    }*/
    
}