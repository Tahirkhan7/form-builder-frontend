import axios from "axios";
export const createFolder = async (data) => {
  const res = axios.post(
    `https://form-builder-yhfe.onrender.com/api/folder/createFolder`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res;
};

export const getAllFolders = async (email) => {
  const res = await axios.get(`https://form-builder-yhfe.onrender.com/api/folder`, {
    params: { email },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const deleteFolder = async (data) => {
  const res = await axios.delete(
    `https://form-builder-yhfe.onrender.com/api/folder/deleteFolder/${data.id}`,
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
