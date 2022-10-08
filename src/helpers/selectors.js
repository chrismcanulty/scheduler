export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  // find correct day inside state.days and get the appointments array
  // loop through objects and identify object with correct name: day
  // if correct, take appointments from that object and add to const
  let appointmentsByDay = [];
  for (const object of state.days) {
    if (object.name === day) {
      appointmentsByDay = object.appointments
    }
  }
  // using the appointments array find the corresponding components

  return appointmentsByDay.reduce((accumulator, appointment) => {
    accumulator.push(state.appointments[appointment]);
    return accumulator
  }, [])
};
