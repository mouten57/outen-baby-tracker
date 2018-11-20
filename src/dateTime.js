const dateTime = {
  date: timestamp => {
    var d = new Date(timestamp), // Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
      dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
      time;

    time = mm + '/' + dd + '/' + yyyy;
    return time;
  },
  time: timestamp => {
    var d = new Date(timestamp), // Convert the passed timestamp to milliseconds
      hh = d.getHours(),
      h = hh,
      min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
      ampm = 'AM',
      time;

    if (hh > 12) {
      h = hh - 12;
      ampm = 'PM';
    } else if (hh === 12) {
      h = 12;
      ampm = 'PM';
    } else if (hh === 0) {
      h = 12;
    }
    time = h + ':' + min + ' ' + ampm;
    return time;
  }
};

export default dateTime;
