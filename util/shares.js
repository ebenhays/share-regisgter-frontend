import { Axios } from "./api";

export const CreateShareAccount = async (data) => {
  try {
    const response = await Axios.post("/create-shares-account", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const CreateSharePrice = async (data) => {
  try {
    const response = await Axios.post("/create-shares-price", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const CreateShareRecord = async (data) => {
  try {
    const response = await Axios.post("/create-shares-record", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const AuthorizeShareAccount = async (id) => {
  try {
    const response = await Axios.post("/authorize-shares-account/" + id);
    return response;
  } catch (error) {
    return error;
  }
};

export const AuthorizeShareRecord = async (id) => {
  try {
    const response = await Axios.post("/authorize-share-record/" + id);
    return response;
  } catch (error) {
    return error;
  }
};
export const GetUnAuthorizeShareAccount = async () => {
  try {
    const response = await Axios.get("/unauthorize-shares-account");
    return response;
  } catch (error) {
    return error;
  }
};

export const GetUnAuthorizeShareRecord = async () => {
  try {
    const response = await Axios.get("/unauthorize-shares-records");
    return response;
  } catch (error) {
    return error;
  }
};
export const GetShareAccount = async () => {
  try {
    const response = await Axios.get("/shares-account");
    return response;
  } catch (error) {
    return error;
  }
};

export const GetSharePrice = async () => {
  try {
    const response = await Axios.get("/get-shares-price");
    return response;
  } catch (error) {
    return error;
  }
};

export const GetShareWithAccount = async (acctNo) => {
  try {
    const response = await Axios.get("/account-with-shares/" + acctNo);
    return response;
  } catch (error) {
    return error;
  }
};

export const GetShareAccountStmt = async (data) => {
  try {
    const response = await Axios.post("/shares-stmt", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const GetTopShare = async (data) => {
  try {
    const response = await Axios.post("/top-shares", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const GetConsolidatedShare = async (data) => {
  try {
    const response = await Axios.post("/consolidate-shares", data);
    return response;
  } catch (error) {
    return error;
  }
};
