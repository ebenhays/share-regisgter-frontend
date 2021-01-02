import React, { useState, useEffect } from "react";
import moment from "moment";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  GetCustomers,
  UpdateCustomer,
  DeleteCustomer,
} from "../../util/customer";
import {
  Table,
  AlertFailure,
  Input,
  AlertSuccess,
} from "../../components/formElements";
import Layout from "../index";
import { Button, Modal, Spinner } from "react-bootstrap";

export default function searchCustomer() {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [record, setRecord] = useState([]);
  const handleClose = () => setShow(false);

  const columns = [
    {
      name: "#",
      selector: "id",
    },
    { name: "CustomerNo", selector: "customerNo" },
    {
      name: "FullName",
      selector: "fullName",
      sortable: true,
      wrap: true,
    },
    { name: "Primary Phone", selector: "primaryPhone", sortable: true },
    { name: "Email", selector: "emailAddress", sortable: true, wrap: true },
    { name: "Address", selector: "address", sortable: true, wrap: true },
    { name: "CreatedBy", selector: "createdBy" },
  ];
  const fetchCustomer = async () => {
    setLoading(true);
    try {
      const response = await GetCustomers();
      setLoading(false);
      setdata(response.data.result);
    } catch (error) {
      setLoading(false);
      AlertFailure();
    }
  };
  const updateCustomer = async () => {
    try {
      const rec = {
        fullName: record.fullName,
        primaryPhone: record.primaryPhone,
        secondaryPhone: record.secondaryPhone,
        emailAddress: record.emailAddress,
        address: record.address,
        id: record.customerNo,
      };
      const checkIfUpdateNeeded = data.indexOf(record);
      if (checkIfUpdateNeeded === 0) {
        handleClose();
        AlertSuccess("No changes to save");
        return;
      } else {
        const response = await UpdateCustomer(rec);
        AlertSuccess(response.data.message);
        const res = data.filter((el) => record.id !== el.id);
        setdata(res);
        handleClose();
      }
    } catch (error) {
      console.log(error);
      AlertFailure();
    }
  };
  const fetchACustomer = (row) => {
    setShow(true);
    const res = data.filter((el) => row.id === el.id);
    setRecord(...res);
    return res;
  };

  const deleteCustomer = async () => {
    try {
      await DeleteCustomer(record.id);
      const res = data.filter((el) => record.id === el.id);
      const getRecordIndex = data.indexOf(res);
      const newRec = [...data]; //copy array first
      newRec.splice(getRecordIndex, 1);
      setdata(newRec);
      AlertSuccess("Record Deleted Successfully");
      handleClose();
    } catch (error) {
      console.log(error);
      AlertFailure();
    }
  };

  const exportPdf = (e) => {
    e.preventDefault();
    const doc = new jsPDF();
    doc.text("Customers Records", 12, 15);
    const firstHeaderBody = data.map((el) => [
      el.customerNo,
      el.fullName,
      el.primaryPhone,
      el.emailAddress,
      el.address,
    ]);

    const pdfHeader = [
      "CustomerNo",
      "FullName",
      "Primary Phone",
      "Email",
      "Address",
    ];
    doc.autoTable(pdfHeader, firstHeaderBody, { startY: 20 });
    doc.save("Customers.pdf");
  };

  useEffect(async () => {
    await fetchCustomer();
  }, []);

  return (
    <Layout heading="Customer Records" title="customer > search-customer">
      {loading ? (
        <Spinner animation="grow" />
      ) : (
        <div>
          <Button
            type="submit"
            className="btn btn-danger"
            onClick={exportPdf}
            style={{ marginBottom: 20 }}
          >
            Export PDF
          </Button>
          <Table
            title="Customer Record"
            columns={columns}
            data={data}
            click={(row) => fetchACustomer(row)}
          />
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Records</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label for="customerNo">Customer No</label>
              <Input
                type="text"
                className="form-control"
                id="customerNo"
                disabled
                style={{ color: "violet" }}
                value={record.customerNo}
              />
            </div>
            <div className="form-group">
              <label for="fullname">Fullname</label>
              <Input
                type="text"
                className="form-control"
                id="fullname"
                required
                placeholder="Enter your Fullname"
                value={record.fullName}
                onChange={(e) =>
                  setRecord({ ...record, fullName: e.target.value })
                }
              />
              <div class="invalid-feedback">Please enter your name.</div>
            </div>
            <div className="form-group">
              <label for="primaryPhone">Primary Phone</label>
              <Input
                type="text"
                className="form-control"
                id="primaryPhone"
                required
                placeholder="Enter one frequently used phone number"
                value={record.primaryPhone}
                onChange={(e) =>
                  setRecord({
                    ...record,
                    primaryPhone: e.target.value,
                  })
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
                value={record.secondaryPhone}
                onChange={(e) =>
                  setRecord({
                    ...record,
                    secondaryPhone: e.target.value,
                  })
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
                value={record.emailAddress}
                onChange={(e) =>
                  setRecord({
                    ...record,
                    emailAddress: e.target.value,
                  })
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
                value={record.address}
                onChange={(e) =>
                  setRecord({
                    ...record,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label for="createdDate">Created Date</label>
              <Input
                type="text"
                className="form-control"
                id="createdDate"
                disabled
                value={moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteCustomer}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" onClick={updateCustomer}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}
