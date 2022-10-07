import React, { useState } from 'react';

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setStudent("");
    setInterviewer(null)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off" cancel>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            reset={reset}

          /*
            This must be a controlled component
            your code goes here
          */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          // Is this needed in InterviewList?
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => {
            reset();
            props.onCancel()
          }}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main >
  );
}
