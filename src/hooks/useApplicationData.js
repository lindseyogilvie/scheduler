import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const spotsRemaining = (id, appointments, state) => {
    const currentDay = state.days.filter(day => day.appointments.includes(id))[0];
    const totalAppointments = currentDay.appointments.length
    let interviewsScheduled = 0;

    for (let appointment of currentDay.appointments) {
      if(appointments[appointment].interview) {
        interviewsScheduled += 1;
      }
    }

    const spotsLeft = totalAppointments - interviewsScheduled

    const newDay = {...currentDay, spots: spotsLeft}
    const newDays = state.days.map(day => (day.id === newDay.id ? newDay : day))

    return newDays;
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
    console.log(state)
    console.log(state.appointments)
    console.log(state.days)



    return new Promise((resolve, reject) => {
      axios.put(`/api/appointments/${id}`, interview)
        .then(() => {
          const newDays = spotsRemaining(id, appointments, state)
          setState({
            ...state,
            appointments,
            days: newDays
          });
          resolve(true);
        })
        .catch(error => {
          reject(true);
          console.log(error);
        });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`)
        .then(() => {
          const newDays = spotsRemaining(id, appointments, state)
          setState({
            ...state,
            appointments, 
            days: newDays
          });
          resolve(true);
        })
        .catch(error => {
          reject(true);
        });
    });
  }

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      console.log(all);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  return ({
    state,
    setDay,
    bookInterview,
    cancelInterview
  });
}