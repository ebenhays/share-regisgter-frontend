import React, { useState, useEffect } from "react";
import Layout from "../index";
import {
  Input,
  Button,
  SelectOptions,
  AlertSuccess,
  AlertFailure,
} from "../../components/formElements";

import {
  CreateShareRecord,
  GetShareAccount,
  GetSharePrice,
} from "../../util/shares";

function CreateShare() {
  const [record, setRecord] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    value: "",
    shareQty: "",
    sharePrice: "",
  });
  const [shareNumber, setShareNumber] = useState({ value: "" });
  const [sharePrice, setSharePrice] = useState({ value: 0 });
  const fetchAccount = async () => {
    try {
      const [result1, result2] = await Promise.all([
        GetShareAccount(),
        GetSharePrice(),
      ]);
      setRecord(result1.data.result);
      setSharePrice({ value: result2.data.result.price });
    } catch (error) {
      AlertFailure();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      accountNumber: selectedItem.value,
      shareQty: selectedItem.shareQty,
      sharePrice: sharePrice.value,
    };
    try {
      CreateShareRecord(data)
        .then((response) => {
          AlertSuccess(response.data.message);
          setShareNumber({ value: response.data.result.shareNo });
        })
        .catch((error) => {
          AlertFailure();
        });
    } catch (error) {
      AlertFailure();
    }
  };
  useEffect(async () => {
    await fetchAccount();
  }, []);

  const bindData = record.map((el) => {
    return (
      <option key={el.id} value={el.accountNumber}>
        {el.fullName}
      </option>
    );
  });
  return (
    <Layout heading="Buy Shares" title="customer > buy-shares">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="sharesNumber">Shares Number</label>
          <Input
            type="text"
            className="form-control"
            id="sharesNumber"
            disabled
            value={shareNumber.value}
            style={{ color: "red", fontWeight: "bold" }}
          />
        </div>
        <div className="form-group">
          <label for="fullname">Select Customer</label>
          <SelectOptions
            value={selectedItem.value}
            onChange={(e) =>
              setSelectedItem({ ...selectedItem, value: e.target.value })
            }
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
        <div className="form-group">
          <label for="sharesQty">Shares Qty</label>
          <Input
            type="number"
            className="form-control"
            id="sharesQty"
            value={selectedItem.shareQty}
            onChange={(e) =>
              setSelectedItem({ ...selectedItem, shareQty: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label for="sharesPrice">Shares Price</label>
          <Input
            type="text"
            className="form-control"
            id="sharesPrice"
            disabled
            value={sharePrice.value}
            style={{ color: "red", fontWeight: "bold" }}
          />
        </div>
        <Button type="submit" className="btn btn-primary">
          Create Share Record
        </Button>
      </form>
    </Layout>
  );
}

export default CreateShare;
