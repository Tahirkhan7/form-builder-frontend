import axios from "axios";
export const createForm = async (data) => {
  const res = axios.post(
    `https://form-builder-yhfe.onrender.com/api/form/createForm`,
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
  const res = await axios.get(`https://form-builder-yhfe.onrender.com/api/form`, {
    params: { email },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const getFormById = async (formId) => {
  const res = await axios.get(`https://form-builder-yhfe.onrender.com/api/form/${formId}`, {
      params: { formId },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const getFormsByFolder = async (email, folderId) => {
    const res = await axios.get(`https://form-builder-yhfe.onrender.com/api/form/getFormsByFolder/${folderId}`, {
        params: { email, folderId },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  };

export const deleteForm = async (data) => {
  const res = await axios.delete(
    `https://form-builder-yhfe.onrender.com/api/form/deleteForm/${data.id}`,
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
  const res = axios.get(`https://form-builder-yhfe.onrender.com/api/folder/${email}`, {});
  return res;
};
