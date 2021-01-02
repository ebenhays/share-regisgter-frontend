import React from "react";
import DataTable from "react-data-table-component";
import swal from "sweetalert";
export const Input = ({ ...props }) => {
  return <input {...props} />;
};
export const Button = (props) => {
  return <button {...props}>{props.children}</button>;
};

export const SelectOptions = (props) => {
  return <select {...props}>{props.children}</select>;
};

export const Table = (props) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <i className="fas fa-table mr-1"></i>
        {props.tableHeading}
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <DataTable
            center={true}
            title={props.title}
            columns={props.columns}
            data={props.data}
            striped={true}
            highlightOnHover={true}
            pointerOnHover={true}
            responsive
            onRowClicked={props.click}
            pagination={true}
            paginationRowsPerPageOptions={[10, 20, 50, 100]}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export const AlertSuccess = (data) => {
  swal("Success!", data, "success");
};

export const AlertFailure = () => {
  swal("Oops!", "Something went wrong.", "error");
};

export const AlertDialog = (text, callback) => {
  swal({
    title: "Are you sure?",
    text: text,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((answerYes) => {
    if (answerYes) {
      callback();
    } else {
      return;
    }
  });
};
