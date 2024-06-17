import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Textbox, Button, TextArea, ChatBox } from '../../Components/imports';
import './ChatUser.css'
function ChatUser() {

    const [message, setMessage] = useState('');
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && message != '') {
            event.preventDefault(); // Prevent default Enter key behavior
            console.log("Message sent: ", message);
            // You can add more functionality here, like sending the message to the server
            const newMessage = { sender: 'user', text: message };
            setChatMessages(prevMessages => [...prevMessages, newMessage]);
            setMessage(''); // Clear the TextArea after sending the message
        }
    };

    const [chatMessages, setChatMessages] = useState([
        { sender: 'client', text: 'Hello, how are you?' },
        { sender: 'user', text: "I'm good, thank you! How about you?" },
        { sender: 'client', text: "I'm doing well, just working on a project." },
        { sender: 'user', text: "That sounds interesting! What's the project about?" },
        { sender: 'client', text: "It's a web development project using React." },
        { sender: 'user', text: 'Nice! React is a great library for building UIs.' }
    ]);
    
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <>
        <div className='userchat-container'>
            <div className='userchat-messages'>
                {chatMessages.map((msg, index) => (
                        <ChatBox key={index} sender={msg.sender} value={msg.text} />
                ))}
            </div>
            <div className='userchat-text'>
                <TextArea 
                    placeholder={"Žinutė..."} 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}/>
            </div>
        </div>
        </>
    );

}

export default ChatUser;
