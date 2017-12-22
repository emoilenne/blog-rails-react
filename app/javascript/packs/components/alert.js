import React, { Component } from 'react';

export default class Alert extends React.Component {
  alertClass (type) {
    var classes = {
      error: 'alert-danger',
      alert: 'alert-warning',
      notice: 'alert-info',
      success: 'alert-success'
    };
    return classes[type] || classes.success;
  }

  render() {
    const message = this.props.message;
    const alertClassName = `alert ${ this.alertClass(message.type) } fade in`;

    return(
      <div className={ alertClassName }>
        <button className='close'
          data-dismiss='alert'
          onClick={this.props.removeMessage.bind(this, message)}> &times; </button>
        { message.text }
      </div>
    );
  }
}
