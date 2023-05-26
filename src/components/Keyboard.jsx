import React, { useEffect, useState } from "react";
import styled from "styled-components";

const KeyboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: center;
  background-color: #333;
  padding: 20px;
  border-radius: 15px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Key = styled.button`
  width: ${(props) => props.width || "40px"};
  height: 40px;
  margin: 2px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? "#e0e0e0" : "#a0a0a0")};
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 0.8em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:hover {
    background-color: ${(props) => (props.active ? "#e0e0e0" : "#e6e6e6")};
  }
`;

const KeyLabel = styled.div`
  text-align: center;
`;
const keysLayout = [
  [
    { label: ["`", "~"], width: "1" },
    { label: ["1", "!"], width: "1" },
    { label: ["2", "@"], width: "1" },
    { label: ["3", "#"], width: "1" },
    { label: ["4", "$"], width: "1" },
    { label: ["5", "%"], width: "1" },
    { label: ["6", "^"], width: "1" },
    { label: ["7", "&"], width: "1" },
    { label: ["8", "*"], width: "1" },
    { label: ["9", "("], width: "1" },
    { label: ["0", ")"], width: "1" },
    { label: ["-", "_"], width: "1" },
    { label: ["=", "+"], width: "1" },
    { label: ["Delete"], width: "1.5" },
  ],
  [
    { label: ["Tab"], width: "1.5" },
    { label: ["Q"], width: "1" },
    { label: ["W"], width: "1" },
    { label: ["E"], width: "1" },
    { label: ["R"], width: "1" },
    { label: ["T"], width: "1" },
    { label: ["Y"], width: "1" },
    { label: ["U"], width: "1" },
    { label: ["I"], width: "1" },
    { label: ["O"], width: "1" },
    { label: ["P"], width: "1" },
    { label: ["[", "{"], width: "1" },
    { label: ["]", "}"], width: "1" },
    { label: ["\\", "|"], width: "1" },
  ],
  [
    { label: ["Caps Lock"], width: "1.8" },
    { label: ["A"], width: "1" },
    { label: ["S"], width: "1" },
    { label: ["D"], width: "1" },
    { label: ["F"], width: "1" },
    { label: ["G"], width: "1" },
    { label: ["H"], width: "1" },
    { label: ["J"], width: "1" },
    { label: ["K"], width: "1" },
    { label: ["L"], width: "1" },
    { label: [";", ":"], width: "1" },
    { label: ["'", '"'], width: "1" },
    { label: ["Return"], width: "1.8" },
  ],
  [
    { label: ["Shift"], width: "2.2" },
    { label: ["Z"], width: "1" },
    { label: ["X"], width: "1" },
    { label: ["C"], width: "1" },
    { label: ["V"], width: "1" },
    { label: ["B"], width: "1" },
    { label: ["N"], width: "1" },
    { label: ["M"], width: "1" },
    { label: [",", "<"], width: "1" },
    { label: [".", ">"], width: "1" },
    { label: ["/", "?"], width: "1" },
    { label: ["Shift"], width: "2.5" },
  ],
  [
    { label: ["Control"], width: "1.2" },
    { label: ["Option"], width: "1.2" },
    { label: ["Command"], width: "1.2" },
    { label: ["Space"], width: "4.85" },
    { label: ["Command"], width: "1.2" },
    { label: ["Option"], width: "1.2" },
    { label: ["←"], width: "1" },
    { label: ["↑"], width: "1" },
    { label: ["↓"], width: "1" },
    { label: ["→"], width: "1" },
  ],
];
const KeyboardLayout = ({ layout, activeKey }) => (
  <KeyboardContainer>
    {layout.map((row, rowIndex) => (
      <Row key={rowIndex}>
        {row.map((key, keyIndex) => {
          const isActive = key.label.includes(activeKey);
          return (
            <Key key={keyIndex} width={`${key.width * 60}px`} active={isActive}>
              {key.label.map((label, labelIndex) => (
                <KeyLabel key={labelIndex}>{label}</KeyLabel>
              ))}
            </Key>
          );
        })}
      </Row>
    ))}
  </KeyboardContainer>
);

function Keyboard() {
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const char = event.key.toUpperCase();
      setActiveKey(char);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <KeyboardLayout layout={keysLayout} activeKey={activeKey} />;
}

export default Keyboard;