// Your code here
function createEmployeeRecord(array){
  return {
    firstName: array[0], 
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}


function createEmployeeRecords(Arrays){
  let arrayOfObjects = Arrays.map(function(element){return createEmployeeRecord(element)});
  
  return arrayOfObjects;
}


function createTimeInEvent(employeeRecord, dateStamp){
  const timeInObject = {
    type: "TimeIn",
    hour: parseInt(dateStamp.substring(11, 15), 10),
    date: dateStamp.substring(0, 10)
  }

  employeeRecord.timeInEvents.push(timeInObject);

  return employeeRecord;

}


function createTimeOutEvent(employeeRecord, dateStamp){
  const timeOutObject = {
    type: "TimeOut",
    hour: parseInt(dateStamp.substring(11, 15), 10),
    date: dateStamp.substring(0, 10)
  }

  employeeRecord.timeOutEvents.push(timeOutObject);

  return employeeRecord;
}


function hoursWorkedOnDate(employeeRecord, date){

  let timeInEvent = employeeRecord.timeInEvents.find((element) => date === element.date);
  let timeOutEvent = employeeRecord.timeOutEvents.find((element) => date === element.date);

  return timeOutEvent.hour/100 - timeInEvent.hour/100;

}


function wagesEarnedOnDate(employeeRecord, date){
  return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}


function allWagesFor (employeeRecord){

  let timeInDates = employeeRecord.timeInEvents.map(function(element){return element.date});

  return timeInDates.reduce(function(accumulator, element){accumulator += wagesEarnedOnDate(employeeRecord, element); return accumulator}, 0);
}


function calculatePayroll(employeeRecords){
  return employeeRecords.reduce(function(accumulator, element) {accumulator += allWagesFor(element) ; return accumulator}, 0);
}