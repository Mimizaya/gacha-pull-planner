export function parseDate(dateString, timeString) {
  const formatDateString = dateString.replaceAll('.', '');  // Remove any dots
  const formatTimeString = timeString.replaceAll(':', '');  // Remove any dots
  
  // Extract the day, month, and year from the string
  const day = formatDateString.substring(0, 2);
  const month = formatDateString.substring(2, 4);
  const year = formatDateString.substring(4, 8);

  // Extract the hours and minutes from the string
  const hours = formatTimeString.substring(0, 2);
  const minutes = formatTimeString.substring(2, 4);
  
  // Create a properly formatted date string in 'YYYY-MM-DD' format
  const formattedDateString = `${year}-${month}-${day}`;
  
  const date = new Date(formattedDateString);
  
  // Set the time
  date.setHours(hours, minutes, 0, 0);  // Set hours, minutes, seconds, and milliseconds to 0

  return date;
}

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];


// Function to calculate remaining time
export function getRemainingTime(startDate, endDate) {
  const now = new Date(); // Current date and time
  
  // If the current date is before the start date, calculate time until start date
  if (now < startDate) {
    const timeDiff = startDate - now; // Difference in milliseconds
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Calculate remaining days
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Remaining hours
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Remaining minutes
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000); // Remaining seconds

    if (days > 0) {
      return `Starts in ${days}d ${hours}h`;
    } else if (hours > 0) {
      return `Starts in ${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `Starts in ${minutes} minutes`;
    } else {
      return `Starts in ${seconds} seconds`;
    }
  }
  
  // If the current date is after the start date but before the end date, calculate remaining time
  const timeDiff = endDate - now; // Difference in milliseconds
  if (timeDiff <= 0) {
    return "Banner is over."; // If the end date is in the past
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Calculate remaining days
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Remaining hours
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Remaining minutes
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000); // Remaining seconds

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds} seconds left`;
  }
}

// Function to calculate remaining days
export function getRemainingDays(startDate, endDate) {

  const now = new Date();
  if(startDate > now) {
    const timeDiff = endDate - startDate;
    const days = timeDiff / (1000 * 60 * 60 * 24);
    return days;
  }
  else {
    const timeDiff = endDate - now;
    const days = timeDiff / (1000 * 60 * 60 * 24);
    return days;
  }

}