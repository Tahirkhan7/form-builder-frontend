import axios from "axios";
export const register = async (data) => {
  const res = axios.post(
    `https://form-builder-yhfe.onrender.com/api/user/register`,
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res;
};

export const loginUser = async (data) => {
  const res = axios.post(
    `https://form-builder-yhfe.onrender.com/api/user/login`,
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return res;
};

export const getAllUsers = async (email) => {
  const res = await axios.get(`https://form-builder-yhfe.onrender.com/api/user`, {
    params: { email },
  });
  return res;
};

export const userExists = async (email) => {
  const res = await axios.get(`https://form-builder-yhfe.onrender.com/api/user/userExists`, {
    params: { email },
  });
  return res;
};

export const updateUser = async (data) => {
  const res = await axios.put(
    `https://form-builder-yhfe.onrender.com/api/user/update`,
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res;
};