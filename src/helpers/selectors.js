export function getAppointmentsForDay(state, day) {
  // returns an array of appointments for that day
  const results = [];
  const dayObj = state.days.find(d => d.name === day);

  if (!dayObj) {
    return [];
  }

  for (let id of dayObj.appointments) {
    const appointment = state.appointments[id];
    results.push(appointment);
  }
  
  return results;
}

export function getInterview(state, interview) {
  // returns an interview object when passed an object that contains the interviewer
  
  if (!interview) {
    return null;
  } else {
    const interviewerId = interview.interviewer
    return {
      "student": interview.student,
      "interviewer": state.interviewers[interviewerId]
    }
  }
}

export function getInterviewersForDay(state, day) {
  // returns an array of interviewers for that day
  const results = [];
  const dayObj = state.days.find(d => d.name === day);

  if (!dayObj) {
    return [];
  }

  for (let id of dayObj.interviewers) {
    const interviewer = state.interviewers[id];
    results.push(interviewer);
  }
  
  return results;
}