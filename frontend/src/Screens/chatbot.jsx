import React, { useEffect } from "react";
import "../App.css";
import send from "../assets/send.png";
import { AiFillCloseCircle } from "react-icons/ai";

const ChatBot = () => {
  useEffect(() => {
    const open = document.getElementById("open-button");
    const window = document.getElementById("chatbot-window");
    const close = document.getElementById("close-button");

    open.addEventListener("click", () => {
      window.classList.remove("display-none");
      open.classList.add("display-none");
    });

    close.addEventListener("click", () => {
      window.classList.add("display-none");
      open.classList.remove("display-none");
    });
  }, []);

  const handleUserInput = (userMessage) => {
    const chatWindow = document.getElementById("chat-window");
    const sent = document.createElement("div");
    chatWindow.appendChild(sent);
    sent.innerHTML = userMessage;
    sent.classList.add("user-message");

    const response = getBotResponse(userMessage.toLowerCase());

    const reply = document.createElement("div");
    chatWindow.appendChild(reply);
    reply.innerHTML = response;
    reply.classList.add("bot-message");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  };
  
  const getBotResponse = (userMessage) => {

    if (userMessage.includes("issue")) {
      return "I'm sorry to hear about your issue. Here are some basic remedies you can try:\n1. Rest and hydration.\n2. Over-the-counter pain relievers.\n3. If the issue persists, consider booking an appointment with our nurse.";
    } else if (userMessage.includes("hello")) {
      return "Hello! How can I assist you?";
    } else if (userMessage.includes("appointment")) {
      return "To schedule an appointment with our nurse, please visit our 'Appointments' section on our website or call our hotline.";
    } else if (userMessage.includes("services")) {
      return "We offer a range of nursing services, including home care, wound care, and post-operative care. Please visit our 'Services' page for more details.";
    } else if (userMessage.includes("cost")) {
      return "The cost of our nursing services varies depending on the type of service and duration. You can find pricing information on our 'Pricing' page.";
    } else if (userMessage.includes("insurance")) {
      return "We accept a variety of insurance plans. You can check if your insurance is accepted on our 'Insurance' page or contact our billing department.";
    } else if (userMessage.includes("location")) {
      return "Our nursing service is available in multiple locations. Please visit our 'Locations' page to find the nearest one to you.";
    } else if (userMessage.includes("working hours")) {
      return "Our nursing services operate 24/7 for emergencies. For regular inquiries and appointments, our working hours are from 9 AM to 5 PM, Monday to Friday.";
    } else if (userMessage.includes("feedback")) {
      return "We value your feedback. Please visit our 'Feedback' page to leave your comments and suggestions.";
    } else if (userMessage.includes("emergency")) {
      return "If you have a medical emergency, please call 911 immediately. For non-life-threatening medical issues, please contact our hotline or visit the nearest hospital.";
    } else if (userMessage.includes("payment")) {
      return "We accept various payment methods, including credit cards and online payments. You can find more details on our 'Payment Options' page.";
    } else {
      return "I'm here to help. Please let me know how I can assist you.";
    }
  };

  const closeChatbot = () => {
    const chatbotWindow = document.getElementById("chatbot-window");
    chatbotWindow.classList.add("display-none");

    const openButton = document.getElementById("open-button");
    openButton.classList.remove("display-none");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-window display-none" id="chatbot-window">
        <div className="cb-heading">
          <span>Chatbot</span>
          <i
            className="fa-solid fa-chevron-down"
            id="close-button"
            onClick={closeChatbot}
          ></i>
          <button className="close-button" onClick={closeChatbot}>
            <AiFillCloseCircle />
          </button>
        </div>
        <div className="chat-window" id="chat-window"></div>
        <div className="chat-input">
          <form
            autoComplete="false"
            onSubmit={(e) => {
              e.preventDefault();
              handleUserInput(document.getElementById("user-input").value);
              document.getElementById("user-input").value = "";
            }}
            id="chatbot-form"
          >
            <input placeholder="Enter query" id="user-input" type="text" />
            <div
              className="icon-box"
              onClick={(e) => {
                e.preventDefault();
                handleUserInput(document.getElementById("user-input").value);
                document.getElementById("user-input").value = "";
              }}
            >
              <img src={send} alt="" width={20} height={20} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
