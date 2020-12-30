import { Axios } from "./api";

export const PostCustomer = async (data) => {
  try {
    const response = await Axios.post("/create-customer", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const FetchUnAuthorizeCustomer = async () => {
  try {
    const response = await Axios.get("/unauthorize");
    return response;
  } catch (error) {
    return error;
  }
};

export const GetCustomers = async () => {
  try {
    const response = await Axios.get("/customer-records");
    return response;
  } catch (error) {
    return error;
  }
};

export const AuthorizeCustomer = async (id) => {
  try {
    const response = await Axios.post("/authorize-customer/" + id);
    return response;
  } catch (error) {
    return error;
  }
};
export const UpdateCustomer = async (data) => {
  try {
    const response = await Axios.post("/update-customer", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const DeleteCustomer = async (id) => {
  try {
    const response = await Axios.post("/delete-record/ " + id);
    return response;
  } catch (error) {
    return error;
  }
};
