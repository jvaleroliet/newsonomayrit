

/*
  Les éléments qui possèdent la class “media” doivent contenir un élément audio ou vidéo.
  Leur arrivée dans la zone visible du navigateur déclenche la fonction “fade(in)”.
  Leur sortie de la zone visible du navigateur déclenche la fonction “fade(out)”.
*/

// observe viewport intersection
const medias = document.querySelectorAll('.media');


function handleIntersection(entries) {
  entries.map((entry) => {
    const media = entry.target;
    const mediaplayer = media.querySelector("audio, video");
    
    if (entry.isIntersecting) {     
      media.classList.add("playing");
      fadeAudio(mediaplayer, 'in');
    } else {
      media.classList.remove("playing");
      fadeAudio(mediaplayer, 'out');
    }
  });
}

const observer = new IntersectionObserver(handleIntersection);

medias.forEach(media => {
  observer.observe(media);
  const mediaplayer = media.querySelector("audio, video");
  mediaplayer.volume = 0;  
});


// mute button (version alternative)
let muted = false;

// fade in/out functoion
function fadeAudio(mediaplayer, direction) {

  if(muted) return false;

  // fade steps and interval
  // = each 100ms, increase / decrease volume by 0.02
  // = 1 / 0,02 * 100 = 4 seconds from silence to full volume
  const step = 0.02, interval = 100;

  clearInterval(mediaplayer.fadeInterval);
  
  mediaplayer.fadeInterval = setInterval(() => {
    // fade in
    if (direction === 'in' && mediaplayer.volume < 1 - step) {      
      mediaplayer.volume += step; 
      // play
      mediaplayer.play();
    // fade out
    } else if (direction === 'out' && mediaplayer.volume > step) {
      mediaplayer.volume -= step; 
    } else {
      clearInterval(mediaplayer.fadeInterval);
      // pause
      if (direction === 'out') {
        mediaplayer.pause();
      } 
    }
  }, interval);
}


// mute button (version alternative)

const mute = document.querySelector("#mute");
if(mute){
  mute.onclick = () => {    
    if(muted === true){
      mute.classList.remove("muted");
    } else {
      mute.classList.add("muted");
      medias.forEach(media => {
        const mediaplayer = media.querySelector("audio, video");
        fadeAudio(mediaplayer, "out") 
      });
    }
    muted = !muted;
  }
}