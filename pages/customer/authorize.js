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
    { name: "#", selector: "id" },
    { name: "FullName", selector: "fullName", sortable: true, wrap: true },
    { name: "Primary Phone", selector: "primaryPhone" },
    { name: "Email", selector: "emailAddress", sortable: true, wrap: true },
    { name: "Address", selector: "address", sortable: true, wrap: true },
    { name: "CreatedBy", selector: "createdBy" },
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
        <Table
          title="Authorize Record"
          data={data}
          columns={columns}
          click={(row) => clickToAuthorize(row)}
        />
      )}
    </Layout>
  );
}
