import React, { useEffect, useState } from "react";
import Layout from "../index";
import {
  Input,
  Button,
  SelectOptions,
  AlertSuccess,
  AlertFailure,
} from "../../components/formElements";

import { CreateSharePrice, GetSharePrice } from "../../util/shares";
function SharePrice() {
  const [sharePrice, setSharePrice] = useState({ value: 0 });
  const handleBlur = (e) => {
    const num = parseFloat(sharePrice.value).toFixed(2);
    setSharePrice({ value: num });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateSharePrice({ sharePrice: sharePrice.value })
      .then((response) => {
        AlertSuccess(response.data.message);
      })
      .catch((error) => {
        AlertFailure();
      });
  };
  useEffect(() => {
    GetSharePrice()
      .then((response) => {
        setSharePrice({ value: response.data.result.price });
      })
      .catch((error) => {
        AlertFailure();
      });
  }, []);
  return (
    <Layout heading="Share Price" title="shares > shares-price">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="sharePrice">Share Price</label>
          <Input
            type="number"
            className="form-control"
            id="sharePrice"
            value={sharePrice.value}
            onChange={(e) => setSharePrice({ value: e.target.value })}
            onBlur={handleBlur}
          />
        </div>
        <Button type="submit" className="btn btn-primary">
          Save
        </Button>
      </form>
    </Layout>
  );
}
export default SharePrice;
