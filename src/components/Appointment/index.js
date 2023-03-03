import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "../../hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function saveAppointment(name, interviewer) {
    const interview = {
      student: name, 
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview).then((resolved) => {
      console.log("resolve", resolved)
      transition(SHOW);
    })
  }

  function cancelAppointment() {
    transition(DELETING)
    props.cancelInterview(props.id).then((resolved) => {
      console.log("resolved", resolved)
      transition(EMPTY)
    })
  }

  return (
      <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={saveAppointment}/>}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onCancel={() => back()} onConfirm={cancelAppointment} />}
        {mode === EDIT && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={saveAppointment} interviewer={props.interview.interviewer.id} student={props.interview.student}/>}
      </article>
  );
}
