import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayItemClass = classNames("day-list__item", { 
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots})

  const formatSpots = () => {
    if (props.spots > 1) {
      return `${props.spots} spots remaining`
    }
    if (props.spots === 1) {
      return "1 spot remaining"
    }
    if (props.spots === 0) {
      return "no spots remaining"
    }
  }
  
  return (
    <li onClick={() => props.setDay(props.name)} className={dayItemClass}>
      <h2 className="text--regular">{props.name}</h2> 
      {<h3 className="text--light">{formatSpots(props.spots)}</h3>}
    </li>
  );
}