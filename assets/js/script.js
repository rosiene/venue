window.onload = function(){
  var apiURL = 'https://api.foursquare.com/v2/venues/explore',
    clientId = 'X31GAYVM4VL332HLRL1CNJ2IPWJAJBAG30MBVICGSP1RTWTA',
    clientSecret = 'MLZO412JRTNJAQMJ5YIYF5OYSKW41UHWZWTWLQ1MKPGXGJ2T';

  new Vue({
    el: '#app',
    data: {
      title: 'Venue',
      latitude: null,
      longitude: null,
      venues: null
    },
    created: function () {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.geoSuccess);
      }else{
        $('#errorMessage').text('Geolocation is not supported by this browser.');
      }
    },
    methods: {
      fetchData: function(url){
        var self = this
        $.ajax({
          url: url,
          context: document.body,
          method: "GET"
        }).done(function(data) {
          console.log(data);
        }).fail(function(er){
          $('#errorMessage').text('Oops! Something went wrong. Please try again later.');
        });
      },
      buildApiUrl: function(latitude, longitude){
        var url = apiURL + '?ll=' + latitude + ',' + longitude;
        url += '&client_id=' + clientId;
        url += '&client_secret=' + clientSecret;
        url += '&v=20171101';
        return url;
      },
      geoSuccess: function(position){
        this.fetchData(this.buildApiUrl(position.coords.latitude, position.coords.longitude));
        console.log("Latitude: " + position.coords.latitude +  ", Longitude: " + position.coords.longitude);
      }
    }
  });
}
