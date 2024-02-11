var client_id = '77a97a2116464c3885a0ab611d92f68e';
var client_secret = '42eadb4da429409080a8e63391dbe6fa';

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};
var token = '';
fetch(authOptions.url, {
  method: 'POST',
  headers: authOptions.headers, 
  body: new URLSearchParams(authOptions.form)
})
.then(response => response.json()) 
.then(body => {
  token = body.access_token;
  console.log(token); // print the token to the console

})
.catch(error => console.error(error));


async function getSongData(songName) {
  try {
    const response = await fetch('https://api.spotify.com/v1/search?q=' + songName + '&type=track', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    const json = await response.json();
    // Get the first track from the tracks array
    const track = json.tracks.items[0];
    // Return the track object
    return track;
  } catch (error) {
    // Log the error
    console.error(error);
  }
}
async function songData() {
  const songName = document.getElementById('songName').value;
  const songData = await getSongData(songName);
  if (songData) {
    const imageUrl = songData.album.images[0].url;
    const artistName = songData.artists[0].name;
    const song1ID = songData.id;
    const songName = songData.name;
    const link = songData.external_urls.spotify;

    const image = document.createElement('img');
    image.src = imageUrl;
    image.className = "imgShow";
    image.addEventListener(
      'click', () => {
         window.open(link, "_blank");
    })
    
    const artist = document.createElement('p');
    artist.innerHTML = artistName;
    artist.className = "Artist";
    
    const song = document.createElement('p');
    song.innerHTML = songName;
    song.className = "Title";
    song.addEventListener(
      'click', () => {
         window.open(link, "_blank");
    })

    const playImg = document.createElement('img');
    playImg.src = "play.png";
    playImg.className = "play";

    document.getElementById('input').innerHTML = '';
    document.getElementById('input').appendChild(image);
    document.getElementById('input').appendChild(song);
    document.getElementById('input').appendChild(artist);
    document.getElementById('input').appendChild(playImg);
    
    getRecommendedSong(song1ID);
  }
  else {
    document.getElementById('input').innerHTML = '';
    const song1ID_ = document.createElement('p');
    song1ID_.innerHTML = "Song not found D:";
    document.getElementById('input').appendChild(song1ID_);
  }
}

async function getRecommendedSong(song1ID) {
  const response2 = await fetch('https://api.spotify.com/v1/recommendations?limit=1&seed_tracks=0KKkJNfGyhkQ5aFogxQAPU', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  // Parse the response as JSON
  const json2 = await response2.json();
  const song2Data = json2.tracks[0];

  const artistName = song2Data.artists[0].name;
  const songName = song2Data.name;
  const imageUrl = song2Data.album.images[0].url;
  const link = song2Data.external_urls.spotify;
  
  const image = document.createElement('img');
  image.src = imageUrl;
  image.className = "imgShow";
  image.addEventListener(
    'click', () => {
       window.open(link, "_blank");
  })
  
  const artist = document.createElement('p');
  artist.innerHTML = artistName;
  artist.className = "Artist";
  
  const song = document.createElement('p');
  song.innerHTML = songName;
  song.className = "Title";
  song.addEventListener(
    'click', () => {
       window.open(link, "_blank");
  })
  
  const playImg = document.createElement('img');
  playImg.src = "play.png";
  playImg.className = "play";

  document.getElementById('output').innerHTML = '';
  document.getElementById('output').appendChild(image);
  document.getElementById('output').appendChild(song);
  document.getElementById('output').appendChild(artist);
  document.getElementById('output').appendChild(playImg);
}

window.addEventListener("load", () => {
  const form = document.getElementById('analyze-form');

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    songData(form);
  });
});