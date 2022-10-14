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

export function getInterview(state, interview) {
  if (interview === null) return null;
  const interviewerID = interview.interviewer;
  return {
    "student": interview.student,
    "interviewer": state.interviewers[interviewerID]
  }
}

export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers for that day
  // find correct day inside state.days and get the interviewers object
  // transform the object to an array
  // loop through objects and identify object with correct name: day
  // if correct, take appointments from that object and add to const
  let interviewResult = [];
  for (const object of state.days) {
    if (object.name === day) {
      // interviewersByDay = object.interviewers;
      interviewResult = object.interviewers.map((key) => state.interviewers[key]);
    }
  }
  return interviewResult
  // either transform or work with the interviewersByDay object

  // return interviewerResult.reduce((accumulator, interviewer) => {
  //   accumulator.push(state.interviewers[interviewer]);
  //   return accumulator
  // }, [])
};

// export function getInterview(state, interview) {
//   if (interview === null) return null;
//   const interviewerID = interview.interviewer;
//   return {
//     "student": interview.student,
//     "interviewer": state.interviewers[interviewerID]
//   }
// }
