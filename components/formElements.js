import DataTable from "@bit/adeoy.utils.data-table";
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
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-table mr-1"></i>
        {props.tableHeading}
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <DataTable
            data={props.data}
            columns={props.columns}
            striped={true}
            hover={true}
            responsive={true}
            onClickRow={props.click}
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
