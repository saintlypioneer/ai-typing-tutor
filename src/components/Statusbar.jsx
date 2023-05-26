import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdKeyboard, MdCheckCircle, MdSpeed, MdTimer } from 'react-icons/md';
import { useSelector } from 'react-redux';

const StatusbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Metric = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Value = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

const Label = styled.div`
  font-size: 14px;
  color: #888;
`;

const IconWrapper = styled.div`
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #888;
  color: #fff;
  margin-bottom: 10px;
`;

const Statusbar = () => {
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const keysPressed = useSelector((state) => state.typing.keyCount);
  const accuracy = useSelector((state) => state.typing.accuracy);
  const speed = useSelector((state) => state.typing.wpm);

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <StatusbarWrapper>
      <Metric>
        <IconWrapper>
          <MdKeyboard />
        </IconWrapper>
        <Value>{keysPressed}</Value>
        <Label>Keys Pressed</Label>
      </Metric>
      <Metric>
        <IconWrapper>
          <MdCheckCircle />
        </IconWrapper>
        <Value>{accuracy}%</Value>
        <Label>Accuracy</Label>
      </Metric>
      <Metric>
        <IconWrapper>
          <MdSpeed />
        </IconWrapper>
        <Value>{speed} WPM</Value>
        <Label>Typing Speed</Label>
      </Metric>
      <Metric>
        <IconWrapper>
          <MdTimer />
        </IconWrapper>
        <Value>{`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</Value>
        <Label>Timer</Label>
      </Metric>
    </StatusbarWrapper>
  );
};

export default Statusbar;
