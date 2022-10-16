import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  const spotsRemaining = () => {
    let returnMessage = ""
    if (props.spots > 1) {
      returnMessage = `${props.spots} spots remaining`;
    }
    else if (props.spots === 1) {
      returnMessage = `${props.spots} spot remaining`;
    }
    else if (props.spots === 0) {
      returnMessage = "no spots remaining";
    }
    return returnMessage;
  }
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light" data-testId='spots-remaining'>{spotsRemaining()}</h3>
    </li>
  );
}
