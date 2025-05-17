function getSongId() {
  const metaBranch = document.querySelector('meta[name="branch:deeplink:song_id"]');
  if (metaBranch && metaBranch.content) {
    return metaBranch.content;
  }

  const metaTwitterIphone = document.querySelector('meta[property="twitter:app:url:iphone"]');
  if (metaTwitterIphone && metaTwitterIphone.content) {
    const match = metaTwitterIphone.content.match(/genius:\/\/songs\/(\d+)/);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  const metaTwitterGooglePlay = document.querySelector('meta[property="twitter:app:url:googleplay"]');
  if (metaTwitterGooglePlay && metaTwitterGooglePlay.content) {
      const match = metaTwitterGooglePlay.content.match(/genius:\/\/songs\/(\d+)/);
      if (match && match[1]) {
          return match[1];
      }
  }

  if (window.gon && window.gon.song_id) {
    return window.gon.song_id.toString();
  }
  
  const songIdElement = document.querySelector('[data-song-id]');
  if (songIdElement && songIdElement.dataset.songId) {
      return songIdElement.dataset.songId;
  }

  return null;
}

const songId = getSongId();

if (songId) {
  console.log('Genius Song ID found:', songId);
  chrome.runtime.sendMessage({ action: "redirectDunce", songId: songId });
} else {
  console.log('Genius Song ID not found on this page.');
} 