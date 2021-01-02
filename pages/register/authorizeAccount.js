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
    { name: "#", selector: "id" },
    { name: "CustomerNo", selector: "customerNo" },
    { name: "Account No", selector: "accountNumber", sortable: true },
    { name: "FullName", selector: "fullName", sortable: true, wrap: true },
    { name: "CreatedBy", selector: "createdBy" },
    { name: "CreatedAt", selector: "createdAt" },
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
        <Table
          title="Authorize Share Account"
          data={data}
          columns={columns}
          click={(row) => clickToAuthorize(row)}
        />
      )}
    </Layout>
  );
}
