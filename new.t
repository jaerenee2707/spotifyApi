<!-- <script>

  window.addEventListener("load", () => {
    function sendData(form) {
      const formData = Object.fromEntries(new FormData(form));

      fetch('https://api.spotify.com/v1/search?q=' + formData['songName'] + '&type=track', {
        headers: {
          'Authorization': 'Bearer BQABNBaYRhXunWHXd01gulKZeI2AfKbZWLh71l9aBut9JguaLO-3uswGIr9bfIs_gKEsc4lF_GWifUh7ZFb7Xgqvkh4XBOt5dpuyMzrVwHk7HeUhJtY'
        }
      }).then(result => {
        return result.json();
      })
        .then(json => {
          document.getElementById('results').innerHTML = JSON.stringify(json, null, 2);
          // Get the data from the tracks array
          var track = json.tracks.items[0];
          //return track;
          var image1Url = track.album.images[0].url;
          var image1 = document.createElement('img');
          image1.src = image1Url;
          image1.className = "imgShow";
          document.getElementById('input').innerHTML = '';
          document.getElementById('input').appendChild(image1);

          var artist1Name = track.artists[0].name;
          var artist1 = document.createElement('p');
          artist1.innerHTML = artist1Name;
          document.getElementById('input').appendChild(artist1);
          var song1ID = track.id;
          var song1ID_ = document.createElement('p');
          song1ID_.innerHTML = song1ID;
          document.getElementById('input').appendChild(song1ID_);

        });
    }

    const form = document.getElementById('analyze-form');

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      sendData(form);
    });
  });
</script> -->