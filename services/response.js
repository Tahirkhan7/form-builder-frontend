import axios from "axios";
export const saveResponse = async (data) => {
  const res = axios.post(
    `http://localhost:3000/api/response/submitResponse`,
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
  const res = await axios.get(`http://localhost:3000/api/response/${formId}`, {
      params: { formId },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};