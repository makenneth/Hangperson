package socket

import "encoding/json"

type Message struct {
  Type string `json:"type"`
  Data json.RawMessage `json:"data"`
}

type InterclientMessage struct {
  Dest []string
  Message *Message
}