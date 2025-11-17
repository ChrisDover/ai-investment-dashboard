/**
 * Utility functions for handling dates and timestamps in the dashboard
 */

/**
 * Get a Date object for a time relative to now
 * @param {string} timeAgo - Examples: "3h", "2d", "1w", "5m"
 * @returns {Date}
 */
export const getRelativeDate = (timeAgo) => {
  const now = new Date();
  const value = parseInt(timeAgo);
  const unit = timeAgo.slice(-1);

  switch(unit) {
    case 'm': // minutes
      return new Date(now - value * 60 * 1000);
    case 'h': // hours
      return new Date(now - value * 60 * 60 * 1000);
    case 'd': // days
      return new Date(now - value * 24 * 60 * 60 * 1000);
    case 'w': // weeks
      return new Date(now - value * 7 * 24 * 60 * 60 * 1000);
    default:
      return now;
  }
};

/**
 * Format a timestamp as "X hours/days ago"
 * @param {Date} date
 * @returns {string}
 */
export const formatTimeAgo = (date) => {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / (60 * 1000));
  const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString();
};

/**
 * Get timestamp string for example data (shows as Nov 17, 2025 time)
 */
export const getExampleTimestamp = (hoursAgo = 3) => {
  const date = getRelativeDate(`${hoursAgo}h`);
  return formatTimeAgo(date);
};

/**
 * Today's date formatted
 */
export const getTodayFormatted = () => {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Current market hours status
 */
export const isMarketOpen = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const time = hour * 100 + minutes;

  // Market is closed on weekends
  if (day === 0 || day === 6) return false;

  // Market hours: 9:30 AM - 4:00 PM ET (simplified - not accounting for holidays)
  return time >= 930 && time < 1600;
};
