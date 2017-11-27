window.onload = function(){
  var apiURL = 'https://api.foursquare.com/v2/venues/explore',
    clientId = 'X31GAYVM4VL332HLRL1CNJ2IPWJAJBAG30MBVICGSP1RTWTA',
    clientSecret = 'MLZO412JRTNJAQMJ5YIYF5OYSKW41UHWZWTWLQ1MKPGXGJ2T';

  new Vue({
    el: '#app',
    data: {
      title: 'Venue',
      loading: false,
      location: null,
      venues: null,
      width: null
    },
    created: function () {
      this.width = window.innerWidth
      if(navigator.geolocation){
        this.loading = true;
        navigator.geolocation.watchPosition(this.geoSuccess, this.geoError);
      }else{
        $('#errorMessage').text('Geolocation is not supported by this browser.');
        $('#errorMessage').css('display', 'inline');
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
          if (data.meta.code === 200){
            self.location = data.response.headerFullLocation;
            self.venues = data.response.groups[0].items;
            self.loading = false;
          }else{
            $('#errorMessage').text('Oops! Something went wrong. Please try again later.');
            $('#errorMessage').css('display', 'inline');
            self.loading = false;
          }
        }).fail(function(er){
          $('#errorMessage').text('Oops! Something went wrong. Please try again later.');
          $('#errorMessage').css('display', 'inline');
          self.loading = false;
        });
      },
      buildApiUrl: function(latitude, longitude){
        var url = apiURL + '?ll=' + latitude + ',' + longitude;
        url += '&client_id=' + clientId;
        url += '&client_secret=' + clientSecret;
        url += '&v=20171101';
        url += '&venuePhotos=1';
        return url;
      },
      geoSuccess: function(position){
        console.log('aqui');
        this.fetchData(this.buildApiUrl(position.coords.latitude, position.coords.longitude));
      },
      geoError: function(error){
        $('#errorMessage').text('Oops! We don\'t have access to your current location! =/');
        $('#errorMessage').css('display', 'inline');
        this.loading = false;
      }
    }
  });
}
