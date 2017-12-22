import React, { Component } from 'react';
import Alert from './alert';

export default class AllAlerts extends React.Component {
  constructor(props) {
    super(props)
    this.state = { messages: [] }
    window.alerts = this
  }

  addMessage(message) {
    var messages = this.state.messages
    messages.push(message)
    this.setState({ messages })
    console.log(this.state)
  }

  removeMessage = (message) => {
    var messages = this.state.messages.filter((m) => {
      return m.text != message.text
    });
    this.setState({ messages })
  }

  removeAll = () => {
    this.setState({ messages: [] })
  }

  render() {
    var alerts = this.state.messages.map((message) => {
      return (
        <div key={message.text}>
          <Alert message={message} removeMessage={this.removeMessage} />
        </div>
      )
    })
    return(
      <div>
        {alerts}
      </div>
    );
  }
}
