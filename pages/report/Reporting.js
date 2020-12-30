import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Layout from "../index";
import moment from "moment";
import {
  Button,
  Input,
  SelectOptions,
  AlertFailure,
} from "../../components/formElements";
import { GetTopShare, GetConsolidatedShare } from "../../util/shares";
function Reporting() {
  const [searchParam, setSearchParam] = useState({
    value: "",
    startDate: "",
    endDate: "",
  });
  const [showTopShares, setTopShares] = useState(false);
  const [showConsolidate, setConsolidate] = useState(false);
  const [topSharesNo, setTopSharesNo] = useState({ value: 5 });
  const [showBtn, setShowBtn] = useState(false);
  const [topSharesData, setTopSharesData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const handleSelectChange = (e) => {
    setSearchParam({ ...searchParam, value: e.target.value });
    switch (e.target.value) {
      case "1":
        setTopShares(true);
        setShowBtn(true);
        setConsolidate(false);
        break;
      case "2":
        setConsolidate(true);
        setShowBtn(true);
        setTopShares(false);
        break;

      default:
        setTopShares(false);
        setConsolidate(false);
        setShowBtn(false);
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    switch (searchParam.value) {
      case "1":
        //query goes here
        try {
          setShowSpinner(true);
          const records = await GetTopShare({ topNo: topSharesNo.value });
          setTopSharesData(records.data.result);
          setShowSpinner(false);
          exportPdf();
        } catch (error) {
          console.log(error);
          AlertFailure();
          setShowSpinner(false);
        }

        break;
      case "2":
        //query goes here
        try {
          setShowSpinner(true);
          const records = await GetConsolidatedShare({
            startDate: moment(searchParam.startDate).format("YYYY-MM-DD"),
            endDate: moment(searchParam.endDate).format("YYYY-MM-DD"),
          });
          setTopSharesData(records.data.result);
          setShowSpinner(false);
          exportPdf2();
        } catch (error) {
          console.log(error);
          AlertFailure();
          setShowSpinner(false);
        }
        break;

      default:
        break;
    }
  };

  const exportPdf = async () => {
    const doc = new jsPDF();
    doc.text(`Top ${topSharesNo.value} Shares`, 12, 15);
    const firstHeaderBody = topSharesData.map((el) => [
      el.fullName,
      el.customerNo,
      el.accountNumber,
      el.totalShares,
    ]);

    const pdfFirstHeader = [
      "FullName",
      "CustomerNo",
      "AccountNumber",
      "TotalShares",
    ];
    doc.autoTable(pdfFirstHeader, firstHeaderBody, { startY: 20 });
    doc.save("TopShares.pdf");
  };

  const exportPdf2 = async () => {
    const doc = new jsPDF();
    doc.text(
      `Shares Purchase between ${searchParam.startDate} to ${searchParam.endDate}`,
      15,
      10
    );
    const firstHeaderBody = topSharesData.map((el) => [
      el.postingDate,
      el.fullName,
      el.shareNo,
      el.shareQty,
      el.sharePrice,
      el.totalSharesValue,
    ]);

    const pdfFirstHeader = [
      "Date",
      "FullName",
      "ShareNo",
      "Amount",
      "Price",
      "TotalShareValue",
    ];
    doc.autoTable(pdfFirstHeader, firstHeaderBody);
    doc.save("ConsolidatedShares.pdf");
  };

  return (
    <Layout heading="Reporting" title="shares > Reporting">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="fullname">Search By</label>
          <SelectOptions
            value={searchParam.value}
            onChange={handleSelectChange}
            type="text"
            className="form-control"
            required
          >
            <option value="0">Choose Option</option>
            <option value="1">Top Shares</option>
            <option value="2">Consolidated Shares Purchased Between</option>
          </SelectOptions>
        </div>
        {showTopShares ? (
          <div className="form-group">
            <label for="topShares">Select top {topSharesNo.value} shares</label>
            <Input
              type="number"
              min="1"
              className="form-control"
              value={topSharesNo.value}
              onChange={(e) => setTopSharesNo({ value: e.target.value })}
            />
          </div>
        ) : null}

        {showConsolidate ? (
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="dob">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  placeholder="Start Date"
                  value={searchParam.startDate}
                  onChange={(e) =>
                    setSearchParam({
                      ...searchParam,
                      startDate: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="dob2">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  placeholder="End Date"
                  value={searchParam.endDate}
                  onChange={(e) =>
                    setSearchParam({
                      ...searchParam,
                      endDate: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </div>
          </div>
        ) : null}

        {showBtn ? (
          <div style={{ float: "left", marginBottom: 10 }}>
            <Button type="submit" className="btn btn-info">
              Query
            </Button>
          </div>
        ) : null}
        {showSpinner ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Spinner animation="border" />
          </div>
        ) : null}
      </form>
    </Layout>
  );
}

export default Reporting;
