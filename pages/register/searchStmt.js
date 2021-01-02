import Rect, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import { GetShareAccountStmt, GetShareAccount } from "../../util/shares";
import {
  Table,
  AlertFailure,
  SelectOptions,
} from "../../components/formElements";
import Layout from "../index";

export default function SearchStmt() {
  const [data, setdata] = useState([]);
  const [details, setDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [searchParam, setSearchParam] = useState({
    accountNumber: "",
    startDate: "",
    endDate: "",
  });
  const [record, setRecord] = useState([]);

  const columns = [
    { name: "Date", selector: "postingDate", sortable: true, wrap: true },
    { name: "ShareNo", selector: "shareNo", wrap: true },
    {
      name: "Narration",
      selector: "narration",
      sortable: true,
      wrap: true,
    },
    { name: "Credit", selector: "credit", maxWidth: "100px" },
    { name: "Debit", selector: "debit", maxWidth: "100px" },
    { name: "SharePrice", selector: "sharePrice", maxWidth: "100px" },
    { name: "ShareValue", selector: "shareValue", maxWidth: "100px" },
    {
      name: "TotalValue",
      selector: "totalSharesValue",
      sortable: true,
      wrap: true,
      maxWidth: "100px",
    },
    { name: "Balance", selector: "total", maxWidth: "100px" },
  ];

  const fetchStatement = async () => {
    const info = {
      accountNumber: searchParam.accountNumber,
      startDate: moment(searchParam.startDate).format("YYYY-MM-DD"),
      endDate: moment(searchParam.endDate).format("YYYY-MM-DD"),
    };
    try {
      setShow(false);
      const response = await GetShareAccountStmt(info);
      setdata(
        response.data.result[0].sort((a, b) => a.postingDate - b.postingDate)
      );
      console.log(data);
      setDetails(response.data.result[1]);
      setShow(true);
    } catch (error) {
      setShow(false);
      AlertFailure();
    }
  };

  const exportPdf = (e) => {
    e.preventDefault();
    const doc = new jsPDF();
    doc.text("Statement of Account", 12, 15);
    const firstHeaderBody = details.map((el) => [
      el.fullName,
      el.customerNo,
      el.accountNumber,
      el.openingBal,
      `${searchParam.startDate} - ${searchParam.endDate}`,
    ]);

    const secondHeaderBody = data.map((el) => [
      el.postingDate,
      el.shareNo,
      el.narration,
      el.credit,
      el.debit,
      el.sharePrice,
      el.shareValue,
      el.totalSharesValue,
      el.total,
    ]);
    const pdfSecondHeader = [
      "Date",
      "ShareNo",
      "Narration",
      "Credit",
      "Debit",
      "SharePrice",
      "ShareValue",
      "TotalValue",
      "Balance",
    ];

    const pdfFirstHeader = [
      "FullName",
      "CustomerNo",
      "AccountNumber",
      "OpeningBalance",
      "Period",
    ];
    doc.autoTable(pdfFirstHeader, firstHeaderBody, { startY: 20 });
    doc.autoTable(pdfSecondHeader, secondHeaderBody);
    doc.save(`${details[0].fullName} ${"Statement"}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStatement()
      .then((resp) => {})
      .catch((error) => {});
  };

  const bindData = record.map((el) => {
    return (
      <option key={el.id} value={el.accountNumber}>
        {el.fullName}
      </option>
    );
  });

  useEffect(async () => {
    try {
      const record = await GetShareAccount();
      setRecord(record.data.result);
    } catch (error) {
      AlertFailure();
    }
  }, []);

  return (
    <Layout heading="Shares Statement" title="shares > Statement">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="fullname">Select Customer</label>
          <SelectOptions
            value={searchParam.accountNumber}
            onChange={(e) =>
              setSearchParam({ ...searchParam, accountNumber: e.target.value })
            }
            type="text"
            className="form-control"
            id="fullname"
            required
          >
            <option value={0}></option>
            {bindData}
          </SelectOptions>
        </div>
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
        <div style={{ float: "left", marginBottom: 10 }}>
          <Button type="submit" className="btn btn-info">
            Query
          </Button>
        </div>
      </form>

      {show ? (
        <div>
          <div style={{ float: "right", marginBottom: 10 }}>
            <Button
              type="submit"
              className="btn btn-danger"
              onClick={exportPdf}
            >
              Export PDF
            </Button>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">CustomerNo</th>
                <th scope="col">FullName</th>
                <th scope="col">AccountNumber</th>
                <th scope="col">Opening Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{details[0].customerNo}</th>
                <td>{details[0].fullName}</td>
                <td>{details[0].accountNumber}</td>
                <td>{details[0].openingBal}</td>
              </tr>
            </tbody>
          </table>
          <Table title="Statement of Account" data={data} columns={columns} />
        </div>
      ) : null}
    </Layout>
  );
}
