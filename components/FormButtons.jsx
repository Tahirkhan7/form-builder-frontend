import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import styles from "./FormButtons.module.css";
import Input from "./Input";
import { createForm } from "../services/form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function FormButtons({ formName, isSave, resetSave, folderId }) {
  const navigate = useNavigate();
  const { email } = useContext(AppContext);
  const [inputs, setInputs] = useState([]);

  const handleButtonClick = (fieldType, fieldInputType) => {
    setInputs((prevInputs) => [
      ...prevInputs,
      { id: Date.now(), fieldType, fieldInputType, value: "" },
    ]);
  };

  const handleDelete = (id) => {
    setInputs((prevInputs) => prevInputs.filter((input) => input.id !== id));
  };

  const handleInputChange = (id, value) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };

  const handleSave = async () => {
    if (email) {
      const invalidFields = inputs.filter(
        (input) => input.fieldType === "bubble" && !input.value
      );

      if (invalidFields.length > 0) {
        toast.error("Some bubble fields are missing their input type.");
        return;
      } else if(formName === ""){
        toast.error("Form name is required!");
        return;
      }

      const formData = {
        formName,
        folderId: folderId,
        email,
        haveAccess: [
          {
            email: email,
            canEdit: true,
          },
        ],
        formFields: inputs.map((input) => ({
          fieldType: input.fieldType,
          fieldInputType: input.fieldInputType,
          fieldInputValue: input.value,
          isRequired: false,
        })),
      };

      try {
        const result = await createForm(formData);
        if (result.status === 201) {
          toast.success("Form saved successfully:");
          setTimeout(()=>{
            navigate("/dashboard")
          },1000);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Error saving form:", error);
      }
    } else {
      alert("Error: Email is required to save the form.");
    }
  };

  useEffect(() => {
    if (isSave) {
      handleSave();
      resetSave();
    }
  }, [isSave, resetSave]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <p>Bubbles</p>
          <div className={styles.row}>
            <button
              className={styles.formButton}
              onClick={() => handleButtonClick("bubble", "text")}
            >
              <img src="/images/text.png" alt="" /> Text
            </button>

            <button
              className={styles.formButton}
              onClick={() => handleButtonClick("bubble", "image")}
            >
              <img src="/images/image.png" alt="" /> Image
            </button>
          </div>
          <div className={styles.row}>
            <button
              className={styles.formButton}
              onClick={() => handleButtonClick("bubble", "video")}
            >
              <img src="/images/video.png" alt="" /> Video
            </button>

            <button
              className={styles.formButton}
              onClick={() => handleButtonClick("bubble", "gif")}
            >
              <img src="/images/gif.png" alt="" /> GIF
            </button>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <p>Inputs</p>
          <div className={styles.row}>
            <button
              className={styles.formButton}
              onClick={() => handleButtonClick("input", "text")}
            >
              <img src="/images/text_input.png" alt="" /> Text
            </button>

            <button
              className={styles.formButton}
              onClick={() => handleButtonClick("input", "number")}
            >
              <img src="/images/number.png" alt="" /> Number
            </button>
          </div>
          <div className={styles.row}>
            <button
              className={styles.formButton}
              onClick={() => handleButtonClick("input", "email")}
            >
              <img src="/images/email.png" alt="" /> Email
            </button>

            <button
              className={styles.formButton}
              onClick={() => handleButtonClick("input", "phone")}
            >
              <img src="/images/phone.png" alt="" /> Phone
            </button>
          </div>
          <div className={styles.row}>
            <button
              className={styles.formButton}
              onClick={() => handleButtonClick("input", "date")}
            >
              <img src="/images/date.png" alt="" /> Date
            </button>

            <button
              className={styles.formButton}
              onClick={() => handleButtonClick("input", "rating")}
            >
              <img src="/images/rating.png" alt="" /> Rating
            </button>
          </div>
          <div className={styles.row}>
            <button
              className={styles.formButton}
              onClick={() => handleButtonClick("input", "buttons")}
            >
              <img src="/images/buttons.png" alt="" /> Buttons
            </button>
          </div>
        </div>
      </div>

      <div className={styles.start}>
        <button className={styles.startButton}>
          <img src="/images/start.png" alt="" /> Start
        </button>
        {inputs.map((input) => (
          <Input
            key={input.id}
            fieldType={input.fieldType}
            fieldInputType={input.fieldInputType}
            label={
              input.fieldInputType.charAt(0).toUpperCase() +
              input.fieldInputType.slice(1)
            }
            onDelete={() => handleDelete(input.id)}
            value={input.value} // Pass value
            onChange={(e) => handleInputChange(input.id, e.target.value)}
          />
        ))}
      </div>
      <div></div>
      <ToastContainer />
    </>
  );
}
