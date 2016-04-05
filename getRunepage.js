//The start of the urls for api calls.
var staticUrl = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2';
var naUrl = 'https://na.api.pvp.net/api/lol/na/v1.4';

function getRunes(runePage, key) {
  //clear any previous runepage
  $('#stats').html('');
  $('#totals').html('');
  //get static rune data
  $.get(staticUrl + '/rune?api_key=' + key, function(runes) {
    //Stores and adds numerical value of like rune stats
    var statAccum = {};
    //Stores used rune descriptions
    var descripions = {};
    for(var i = 0; i < runePage.slots.length; i++) {
      //gets the numerical value of the rune.
      var numStat = runes.data[runePage.slots[i].runeId].description.match(/(\d+\.?\d*)(.*)/)[1];
      //gets the type of stat
      var textStat = runes.data[runePage.slots[i].runeId].description.match(/(\d+\.?\d*)(.*)/)[2];
      var desc = runes.data[runePage.slots[i].runeId].description;
      
      if(textStat.indexOf('(') !== -1) {
        textStat = textStat.substr(0, textStat.indexOf('('));
      }
      //Combine stat values to give total stats gained at lvl1
      if(!(textStat in statAccum)) {
        statAccum[textStat] = parseFloat(numStat);
      }
      else
        statAccum[textStat] += parseFloat(numStat);
      //Only want to display one entry per unique rune
      if(!(desc in descripions)) {
        descripions[desc] = 1;
      }
      else
        descripions[desc]++;
    }
    //dump unique runes and their totals
    $.each(descripions, function(key, value) {
        $('#stats').append(value + 'x ' + key + '<br>');
      });
    //dump stat totals
    $('#totals').append('Stat totals at level 1 (level 18)<br>');
    $.each(statAccum, function(key, value) {
      //Modify per level stats to display total recieved at level 18
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
  var getIdUrl = naUrl + '/summoner/by-name/' + summoner + '?api_key=' + key;
  var getCurrentPageUrl;
  var sumId;
  console.log(summoner);
  $.get(getIdUrl, function(data) {
    //get summoner id for next api calls
    sumId = data[summoner].id;
    console.log(sumId);
    getCurrentPageUrl = naUrl + '/summoner/' + sumId + '/runes?api_key=' + key;
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