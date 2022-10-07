import React from "react";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  const interviewersList = props.interviewers.map((person) => {
    return (
      <InterviewerListItem
        key={person.id}
        name={person.name}
        avatar={person.avatar}
        selected={person.id === props.value}
        setInterviewer={() => props.setInterviewer(person.id)}
      />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersList}</ul>
    </section>
  )
}
