import React from 'react';

class TextField extends React.Component {
  render() {
    return (
        <input type="text" className="form-control" placeholder={this.props.name} value={this.props.arvo} onChange={this.props.changeFunction} autoFocus />
    );
  }
}

export default TextField
