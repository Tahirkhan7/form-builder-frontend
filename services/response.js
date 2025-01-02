import axios from "axios";
export const saveResponse = async (data) => {
  const res = axios.post(
    `https://form-builder-yhfe.onrender.com/api/response/submitResponse`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res;
};

export const getFormResponses = async (formId) => {
  const res = await axios.get(`https://form-builder-yhfe.onrender.com/api/response/${formId}`, {
      params: { formId },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};