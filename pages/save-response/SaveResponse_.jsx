import React, { useEffect, useState } from "react";
import styles from "./SaveResponse.module.css";
import { useParams } from "react-router-dom";
import { getFormById } from "../../services/form";

const SaveResponse = () => {
  const { formId } = useParams();
  const [chatData, setChatData] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [currentInputType, setCurrentInputType] = useState("text");

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await getFormById(formId);
        if (res.status === 200) {
          const form = res.data;

          const chatDataFormatted = form.formFields.map((field, index) => {
            if (field.fieldType === "bubble") {
              return {
                id: index + 1,
                user: "left",
                text:
                  field.fieldInputType === "image"
                    ? field.fieldInputValue
                    : field.fieldInputValue,
                type: field.fieldInputType === "image" ? "image" : "text",
              };
            } else if (field.fieldType === "input") {
              return {
                id: index + 1,
                user: "right",
                text: "",
                type: "input",
                inputType: field.fieldInputType,
              };
            }
            return null;
          });

          // Set the first input type for the input field
          const firstInputField = form.formFields.find(
            (field) => field.fieldType === "input"
          );
          if (firstInputField) {
            setCurrentInputType(firstInputField.fieldInputType);
          }

          setChatData(chatDataFormatted);
        }
      } catch (error) {
        console.error("Failed to fetch form details:", error);
      }
    };

    fetchForm();
  }, [formId]);

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const handleInputSubmit = () => {
    if (currentInput.trim() === "") return;

    // Add the new input to chatData
    setChatData((prevChatData) => [
      ...prevChatData,
      {
        id: prevChatData.length + 1,
        user: "right",
        text: currentInput,
        type: "text",
      },
    ]);

    // Clear the input field and move to the next step
    setCurrentInput("");
    setCurrentStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    // Automatically move to the next step if the current step is an input
    if (chatData[currentStep] && chatData[currentStep].type === "input") {
      setCurrentInputType(chatData[currentStep].inputType);
    }
  }, [currentStep, chatData]);

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        {chatData.slice(0, currentStep + 1).map((message, index) => {
          const isFirstMessageFromUser =
            index === 0 || chatData[index - 1].user !== message.user;

          return (
            <div
              key={message.id}
              className={`${styles.messageRow} ${
                message.user === "left" ? styles.left : styles.right
              }`}
            >
              {message.user === "left" && isFirstMessageFromUser && (
                <img
                  src="/images/user.png"
                  alt="User Icon"
                  className={styles.icon}
                />
              )}
              {message.user === "left" && !isFirstMessageFromUser && (
                <div className={styles.spacer}></div>
              )}
              <div className={styles.message}>
                {message.type === "text" ? (
                  <span className={styles.text}>{message.text}</span>
                ) : message.type === "image" ? (
                  <img
                    src={message.text}
                    alt="User shared content"
                    className={styles.image}
                  />
                ) : message.type === "input" ? (
                  <input
                    type={message.inputType}
                    placeholder={`Enter your ${message.inputType}`}
                    className={styles.input}
                    disabled
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      {chatData[currentStep+1] &&
        chatData[currentStep+1].type === "input" && (
          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <input
                type={currentInputType}
                value={currentInput}
                onChange={handleInputChange}
                placeholder={`Enter your ${currentInputType}`}
                className={styles.input}
              />
            </div>
            <button className={styles.sendButton} onClick={handleInputSubmit}>
              <span>&#x27A4;</span>
            </button>
          </div>
        )}
    </div>
  );
};

export default SaveResponse;
