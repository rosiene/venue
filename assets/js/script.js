window.onload = function(){
  var apiURL = 'https://api.foursquare.com/v2/venues/explore',
    clientId = 'X31GAYVM4VL332HLRL1CNJ2IPWJAJBAG30MBVICGSP1RTWTA',
    clientSecret = 'MLZO412JRTNJAQMJ5YIYF5OYSKW41UHWZWTWLQ1MKPGXGJ2T',
    latitude = 0,
    longitude = 0;

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  }else{
    $('#errorMessage').text('Geolocation is not supported by this browser.');
  }

  function showPosition(position){
    console.log("Latitude: " + position.coords.latitude +  ", Longitude: " + position.coords.longitude);
    latitude = position.coords.latitude;
    Longitude = position.coords.longitude
  }

}
