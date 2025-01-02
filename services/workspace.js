import axios from "axios";

export const addUserToWorkspace = async (data) => {
  const res = await axios.put(
    `http://localhost:3000/api/workspace/addMember`,
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
    `http://localhost:3000/api/workspace/addMemberByCopyLink`,
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
  const res = await axios.get(`http://localhost:3000/api/workspace/workspacesByUser`, {
    params: { email },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
