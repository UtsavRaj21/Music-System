let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let back = document.querySelector(".backImage");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Tera Zikr",
    artist: "Darshan Raval",
    image: "https://i.pinimg.com/564x/91/78/bc/9178bc57ae869f84f697e8c391220e51.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd4/1674/Tera%20Zikr%20-%20Reprise%20Ft.%20Darshan%20Raval(PagalWorldCom.Com).mp3"
  },
  {
    name: "Tera Chehra",
    artist: "Arijit Singh ",
    image: "https://i1.sndcdn.com/artworks-LoWjyNziWpCXChhR-H7kncg-t500x500.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd21/10358/Tera%20Chehra%20(Sanam%20Teri%20Kasam)(PagalWorldCom.Com).mp3"
  },
  {
    name: "Sanam Teri Kasam",
    artist: "Ankit Tiwari & Palak Muchhal ",
    image: "https://images-na.ssl-images-amazon.com/images/I/A1pBqWv-RKL._RI_.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd21/10357/Sanam%20Teri%20Kasam%20(Sanam%20Teri%20Kasam)(PagalWorldCom.Com).mp3",
  },
  {
    name: "Phir Mulaaqat",
    artist: "Jubin Nautiyal ",
    image: "https://i2.wp.com/bangla-lyrics.club/wp-content/uploads/2019/01/PHIR-MULAQAT-Full-LYRICS%E2%80%93Cheat-India-Jubin-Nautiyal.png?resize=310%2C285",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4046/Phir%20Mulaaqat(PagalWorldCom.Com).mp3",
  },
  {
    name: "Phir Le Aaya Dil",
    artist: "Arijit Singh",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Phir_Le_Aya_Dil_cover.jpg/220px-Phir_Le_Aya_Dil_cover.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4351/Phir%20Le%20Aaya%20Dil%20-%20Contemporary%20Remix(PagalWorldCom.Com).mp3"
  },

  {
    name: "Bandeya Rey Bandeya",
    artist: "Arijit Singh",
    image: "https://lyricsbuggi.com/wp-content/uploads/2019/12/maxresdefault2B2528102529.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4350/Bandeya%20Rey%20Bandeya(PagalWorldCom.Com).mp3"
  },
  {
    name: "Chhod Diya",
    artist: "Arijit Singh",
    image: "https://i.ytimg.com/vi/Giwd8Y3EF9s/maxresdefault.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4343/Chhod%20Diya(PagalWorldCom.Com).mp3"
  },
  {
    name: "Tera Yaar Hoon Main",
    artist: "Arijit Singh",
    image: "https://i1.sndcdn.com/artworks-000359813853-wq37oe-t500x500.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4322/Tera%20Yaar%20Hoon%20Main%20-%20Remix(PagalWorldCom.Com).mp3"
  },
  {
    name: "Pal",
    artist: "Arijit Singh",
    image: "https://lyricsing.com/wp-content/uploads/Pal-Female-Version-Song-Lyrics.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4342/Pal%20-%20Remix(PagalWorldCom.Com).mp3"
  },
  {
    name: "Dil Jugadu",
    artist: "Arijit Singh",
    image: "https://i.ytimg.com/vi/JZ2R97taa8o/mqdefault.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4324/Dil%20Jugadu(PagalWorldCom.Com).mp3"
  },
  {
    name: "Downtown",
    artist: "Guru Randhawa",
    image: "https://i.ytimg.com/vi/IOlYwy3aANo/maxresdefault.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4243/Downtown%20-%20Guru%20Randhawa(PagalWorldCom.Com).mp3"
  },
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  back.style.background = bgColor;
}


function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = ""

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  back.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  // back.style.backgroundImage.filter = "blur(3px)";
  
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

let PlayList_songs=document.querySelectorAll(".song-List");

for(let i of PlayList_songs) {
  i.addEventListener("click", function(e) {
      //filter = e.currentTarget.id;
      // console.log(this.id);
      loadTrack(this.id);
      playTrack();
  })
}


let open = document.querySelector(".open");
let MyPlayList = false;
open.addEventListener("click",function(e){

  if(!MyPlayList){
      let modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = `<div class="my-playList">
                      <div class="music-playList">Play List</div>
                      <div class="songs">
                          <div class="song-List1" id="8">Pal</div>
                          <div class="song-List1" id="9">Dil Jugadu</div>
                          <div class="song-List1" id="10">Downtown</div>
                          
                      </div>
                    </div>`;
        document.querySelector(".playList").appendChild(modal);
        console.log("hi");
        MyPlayList = true;
        let PlayList_songs=document.querySelectorAll(".song-List1");

      for(let i of PlayList_songs) {
        i.addEventListener("click", function(e) {
            loadTrack(this.id);
            playTrack();
        })
      }
      
  }else{
    let removeMyList = document.querySelector(".modal");
    removeMyList.remove();

    MyPlayList = false;
  }
  
})


