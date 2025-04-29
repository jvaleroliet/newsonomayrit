document.addEventListener('DOMContentLoaded', function() {
    // Existing modal functionality
    function openModal(event) {
      event.preventDefault();
      document.getElementById('modal').classList.add('active');
    }
  
    function closeModal(event) {
      const modal = document.getElementById('modal');
      if (event.target === modal || event.target.tagName === 'BUTTON') {
        modal.classList.remove('active');
      }
    }
  
    // Add event listeners for modal
    const openModalLinks = document.querySelectorAll('.open-modal-link'); // Assuming you have links with this class
    openModalLinks.forEach(link => {
      link.addEventListener('click', openModal);
    });
  
    const closeModalButton = document.querySelector('#modal .close-button'); // Assuming your close button has this class
    if (closeModalButton) {
      closeModalButton.addEventListener('click', closeModal);
    }
  
    const modalElement = document.getElementById('modal');
    if (modalElement) {
      modalElement.addEventListener('click', closeModal);
    }
  
    // Infinite Marquee initialization
    new InfiniteMarquee({
      element: '.marquee-container',
      speed: 250000,
      smoothEdges: true,
      direction: 'left',
      gap: '100px',
      pauseOnHover: 'false',
      duplicateCount: 2,
      mobileSettings: {
        direction: 'top',
        speed: 25000
      },
      on: {
        beforeInit: () => {
          console.log('Not Yet Initialized');
        },
        afterInit: () => {
          console.log('Initialized');
        }
      }
    });
  
    // Minimal audio player functionality
    const audioElement = document.getElementById('minimal-player');
    const playPauseButton = document.getElementById('play-pause-button');
    let isPlaying = false;
  
    if (playPauseButton && audioElement) {
      playPauseButton.addEventListener('click', function() {
        if (isPlaying) {
          audioElement.pause();
          playPauseButton.textContent = 'Play';
        } else {
          audioElement.play();
          playPauseButton.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
      });
    }
  });

document.addEventListener('DOMContentLoaded', function() {
    const audioElement = document.getElementById('minimal-player');
    const playPauseButton = document.getElementById('play-pause-button');
    let isPlaying = false;
  
    playPauseButton.addEventListener('click', function() {
      if (isPlaying) {
        audioElement.pause();
        playPauseButton.textContent = '▶';
      } else {
        audioElement.play();
        playPauseButton.textContent = '❚❚';
      }
      isPlaying = !isPlaying;
    });
  });