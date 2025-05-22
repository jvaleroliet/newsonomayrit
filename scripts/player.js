document.addEventListener('DOMContentLoaded', function() {
    const songUrlElement = document.querySelector('[data-song-url]');
    const songUrl = songUrlElement ? songUrlElement.getAttribute('data-song-url') : null;

    if (songUrl) {
        console.log("Song URL found:", songUrl);

        Amplitude.init({
            "songs": [
                {
                    "url": songUrl
                }
            ],
            "volume_increment": 10,
            "volume_decrement": 10,
            "callbacks": {
                initialized: function() {
                    console.log("Amplitude initialized successfully.");
                },
                play: function() {
                    const playPauseButton = document.querySelector('.amplitude-play-pause');
                    playPauseButton.classList.add('amplitude-playing');
                    playPauseButton.classList.remove('amplitude-paused');
                },
                pause: function() {
                    const playPauseButton = document.querySelector('.amplitude-play-pause');
                    playPauseButton.classList.add('amplitude-paused');
                    playPauseButton.classList.remove('amplitude-playing');
                }
            }
        });

        function updatevol() {
            const vol = Amplitude.getConfig().volume;
            console.log("Current volume:", vol);

            const volumeControls = document.querySelectorAll("div.volumectl");
            volumeControls.forEach(function(control) {
                const icon = control.querySelector(".volumeicon");
                if (vol >= 50) {
                    icon.classList.add("fa-volume-up");
                    icon.classList.remove("fa-volume-down");
                    icon.classList.remove("fa-volume-off");
                } else if (vol < 50 && vol > 0) {
                    icon.classList.remove("fa-volume-up");
                    icon.classList.add("fa-volume-down");
                    icon.classList.remove("fa-volume-off");
                } else if (vol === 0) {
                    icon.classList.remove("fa-volume-up");
                    icon.classList.remove("fa-volume-down");
                    icon.classList.add("fa-volume-off");
                }
                const indicator = control.querySelector(".indicator");
                if (indicator) indicator.innerHTML = vol / 10 + "/10";
            });
        }

        updatevol();

        document.addEventListener('amplitudejs_volume_changed', updatevol);
    } else {
        console.error("No song URL found. Please ensure the element with [data-song-url] exists.");
    }
});