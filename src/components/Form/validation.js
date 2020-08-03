import moment from 'moment'

const validation = ({ name, priority, time }) => {
  if(Number.isNaN(priority)) {
    return 'Priority needs to be a number';
  }

  if(priority < 0 || priority > 100) {
    return 'Priority needs to be between 0 and 100';
  }

  if(typeof name !== 'string') {
    return 'Name needs to be a string';
  }

  if(!name.length) {
    return 'Name can\'t be empty';
  }

  if(name.length > 255) {
    return 'Name needs to be shorter that 255 chars';
  }

  const momentTime = moment(time);

  if(!momentTime.isValid()) {
    return 'Date is not valid';
  }

  const oneYearAGO = moment().subtract(1, 'year')
  const oneYearFromNow = moment().add(1, 'year')
  if(momentTime.isBefore(oneYearAGO) || momentTime.isAfter(oneYearFromNow)) {
    return 'Please select time from 1 year ago to 1 year from now';
  }

  return undefined;
};

export default validation;
