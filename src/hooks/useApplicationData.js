import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return new Promise((resolve, reject) => {
      axios.put(`/api/appointments/${id}`, interview)
        .then(response => {
          setState({
            ...state,
            appointments
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
        .then(response => {
          setState({
            ...state,
            appointments
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
      axios.get('api/interviewers')
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