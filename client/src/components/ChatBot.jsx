import React, { useState } from "react";
import axios from "axios";

export const ChatBot = ({recipe}) => {
    // Construct the ingredients string
    const ingredientsString = recipe.ingredients.map(ingredient => {
        let unit = ingredient.Unit
        if(ingredient.Amount === 1){
            unit = unit.slice(0, unit.length - 1)
        }
        return `${ingredient.Amount} ${unit} of ${ingredient.Name}`;
    }).join(", ");

    // Construct the first prompt
    const firstPrompt = `You are helping an amateur cook inside the kitchen. They are currently trying to make ${recipe.name} and they were told to use the following ingredients: ${ingredientsString}.`;

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([{ role: "system", content: firstPrompt }]);

    const sendMessage = async (message) => {
        const newMessage = { role: "user", content: message };
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        const response = await axios.post("http://localhost:8888/chat/completion", {
            messages: updatedMessages,
            model: "gpt-3.5-turbo",
        });
        const assistantResponse = {role: "system", content: response.data};
        setMessages((prevMessage) => [...prevMessage, assistantResponse]);
    };

    const submitForm = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
    };

    return (
        <div className={"chatbot-content"}>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <div className="message-content">{msg.role === "user" ? <p>You: </p> : <p>Assistant: </p>} {msg.content}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={submitForm}>
                <label htmlFor="message">Enter message:</label>
                <input id="message" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">Submit!</button>
            </form>
        </div>
    );
};