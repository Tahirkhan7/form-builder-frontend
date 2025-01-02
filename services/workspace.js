import axios from "axios";

export const addUserToWorkspace = async (data) => {
  const res = await axios.put(
    `https://form-builder-yhfe.onrender.com/api/workspace/addMember`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res;
};

export const addMemberByCopyLink = async (data) => {
  const res = await axios.put(
    `https://form-builder-yhfe.onrender.com/api/workspace/addMemberByCopyLink`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res;
};

export const getAllMyWorkspaces = async (email) => {
  const res = await axios.get(`https://form-builder-yhfe.onrender.com/api/workspace/workspacesByUser`, {
    params: { email },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
