import { useState, useEffect } from "react";
import moment from "moment";
import { GetShareAccount, GetShareWithAccount } from "../../util/shares";
import {
  Table,
  AlertFailure,
  Input,
  AlertSuccess,
} from "../../components/formElements";
import Layout from "../index";
import { Button, Modal, Spinner } from "react-bootstrap";

export default function searchShareAccount() {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [record, setRecord] = useState([]);
  const handleClose = () => setShow(false);

  const columns = [
    { name: "#", data: "id" },
    { name: "CustomerNo", selector: "customerNo" },
    { name: "AccountNo", selector: "accountNumber" },
    { name: "FullName", selector: "fullName", sortable: true, wrap: true },
    { name: "PhoneNo", selector: "primaryPhone" },
    {
      name: "Total Shares",
      selector: "totalBalance",
      cell: (row) => (
        <div data-tag="allowRowEvents">
          <strong>{row.totalBalance ?? "0.00"}</strong>
        </div>
      ),
    },
    {
      name: "DateOpen",
      selector: "createdAt",
      sortable: true,
      wrap: true,
      cell: (row) => (
        <div data-tag="allowRowEvents">
          {moment(row.createdAt).format("YYYY-MM-DD")}
        </div>
      ),
    },
  ];
  const columnsShares = [
    { name: "ShareNo", selector: "shareNo" },
    { name: "Amount", selector: "shareQty" },
    { name: "Price", selector: "sharePrice" },
    {
      name: "Total",
      selector: "total",
      cell: (row) => (
        <div data-tag="allowRowEvents">
          <strong>{row.shareQty / row.sharePrice ?? "0.00"}</strong>
        </div>
      ),
    },
    { name: "DateOpen", selector: "createdAt" },
  ];
  const fetchAccountInfo = async () => {
    setLoading(true);
    try {
      const response = await GetShareAccount();
      setLoading(false);
      setdata(response.data.result);
    } catch (error) {
      setLoading(false);
      AlertFailure();
    }
  };

  const fetchSharesWithAccount = (row) => {
    GetShareWithAccount(row.accountNumber).then((response) => {
      setRecord(response.data.result);
      setShow(true);
    });
  };

  useEffect(async () => {
    await fetchAccountInfo();
  }, []);

  return (
    <Layout heading="Share Account Records" title="account > share-account">
      {loading ? (
        <Spinner animation="grow" />
      ) : (
        <Table
          title="Share Account Records"
          data={data}
          columns={columns}
          click={(row) => fetchSharesWithAccount(row)}
        />
      )}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Shares Purchased</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Table
              title="Individual Shares Purchase"
              data={record}
              columns={columnsShares}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}
