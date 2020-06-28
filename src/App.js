import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import io from "socket.io-client";
import "./App.css";

// 소켓 연결
const socket = io.connect("http://localhost:9000");

function App() {
  // 1. react-hooks로 state 관리
  const [state, setState] = useState({
    name: "",
    message: "",
  });
  const [chat, setChat] = useState([]);
  // 2. useEffect를 통해서 기존 메세지 초기 렌더
  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });
  // 3. 입력한 텍스트 state를 변경하는 함수 생성
  const onChangeText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  // 4. 메세지를 보내는 함수 생성
  const onSubmitMessage = (e) => {
    e.preventDefault(); // 이벤트를 취소할 수 있는 경우, 이벤트의 전파를 막지않고 그 이벤트를 취소합니다.
    const { name, message } = state;
    socket.emit("message", { name, message });
    setState({ message: "", name });
  };
  // 5. 추가되는 메세지들을 다시 추가해주는 렌더 함수 추가
  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="App">
      <Card className="body1">
        <form onSubmit={onSubmitMessage}>
          <h1>LamaChat</h1>
          <div className="name-body">
            <TextField
              name="name"
              onChange={(e) => onChangeText(e)}
              value={state.name}
              label="이름"
              variant="outlined"
            />
          </div>
          <div className="message-body">
            <TextField
              name="message"
              onChange={(e) => onChangeText(e)}
              value={state.message}
              variant="outlined"
              label="메세지"
            />
          </div>
          <button>보내기</button>
        </form>
      </Card>
      <Card className="body2">
        <div className="render-chat">
          <h1>기록</h1>
          {renderChat()}
        </div>
      </Card>
    </div>
  );
}

export default App;
