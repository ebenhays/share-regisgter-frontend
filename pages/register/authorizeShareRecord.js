import { useState, useEffect } from "react";
import {
  AuthorizeShareRecord,
  GetUnAuthorizeShareRecord,
} from "../../util/shares";
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
    { title: "ShareNo", data: "shareNo" },
    { title: "Qty", data: "shareQty" },
    { title: "SharePrice", data: "sharePrice" },
    {
      title: "Total",
      format: (row) => <strong>{row.total ?? "0.00"}</strong>,
    },
    { title: "DateOpen", data: "createdAt" },
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
    AuthorizeShareRecord(id)
      .then((response) => {
        AlertSuccess(response.data.message);
        const del = data.filter((rec) => id !== rec.id);
        setdata(del);
      })
      .catch((error) => AlertFailure());
  };
  const fetchUnauthRecord = async () => {
    setLoading(true);
    try {
      const response = await GetUnAuthorizeShareRecord();
      setLoading(false);
      setdata(response.data.result);
    } catch (error) {
      setLoading(false);
      AlertFailure();
    }
  };

  useEffect(async () => {
    await fetchUnauthRecord();
  }, []);

  return (
    <Layout
      heading="Authorize Share Record"
      title="Shares > authorize-share-record"
    >
      {loading ? (
        "Loading"
      ) : (
        <Table data={data} columns={columns} click={clickToAuthorize} />
      )}
    </Layout>
  );
}
