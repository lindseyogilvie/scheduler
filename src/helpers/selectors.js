
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
