export function extractTime(dateString: Date) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = padZero(date.getMinutes());
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hours to 12-hour format
  
    return `${hours}:${minutes} ${ampm}`;
  }
  
  // Helper function to pad single-digit numbers with a leading zero
  function padZero(number: number) {
    return number.toString().padStart(2, "0");
  }
  