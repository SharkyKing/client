import React, { useEffect, useRef } from 'react';
import './ChatBox.css';

function ChatBox({ sender, value }) {
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      // Reset height to auto to calculate the scroll height
      textAreaRef.current.style.height = 'auto';
      // Set the height to the scroll height to fit the content
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      className={`textArea-input ${sender === 'user' ? 'user-message' : 'client-message'}`}
      value={value}
      readOnly
      ref={textAreaRef}
    />
  );
}

export default ChatBox;
