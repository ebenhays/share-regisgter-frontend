import { useState, useEffect } from "react";
import {
  AuthorizeShareAccount,
  GetUnAuthorizeShareAccount,
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
    { title: "CustomerNo", data: "customerNo" },
    { title: "Account No", data: "accountNumber" },
    { title: "FullName", data: "fullName" },
    { title: "CreatedBy", data: "createdBy" },
    { title: "CreatedAt", data: "createdAt" },
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
    AuthorizeShareAccount(id)
      .then((response) => {
        AlertSuccess(response.data.message);
        const del = data.filter((rec) => id !== rec.id);
        setdata(del);
      })
      .catch((error) => AlertFailure());
  };
  const fetchUnauthAccount = async () => {
    setLoading(true);
    try {
      const response = await GetUnAuthorizeShareAccount();
      console.log(response.data);
      setLoading(false);
      setdata(response.data.result);
    } catch (error) {
      setLoading(false);
      AlertFailure();
    }
  };

  useEffect(async () => {
    await fetchUnauthAccount();
  }, []);

  return (
    <Layout
      heading="Authorize Share Account"
      title="Shares > authorize-share-account"
    >
      {loading ? (
        "Loading"
      ) : (
        <Table data={data} columns={columns} click={clickToAuthorize} />
      )}
    </Layout>
  );
}
