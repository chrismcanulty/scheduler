import React, { useEffect, useState } from "react";
import axios from "axios";

import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import Form from "components/Appointment/Form.js"
import Status from "components/Appointment/Status.js"
import Error from "components/Appointment/Error.js"
import Confirm from "components/Appointment/Confirm.js"
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // show the saving indicator before calling props.bookInterview
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      })
  }

  function deleteInterview() {
    transition(CONFIRM);
  }

  function deleteInterviewConfirm(id) {
    transition(DELETING, true);
    props.onDelete(id).then(() => {
      transition(EMPTY);
    })
      .catch(() => {
        transition(ERROR_DELETE, true);
      })

  }

  return (
    <article className="appointment"
      data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm
        appointmentId={props.id}
        onCancel={back}
        onConfirm={deleteInterviewConfirm}
        message="Are you sure you would like to delete?"
      />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteInterview}
          appointmentId={props.id}
          interview={props.interview}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form

        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />}
      {mode === EDIT && <Form

        interviewers={props.interviewers}
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        onCancel={back}
        onSave={save}
      />}
      {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={back} />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={back} />}
    </article>
  )
}
