self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// Handle message from the web app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SET_REMINDER') {
    scheduleNotification(event.data.time);
  }
});

function scheduleNotification(timeString) {
  // Parse hours and minutes
  const [hours, minutes] = timeString.split(':').map(Number);
  const now = new Date();
  let scheduledTime = new Date();
  
  scheduledTime.setHours(hours, minutes, 0, 0);
  if (scheduledTime <= now) {
    // If time already passed today, schedule for tomorrow
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const delay = scheduledTime.getTime() - now.getTime();

  // Schedule notification trigger
  setTimeout(() => {
    self.registration.showNotification('30-Day Plank Challenge', {
      body: "It's time for today's plank session! 🔥",
      icon: 'icon.png',
      badge: 'icon.png',
      tag: 'daily-plank-reminder'
    });
  }, delay);
}
