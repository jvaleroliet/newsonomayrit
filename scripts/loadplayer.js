Amplitude.init({
    songs: [
      {
        url: '{{ "/audio/test.mp3" | relative_url }}',
        title: '{{ include.title }}',
        artist: '{{ include.desc }}' // Assuming 'desc' is the artist
        // You can add more metadata here like cover art, album, etc.
      }
    ]
  });