import React, { useEffect, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { AddCircle, Delete, Edit } from "@mui/icons-material";
import {
  editEstablishment,
  removeEstablishment,
  setAddEstablishment,
} from "../../../store/slices/admin/establishmentAdminSlice";
import { useDispatch, useSelector } from "react-redux";

const EstablishmentManagement = () => {
  const dispatch = useDispatch();
  const { establishments: establishmentsTemp } = useSelector(
    (state) => state.establishmentAdmin,
  );

  const [establishments, setEstablishments] = useState([...establishmentsTemp]);

  const columns = [
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <IconButton
                onClick={() => handleUpdateEstablishment(tableMeta.rowData[1])}
              >
                <Edit />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteEstablishment(tableMeta.rowData[1])}
              >
                <Delete />
              </IconButton>
            </>
          );
        },
      },
    },
    {
      name: "id",
      label: "ID",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "about",
      label: "About",
    },
    {
      name: "addressLine1",
      label: "Address Line 1",
    },
    {
      name: "addressLine2",
      label: "Address Line 2",
    },
    {
      name: "area",
      label: "Area",
    },
    {
      name: "state",
      label: "State",
    },
    {
      name: "postalCode",
      label: "Postal Code",
    },
    {
      name: "country",
      label: "Country",
    },
  ];

  const options = {
    selectableRows: "none",
    responsive: "standard",
    rowsPerPageOptions: [5, 10, 15],
    toolbar: true,
    customToolbar: () => {
      return (
        <IconButton onClick={handleAddButtonClick}>
          <AddCircle />
        </IconButton>
      );
    },
    headCells: {
      style: {
        textAlign: "left",
      },
    },
  };

  const handleAddButtonClick = () => {
    dispatch(setAddEstablishment({ addEst: true }));
  };

  const handleUpdateEstablishment = (establishmentId) => {
    // Update Establishment logic
    dispatch(editEstablishment({ editEstablishmentId: establishmentId }));
  };

  const handleDeleteEstablishment = (establishmentId) => {
    // Delete Establishment logic
    dispatch(removeEstablishment({ id: establishmentId }));
  };

  useEffect(() => {
    setEstablishments([...establishmentsTemp]);
  }, [establishmentsTemp]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MUIDataTable
          title={""}
          data={establishments}
          columns={columns}
          options={options}
          className={"admin-table"}
        />
      </Grid>
    </Grid>
  );
};

export default EstablishmentManagement;
