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
      var numStat = runes.data[runePage.slots[i].runeId].description.match(/(\d+\.?\d*)(.*)/)[1];
      //gets the type of stat
      var textStat = runes.data[runePage.slots[i].runeId].description.match(/(\d+\.?\d*)(.*)/)[2];
      //Combine stat values to give total stats gained at lvl1
      if(!(textStat in statAccum)) {
        statAccum[textStat] = parseFloat(numStat);
      }
      else
        statAccum[textStat] += parseFloat(numStat);
      $('#stats').append(runes.data[runePage.slots[i].runeId].description + '<br>');
    }
    //dump stat contents
    $('#totals').append('Stat totals at level 1 (level 18)<br>');
    $.each(statAccum, function(key, value) {
      console.log(key.indexOf('per level'));
      if(key.indexOf('per level') !== -1)
        value += ' (' + (18 * value) + ')';
      $('#totals').append(key + ': ' + value + '<br>');
    });
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