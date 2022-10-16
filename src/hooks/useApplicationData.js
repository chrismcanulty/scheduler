import { useState } from "react";
import axios from "axios";

export default function useApplicationData() {

  function spotsCounter(appointments) {
    // add logic to update state to add a spot when interview is cancelled

    const findDayObj = state.days.find(day => {
      return day.name === state.day
    })

    const spotsRemaining = findDayObj.appointments.filter(key => {
      return appointments[key].interview === null
    }).length

    const updatedDays = state.days.map(day => {
      if (day.id === findDayObj.id) {
        return { ...day, spots: spotsRemaining }
      }
      else { return day }
    })

    return updatedDays;

  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const days = spotsCounter(appointments);
        setState({ ...state, appointments, days });
      })
      ;
  }

  function cancelInterview(appointmentId) {
    // use appointment id to find the right appointment slot
    const appointment = {
      ...state.appointments[appointmentId],
      interview: null
    };
    // and set its interview data to null
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    };

    return axios.delete(`/api/appointments/${appointmentId}`)
      .then(() => {
        const days = spotsCounter(appointments);
        setState({ ...state, appointments, days });
      })
  }

  const setDay = day => setState(prev => ({ ...prev, day }));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  return {
    setState,
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
