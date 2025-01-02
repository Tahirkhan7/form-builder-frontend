import axios from "axios";
export const createFolder = async (data) => {
  const res = axios.post(
    `http://localhost:3000/api/folder/createFolder`,
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
  const res = await axios.get(`http://localhost:3000/api/folder`, {
    params: { email },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const deleteFolder = async (data) => {
  const res = await axios.delete(
    `http://localhost:3000/api/folder/deleteFolder/${data.id}`,
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
