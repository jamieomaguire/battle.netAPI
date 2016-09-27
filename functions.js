// Cross Orign Resource Sharing
function getCORS(url, success) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = success;
    xhr.send();
    return xhr;
}

// Access Battle.net api
// Use your API key at the end of the url
getCORS('https://eu.api.battle.net/wow/character/dentarg/vyrak?locale=en_GB&apikey=', function(request){

    var response = request.currentTarget.response || request.target.responseText;

    // Parse the response as JSON
    awesomeJson = JSON.parse(response);

    // Grab the html and set as variables to put data in
    var name = document.getElementById('name');
    var charPic = document.getElementById('charPic');
    var realm = document.getElementById('realm');
    var level = document.getElementById('level');

    // Functions to assign data values to html
    function setName() {
        var charName = awesomeJson["name"];
        name.innerHTML = charName;
    }

    function setCharPicSrc(){
        var imgSrc = 'https://render-api-eu.worldofwarcraft.com/static-render/eu/';
        imgSrc += awesomeJson["thumbnail"];
        var expression = /avatar/;
        imgSrc = imgSrc.replace(expression, 'profilemain');
        charPic.setAttribute('src', imgSrc);
    }

    function setRealmData() {
        var realmData = awesomeJson["realm"];
        realm.innerHTML = realmData;
    }

    function setLevelData() {
        var levelData = awesomeJson["level"];
        level.innerHTML = levelData;
    }

    // Call the data assigning functions
    setName();
    setCharPicSrc();
    setRealmData();
    setLevelData();

});
