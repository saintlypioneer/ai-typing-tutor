import React, {useState} from 'react';
import styled from 'styled-components';
import Keyboard from './components/Keyboard';
import Statusbar from './components/Statusbar';
import TypingPractice from './components/TypingPractice';

const AppContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  padding: 50px;
  background-color: #f9f9f9;
`;

const Typing = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [keyCount, setKeyCount] = useState(0);
  return (
    <AppContainer>
      <Statusbar keysPressed={keyCount} accuracy={accuracy} speed={wpm} />
      <Typing>
        <TypingPractice wpm={wpm} setWpm={setWpm} accuracy={accuracy} setAccuracy={setAccuracy} keyCount={keyCount} setKeyCount={setKeyCount} />
        <Keyboard activeCharacter="A" />
      </Typing>
    </AppContainer>
  );
}

export default App;
