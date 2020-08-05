import moment from 'moment';

const formatTime = (time) => {
  const momentTime = moment(time);

  //  Before now
  const dueTimeBefore = momentTime.isBefore(moment());

  if(dueTimeBefore) {
    return { timeType: 'before', timeString: momentTime.fromNow() };
  }

  //  dueTimeVeryClose - Due time today
  const TodayMidnight = moment().add(1, 'day').startOf('day');
  const dueTimeVeryClose = momentTime.isBefore(TodayMidnight);

  if(dueTimeVeryClose) {
    return { timeType: 'veryClose', timeString: momentTime.format('HH:mm') };
  }

  //  dueTimeClose - Due time 3 days
  const midnight3daysInFutuee = moment().add(4, 'day').startOf('day');
  const dueTimeClose = momentTime.isBefore(midnight3daysInFutuee);

  if(dueTimeClose) {
    return { timeType: 'close', timeString: momentTime.format('MMMM Do') };
  }

  return { timeType: 'normal', timeString: momentTime.format('MMMM Do') };
};

export default formatTime;
