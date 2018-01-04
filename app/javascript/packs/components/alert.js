import React from 'react'

export default class Alert extends React.Component {
  static alertClass(type) {
    const classes = {
      error: 'alert-danger',
      alert: 'alert-warning',
      notice: 'alert-info',
      success: 'alert-success',
    }
    return classes[type] || classes.success
  }

  render() {
    const { message } = this.props
    const alertClassName = `alert ${Alert.alertClass(message.type)} fade in`

    return (
      <div className={alertClassName}>
        <button className="close" data-dismiss="alert" onClick={() => this.props.removeMessage(message)}> &times; </button>
        { message.text }
      </div>
    )
  }
}
