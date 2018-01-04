import React from 'react'
import Alert from './alert'

export default class AllAlerts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    }
    window.alerts = this
  }

  addMessage(message) {
    const { messages } = this.state
    messages.push(message)
    this.setState({ messages })
  }

  removeMessage = (message) => {
    const messages = this.state.messages.filter(m => m.text !== message.text)
    this.setState({ messages })
  }

  removeAll = () => {
    this.setState({ messages: [] })
  }

  render() {
    const alerts = this.state.messages.map(message => (
      <div key={message.text}>
        <Alert message={message} removeMessage={this.removeMessage} />
      </div>
    ))
    return (
      <div>
        {alerts}
      </div>
    )
  }
}
