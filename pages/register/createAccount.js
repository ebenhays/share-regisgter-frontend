import React, { useState, useEffect } from "react";
import Layout from "../index";
import {
  Input,
  Button,
  SelectOptions,
  AlertSuccess,
  AlertFailure,
} from "../../components/formElements";

import { CreateShareAccount } from "../../util/shares";
import { GetCustomers } from "../../util/customer";
function CreateAccount() {
  const [customer, setCustomer] = useState([]);
  const [selectedItem, setSelectedItem] = useState({ value: "" });
  const [accountNumber, setAccountNumber] = useState({ value: "" });
  const fetchCust = async () => {
    try {
      const response = await GetCustomers();
      setCustomer(response.data.result);
    } catch (error) {
      AlertFailure();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      customerNo: selectedItem.value,
      createdBy: "Eben",
    };
    try {
      CreateShareAccount(data)
        .then((response) => {
          AlertSuccess(response.data.message);
          setAccountNumber({ value: response.data.result.accountNumber });
        })
        .catch((error) => {
          AlertFailure();
        });
    } catch (error) {
      AlertFailure();
    }
  };
  useEffect(async () => {
    await fetchCust();
  }, []);

  const bindData = customer.map((el) => {
    return (
      <option key={el.id} value={el.customerNo}>
        {el.fullName}
      </option>
    );
  });
  return (
    <Layout
      heading="Create Share Account"
      title="customer > create-shares-account"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="accountNumber">Account Number</label>
          <Input
            type="text"
            className="form-control"
            id="accountNumber"
            disabled
            value={accountNumber.value}
            style={{ color: "red", fontWeight: "bold" }}
          />
        </div>
        <div className="form-group">
          <label for="fullname">Select Customer</label>
          <SelectOptions
            value={selectedItem.value}
            onChange={(e) => setSelectedItem({ value: e.target.value })}
            type="text"
            className="form-control"
            id="fullname"
            required
            placeholder="Enter your Fullname"
          >
            <option value={0}></option>
            {bindData}
          </SelectOptions>
        </div>
        <Button type="submit" className="btn btn-primary">
          Create Account
        </Button>
      </form>
    </Layout>
  );
}

export default CreateAccount;
