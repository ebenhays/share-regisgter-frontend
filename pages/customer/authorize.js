import { useState, useEffect } from "react";
import {
  AuthorizeCustomer,
  FetchUnAuthorizeCustomer,
} from "../../util/customer";
import Layout from "../index";
import {
  AlertSuccess,
  AlertFailure,
  Table,
} from "../../components/formElements";

export default function Authorize() {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    { title: "#", data: "id" },
    { title: "FullName", data: "fullName" },
    { title: "Primary Phone", data: "primaryPhone" },
    { title: "Email", data: "emailAddress" },
    { title: "Address", data: "address" },
    { title: "CreatedBy", data: "createdBy" },
  ];
  const clickToAuthorize = (row) => {
    swal({
      title: "Are you sure?",
      text: "You want to authorize this record?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((answerYes) => {
      if (answerYes) {
        authorizeRecord(row.id);
      } else {
        return;
      }
    });
  };
  const authorizeRecord = (id) => {
    AuthorizeCustomer(id)
      .then((response) => {
        AlertSuccess(response.data.message);
        const del = data.filter((rec) => id !== rec.id);
        setdata(del);
      })
      .catch((error) => AlertFailure());
  };
  const fetchUnauthCustomer = async () => {
    setLoading(true);
    try {
      const response = await FetchUnAuthorizeCustomer();
      setLoading(false);
      setdata(response.data.result);
    } catch (error) {
      setLoading(false);
      AlertFailure();
    }
  };

  useEffect(async () => {
    await fetchUnauthCustomer();
  }, []);

  return (
    <Layout
      heading="Authorize Customer Records"
      title="customer > authorize-customer"
    >
      {loading ? (
        "Loading"
      ) : (
        <Table data={data} columns={columns} click={clickToAuthorize} />
      )}
    </Layout>
  );
}
