function submitFunction() {

    var formName = document.getElementsByName('charName')[0].value;
    var formRealm = document.getElementsByName('charRealm')[0].value;
    var formRegion = document.getElementsByName('charRegion')[0].value;

    // Check realm for spaces
    if (formRealm.match(/\s/g)) {
        formRealm.replace(/\s/g, "%20");
    }

    var language = 'en_GB';

    // Check if region is GB or US
    if (formRegion == 'us') {
        language = 'en_US';
    }

    //
    // Rest of program happens after submit
    //

    // Declare variables
    var charName = formName;
    var charRealm = formRealm;
    var charRegion = formRegion;
    // Provide your API key here
    var apiKey = '';
    var urlPart1 = 'https://' + formRegion + '.api.battle.net/wow/character/';
    var urlPart2 = '/';
    var urlPart3 = '?locale=' + language + '&apikey='

    // URL made up of smaller components due to different realm and language options
    var warcraftUrl = urlPart1 + charRealm + urlPart2 + charName + urlPart3 + apiKey;

    console.log(warcraftUrl);

    // Cross Orign Resource Sharing
    function getCORS(url, success) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = success;
        xhr.send();
        return xhr;
    }


    // Access Battle.net api
    getCORS(warcraftUrl, function(request){

        var response = request.currentTarget.response || request.target.responseText;

        // Parse the response as JSON
        awesomeJson = JSON.parse(response);

        //
        // Append data to HTML
        //

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
            var imgSrc = 'https://render-api-'+ charRegion + '.worldofwarcraft.com/static-render/' + charRegion + '/';
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

}
