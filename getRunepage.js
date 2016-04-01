/*
 *todo:
 *Make a data structure that groups like rune stats.
 *Example want to add AD marks + AD quints numerical value before displaying.
 *So it should have ad,ap,mr,armor... per level should be separate.
 */
function getRunes(runePage, key) {
  //clear stats of any previous runepage
  $('#stats').html('');
  //get static rune data
  $.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/rune?api_key=' + key, function(runes) {
    //Adds numerical value of like rune stats
    var statAccum = {};
    for(var i = 0; i < runePage.slots.length; i++) {
      //gets the numerical value of the rune.
      var stat = runes.data[runePage.slots[i].runeId].description.match(/\d+\.?\d*/)[0];
      //if new rune, insert into object with stat.
      //if rune already in object, add stat to current value.
      if(!(runePage.slots[i].runeId in statAccum)) {
        statAccum[runePage.slots[i].runeId] = parseFloat(stat);
      }
      else
        statAccum[runePage.slots[i].runeId] += parseFloat(stat);
      console.log(runes.data[runePage.slots[i].runeId].description);
      $('#stats').append(runes.data[runePage.slots[i].runeId].description + '<br>');
    }
    //dump stat contents
    console.log(statAccum);
  });
}

function getPage() {
  var summoner = $('#summonerName').val();
  var key = $('#key').val();
  //Can't use as object when spaces are included.
  summoner = summoner.replace(/ /g , '');
  var getIdUrl = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summoner + '?api_key=' + key;
  var getCurrentPageUrl;
  var sumId;
  console.log(summoner);
  $.get(getIdUrl, function(data) {
    //get summoner id for next api calls
    sumId = data[summoner].id;
    console.log(sumId);
    getCurrentPageUrl = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/' + sumId + '/runes?api_key=' + key;
    $.get(getCurrentPageUrl, function(data) {
      //gets all rune pages for the summoner
      var runePages = data[sumId].pages;
      for(var i = 0; i < runePages.length; i++) {
        //get current/last used runepage
        if(runePages[i].current === true) {
          $('#name').html(runePages[i].name);
          getRunes(runePages[i], key);
        }
      }
    });
    
  });
}