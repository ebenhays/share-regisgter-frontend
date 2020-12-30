import React, { useState } from "react";
import Layout from "../index";
import {
  Input,
  Button,
  AlertSuccess,
  AlertFailure,
} from "../../components/formElements";
import { PostCustomer } from "../../util/customer";

export default function CreateCustomer() {
  const [customer, setCustomer] = useState({
    fullName: "",
    primaryPhone: "",
    secondaryPhone: "",
    emailAddress: "",
    address: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    //save record to database.
    const data = {
      fullName: customer.fullName,
      primaryPhone: customer.primaryPhone,
      secondaryPhone: customer.secondaryPhone,
      emailAddress: customer.emailAddress,
      address: customer.address,
    };
    PostCustomer(data)
      .then((response) => {
        AlertSuccess(response.data.message);
        setCustomer({
          fullName: "",
          primaryPhone: "",
          secondaryPhone: "",
          emailAddress: "",
          address: "",
        });
      })
      .catch((error) => {
        AlertFailure();
      });
  };
  return (
    <Layout heading="Create Customer" title="customer > create-customer">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="fullname">Fullname</label>
          <Input
            type="text"
            className="form-control"
            id="fullname"
            required
            placeholder="Enter your Fullname"
            value={customer.fullName}
            onChange={(e) =>
              setCustomer({ ...customer, fullName: e.target.value })
            }
          />
          <div class="invalid-feedback">Please enter your name.</div>
        </div>
        <div className="form-group">
          <label for="primaryPhone">Primary Phone</label>
          <Input
            type="tel"
            className="form-control"
            id="primaryPhone"
            required
            placeholder="Enter one frequently used phone number"
            value={customer.primaryPhone}
            onChange={(e) =>
              setCustomer({ ...customer, primaryPhone: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label for="secondaryPhone">Secondary Phone</label>
          <Input
            type="text"
            className="form-control"
            id="secondaryPhone"
            placeholder="Enter phone number"
            value={customer.secondaryPhone}
            onChange={(e) =>
              setCustomer({ ...customer, secondaryPhone: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label for="email">Email Address</label>
          <Input
            type="email"
            className="form-control"
            id="email"
            required
            placeholder="Enter your email address"
            value={customer.emailAddress}
            onChange={(e) =>
              setCustomer({ ...customer, emailAddress: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label for="address">Address</label>
          <Input
            type="text"
            className="form-control"
            id="address"
            required
            placeholder="Enter your address"
            value={customer.address}
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
          />
        </div>
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </form>
    </Layout>
  );
}
