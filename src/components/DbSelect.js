import React from 'react';
import * as _ from 'lodash';

function DbSelect(props) {
  return (
    <div className="form-group">
      <label for="inputEmail3" className="col-sm-2 control-label">{props.title}</label>
      <div className="col-sm-10">
        <select className="form-control" onChange={props.changeFunction} >
          {_.map(props.content, item => <option>{item}</option>)}
        </select>
      </div>
    </div>
  );
}

export default DbSelect
