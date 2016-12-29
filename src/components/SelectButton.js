import React from 'react';

function SelectButton(props) {
  const className = props.active ? "btn btn-default btn-block btn-sm active" : "btn btn-default btn-block btn-sm";
  return (
    <button type="button" className={className} onClick={props.clickFunction} id={props.elementId}>{props.name}</button>
  );
}

export default SelectButton
