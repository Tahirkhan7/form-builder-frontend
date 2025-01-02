import React, { useEffect, useState } from "react";
import styles from "./SaveResponse.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getFormById } from "../../services/form";
import { saveResponse } from "../../services/response";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SaveResponse = () => {
  const { formId } = useParams();
  const [formFields, setFormFields] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState(null);

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
                fieldId: field._id,
                user: "left",
                text: field.fieldInputValue,
                type: "bubble",
                inputType: field.fieldInputType,
              };
            } else if (field.fieldType === "input") {
              return {
                id: index + 1,
                fieldId: field._id,
                user: "left",
                text: "",
                type: "input",
                inputType: field.fieldInputType,
              };
            }
            return null;
          });
          setFormFields(chatDataFormatted);
        }
      } catch (error) {
        console.error("Failed to fetch form details:", error);
      }
    };

    fetchForm();
  }, [formId]);

  useEffect(() => {
    if (formFields[currentStep]?.type === "bubble") {
      const timer = setTimeout(() => {
        handleNextStep();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, formFields]);

  const handleInputChange = (event) => {
    setCurrentInput(event.target.value);
  };


  const handleSendResponse = async () => {
    const currentField = formFields[currentStep];
  
    if (currentField.inputType === "rating" && selectedRating !== null) {
      const existingResponse = responses.find(
        (res) => res.fieldId === currentField?.fieldId
      );
      if (!existingResponse) {
        setResponses((prevResponses) => [
          ...prevResponses,
          {
            fieldId: currentField?.fieldId,
            response: selectedRating,
          },
        ]);
      }
      setSelectedRating(null);
      handleNextStep();
    } else if (currentInput.trim()) {
      const existingResponse = responses.find(
        (res) => res.fieldId === currentField?.fieldId
      );
      if (!existingResponse) {
        const updatedResponses = [
          ...responses,
          {
            fieldId: currentField?.fieldId,
            response: currentInput,
          },
        ];
        setResponses(updatedResponses);
        setCurrentInput("");
  
        if (currentStep === formFields.length - 1) {
          await handleSubmit(updatedResponses);
        } else {
          handleNextStep();
        }
      }
    }
  };
  
  const handleNextStep = () => {
    if (currentStep < formFields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleSubmit = async (finalResponses) => {
    setSubmitted(true);
    const data = {
      formId,
      responses: finalResponses,
    };
  
    try {
      await saveResponse(data);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit responses.");
    }
  };
  
  if (submitted) {
    toast.success("Thank you for your response!");
    setTimeout(() => {
          navigate("/");
        }, 1500);
  }
  

  const renderField = (field, index) => {
    if (field.type === "bubble") {
      return (
        <div key={field.id} className={`${styles.messageRow} ${styles.left}`}>
          <img src="/images/user.png" alt="User Icon" className={styles.icon} />
          <div className={styles.message}>
            {field.inputType === "image" ? (
              <img src={field.text} alt="Bubble Content" />
            ) : (
              <span className={styles.textBubble}>{field.text}</span>
            )}
          </div>
        </div>
      );
    } else if (field.type === "input" && index === currentStep) {
      return (
        <div key={field.id} className={styles.inputContainer}>
          {field.inputType === "rating" ? (
            <div className={styles.ratingWrapper}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className={`${styles.ratingButton} ${
                    selectedRating === rating ? styles.active : ""
                  }`}
                  onClick={() => setSelectedRating(rating)}
                >
                  {rating}
                </button>
              ))}
            </div>
          ) : (
            <div className={styles.inputWrapper}>
              <input
                type={field.inputType}
                value={currentInput}
                placeholder="Enter your answer"
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
          )}
          <button className={styles.sendButton} onClick={handleSendResponse}>
            <span><img src="/images/send.png" alt="Send" /></span>
          </button>
        </div>
      );
    } else if (responses.some((res) => res.fieldId === field.fieldId)) {
      const response = responses.find((res) => res.fieldId === field.fieldId);
      return (
        <div key={field.id} className={`${styles.messageRow} ${styles.right}`}>
          <div className={styles.message}>
            <span className={styles.text}>{response.response}</span>
          </div>
        </div>
      );
    }
    return null;
  };
  

  return (
    <>
      <div className={styles.container}>
        <div className={styles.chatContainer}>
          {formFields.slice(0, currentStep + 1).map((field, index) => (
            <React.Fragment key={field.id}>
              {renderField(field, index)}
            </React.Fragment>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SaveResponse;
