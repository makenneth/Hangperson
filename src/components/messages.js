import React from "react"

const mapMessages = (messages = []) => {
  return messages.map(msg => (
      <li><span>{msg.author}:&nbsp</span>{msg.body}</li> 
    ))
}

const messages = (props) => {
  return (
      <div className="message-list">
        <ul>
          { mapMessages(props.messages) }
        </ul>
      </div>
    )
}

export default messages