import axios from "axios";
export const createForm = async (data) => {
  const res = axios.post(
    `http://localhost:3000/api/form/createForm`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res;
};

export const getAllForms = async (email) => {
  const res = await axios.get(`http://localhost:3000/api/form`, {
    params: { email },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const getFormById = async (formId) => {
  const res = await axios.get(`http://localhost:3000/api/form/${formId}`, {
      params: { formId },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const getFormsByFolder = async (email, folderId) => {
    const res = await axios.get(`http://localhost:3000/api/form/getFormsByFolder/${folderId}`, {
        params: { email, folderId },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  };

export const deleteForm = async (data) => {
  const res = await axios.delete(
    `http://localhost:3000/api/form/deleteForm/${data.id}`,
    {
      headers: {
        "Content-Type": "application/json",
        email: data.email,
      },
    }
  );
  return res;
};

export const myDetails = async (email) => {
  const res = axios.get(`http://localhost:3000/api/folder/${email}`, {});
  return res;
};
