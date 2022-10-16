import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUserStart, updateUserStart } from "../redux/actions";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  status: "",
};

const options = [
  {
    label: "Active",
  },
  {
    label: "Inactive",
  },
];

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { users, error } = useSelector(state => state.users);
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { name, email, phone, address, status } = formValue;

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUser = users.find(item => item.id === Number(id));
      setFormValue({ ...singleUser });
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id, users]);

  const handleSubmit = e => {
    e.preventDefault();

    if (name && email && phone && address && status) {
      // editMode === false
      if (!editMode) {
        dispatch(createUserStart(formValue));

        if (!error) {
          toast.success("User Added Successfully");
          setTimeout(() => navigate("/"), 500);
        }

        if (error) {
          toast.error("Something went wrong");
        }
      } else {
        dispatch(updateUserStart({ id, formValue }));

        if (!error) {
          setEditMode(false);
          toast.success("User Updated Successfully");
          setTimeout(() => navigate("/"), 500);
        }

        if (error) {
          toast.error("Something went wrong");
        }
      }
    }
  };

  const onInputChange = e => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onDropdownChange = e => {
    setFormValue({ ...formValue, status: e.target.value });
  };

  return (
    <MDBValidation className="row g-3" style={{ marginTop: "100px" }} noValidate onSubmit={handleSubmit}>
      <p className="fs-2 fw-bold">{!editMode ? "Add User Detail" : "Update User Detail"}</p>

      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={name || ""}
          name="name"
          type="text"
          onChange={onInputChange}
          required
          label="Name"
          validation="Please provide a name"
          invalid
        />

        <br />

        <MDBInput
          value={email || ""}
          name="email"
          type="email"
          onChange={onInputChange}
          required
          label="Email"
          validation="Please provide an email"
          invalid
        />
        <br />
        <MDBInput
          value={phone || ""}
          name="phone"
          type="number"
          onChange={onInputChange}
          required
          label="Phone"
          validation="Please provide a phone no."
          invalid
        />
        <br />
        <MDBInput
          value={address || ""}
          name="address"
          type="text"
          onChange={onInputChange}
          required
          label="Address"
          validation="Please provide an address"
          invalid
        />
        <br />

        <select style={{ width: "100%", borderRadius: "5px", height: "35px" }} onChange={onDropdownChange}>
          <option>Please Select Status</option>
          {options.map((option, i) => (
            // One of the label is equal to status
            // The pre-selected option will be displayed first in the drop-down list
            <option value={option.label || ""} selected={option.label === status} key={"status" + i}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="col-12">
          <MDBBtn style={{ marginRight: "10px", marginTop: "20px" }} type="submit">
            {!editMode ? "Add" : "Update"}
          </MDBBtn>

          <MDBBtn onClick={() => navigate("/")} color="danger">
            Go Back
          </MDBBtn>
        </div>
      </div>
    </MDBValidation>
  );
};

export default AddEditUser;
