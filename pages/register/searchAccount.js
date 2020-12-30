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
    { title: "#", data: "id" },
    { title: "CustomerNo", data: "customerNo" },
    { title: "AccountNo", data: "accountNumber" },
    { title: "FullName", data: "fullName" },
    { title: "PhoneNo", data: "primaryPhone" },
    {
      title: "Total Shares",
      format: (row) => <strong>{row.totalBalance ?? "0.00"}</strong>,
    },
    { title: "DateOpen", data: "createdAt" },
  ];
  const columnsShares = [
    { title: "ShareNo", data: "shareNo" },
    { title: "Amount", data: "shareQty" },
    { title: "Price", data: "sharePrice" },
    {
      title: "Total",
      format: (row) => <strong>{row.total ?? "0.00"}</strong>,
    },
    { title: "DateOpen", data: "createdAt" },
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
        <Table data={data} columns={columns} click={fetchSharesWithAccount} />
      )}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Shares Purchased</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Table data={record} columns={columnsShares} />
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
