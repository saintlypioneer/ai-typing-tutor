import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setWpm, setAccuracy, setKeyCount } from '../redux/typingSlice';

const validKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

const TypingPracticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const GeneratedString = styled.div`
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: bold;
  letter-spacing: 5px;
`;

const Character = styled.span`
  color: ${props => props.shouldType ? 'red' : 'black'};
`;

const InputField = styled.input`
  width: 400px;
  height: 40px;
  margin-bottom: 20px;
  padding: 5px;
  font-size: 16px;
`;

function TypingPractice() {
    const dispatch = useDispatch();
    const [generatedString, setGeneratedString] = useState('');
    const [inputValue, setInputValue] = useState('');
    const startTime = useRef(null);
    const wpm = useSelector((state) => state.typing.wpm);
    const accuracy = useSelector((state) => state.typing.accuracy);
    const keyCount = useSelector((state) => state.typing.keyCount);
  
    useEffect(() => {
      generateString();
    }, []);
  
    const generateString = () => {
      let randomString = '';
      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * validKeys.length);
        randomString += validKeys[randomIndex];
      }
      setGeneratedString(randomString);
      setInputValue('');
      dispatch(setKeyCount(0));
      startTime.current = new Date();
    };
  
    const handleChange = (event) => {
      const newValue = event.target.value;
      setInputValue(newValue);
  
      // calculate the WPM
      const endTime = new Date();
      const timeElapsed = endTime - startTime.current; // time in ms
      const numWords = newValue.split(' ').length;
      const minutes = timeElapsed / 1000 / 60;
      const newWpm = Math.round(numWords / minutes);
      dispatch(setWpm(newWpm));
  
      // calculate the accuracy
      const matchingChars = newValue.split('').filter((char, index) => char === generatedString.charAt(index)).length;
      const newAccuracy = Math.round((matchingChars / newValue.length) * 100);
      dispatch(setAccuracy(isNaN(newAccuracy) ? 0 : newAccuracy));
  
      // update the key count
      dispatch(setKeyCount(newValue.length));
  
      // move to the next string if the current one is completed
      if (newValue === generatedString) {
        generateString();
      }
    };

  return (
    <TypingPracticeContainer>
      <GeneratedString>
        {generatedString.split('').map((char, index) => (
          <Character key={index} shouldType={index === inputValue.length}>
            {char}
          </Character>
        ))}
      </GeneratedString>
      <InputField
        value={inputValue}
        onChange={handleChange}
        placeholder="Start typing..."
        autoFocus
      />
    </TypingPracticeContainer>
  );
}

export default TypingPractice;
