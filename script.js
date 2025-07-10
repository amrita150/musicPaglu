const songs = [
  {
    title: "Ek Din",
    image: "photos/ek-din.jpg",
    audio: "Music/ek-din.mp3"
  },
  {
    title: "Perfect",
    image: "photos/perfect.jpg",
    audio: "Music/perfect.mp3"
  },
  {
    title: "Aaja Piya",
    image: "photos/aaja-piya.jpg",
    audio: "Music/aaja.mp3"
  },
  {
    title: "Farebi",
    image: "photos/farebi.jpg",
    audio: "Music/Farebi.mp3"
  },
  {
    title: "Manchild",
    image: "photos/heather.jpg",
    audio: "Music/Manchild.mp3"
  },
  {
    title: "Way Down we go",
    image: "photos/way.jpg",
    audio: "Music/way.mp3"
  },
  {
    title: "Sulla",
    image: "photos/sulla.jpg",
    audio: "Music/sulla.mp3"
  },
  {
    title: "I love you 3000",
    image: "photos/love.jpg",
    audio: "Music/love.mp3"
  },
   {
    title: "Superstar",
    image: "photos/superstar.jpg",
    audio: "Music/superstar.mp3"
  },
  {
    title: "Jugraafiya",
    image: "photos/jugrafiya.jpg",
    audio: "Music/Jugraafiya.mp3"
  }
];

const songGrid = document.querySelector('.songs-grid');
const audioPlayer = document.getElementById('audioPlayer')
const playpause = document.getElementById('playPauseBtn')
const shuffbtn = document.getElementById('shufflebtn');

let isPlaying = false;

//play buitton
playpause.addEventListener('click', ()=>{
    if(audioPlayer.src==='') return;

    if(isPlaying){
        audioPlayer.pause();
        isPlaying = false;
        playpause.src = 'photos/play.png';
    } else{
        audioPlayer.play();
        isPlaying = true;
        playpause.src = 'photos/pause.png';
    }
})

//run a loop on each songh
function renderSong(songsToRender){
  songGrid.innerHTML = ""; 
  for(let song of songsToRender){
    const article = document.createElement('article');
    article.classList.add('song');

    const img = document.createElement('img');
    img.src = song.image;
    img.alt = song.title;

    const h2 = document.createElement('h2');
    h2.innerText = song.title;

    //custom audio data
    // article.dataset.audio = song.audio;
    
    article.appendChild(img);
    article.appendChild(h2);
    
    songGrid.appendChild(article);

    article.addEventListener('click', ()=>{
        audioPlayer.src = song.audio;
        audioPlayer.play();
        isPlaying = true;
        playpause.src = 'photos/pause.png';

        //for footer
        document.getElementById('footer-title').innerText = song.title;
        document.getElementById('footer-img').src = song.image;
    })
}

}

//for progress bar
audioPlayer.addEventListener('timeupdate', () => {
  const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${percent}%`;
});


//for shuffle button
let currentSongIndex = 0;
shuffbtn.addEventListener('click', ()=>{
   let randSong = Math.floor(Math.random()*songs.length);
     while (randSong === currentSongIndex) {
    randSong = Math.floor(Math.random() * songs.length);
  }
  currentSongIndex = randSong;

  const selectedSong = songs[randSong];
  audioPlayer.src = selectedSong.audio;
  audioPlayer.play();
  playpause.src = 'photos/pause.png';
  isPlaying = true;
    document.getElementById('footer-title').innerText = selectedSong.title;
        document.getElementById('footer-img').src = selectedSong.image;

})

//for search input
const searchInput = document.getElementById('srch');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm)
  );
  renderSong(filteredSongs);
});

const likeBtn = document.getElementById('likeBtn');

likeBtn.addEventListener('click', () => {
  if (likeBtn.src.includes('like.png')) {
    likeBtn.src = 'photos/liked.png';
  } else {
    likeBtn.src = 'photos/like.png';
  }
});

renderSong(songs);