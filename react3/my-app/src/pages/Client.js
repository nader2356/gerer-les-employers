/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  gridClasses,
  GridToolbarContainer,
  GridRowModes,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import PropTypes from "prop-types";
import  { API } from "../utils/constant"
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useValue } from "../contextProvider/ContextProvider";
import { AddClient, deleteClient, updateClient } from "../actions/user";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { grey } from "@mui/material/colors";

import fetchData from "../utils/FetchData";
import { getToken } from "../utils/helpers";
const Users = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const [Id, setId] = useState(null);
  const [Ids, setIds] = useState(null);
  const url = `${API}/clients`;
  const {
    dispatch,
    state: {  users },
  } = useValue();
  const token = getToken();

  useEffect(() => {
    
    const config = {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    };
    axios.get(`${API}/clients`,config).then((response) => {
      let datas = response.data.data;
      const users = datas.map((x) => {
        return { id: x.id, ...x.attributes };
      });
      console.log(users)
      setRows(users);
    });
  
    
  }, []);

  const columns = [
    {
      field: "raisonSociale",
      headerName: "raisonSociale",
      width: 200,
      sortable: true,
      editable: true,
      filterable: true,
    },

    {
      field: "fax",
      headerName: "Fax",
      width: 200,
      editable: true,
      sortable: true,
      filterable: true,
    },

    {
      field: "telephone",
      headerName: "Telephone",
      width: 200,
      sortable: true,
      editable: true,
      filterable: true,
    },

    {
      field: "adresse",
      headerName: "adresse",
      width: 170,
      sortable: true,
      editable: true,
      filterable: true,
    },

    {
      field: "email",
      editable: true,
      headerName: "Email",
      width: 200,
      sortable: true,
      filterable: true,
    },

    {
      field: "bureau",
      headerName: "Bureau",
      width: 100,
      sortable: true,
      filterable: true,
      type: "singleSelect",
      valueOptions: ["Tunis", "Sousse", "Kef"],
      editable: true,
    },
    {
      headerName: "activitePrincipale",
      field: "activitePrincipale",
      width: 200,
      editable: true,
      sortable: true,
      filterable: true,
    },

    {
      headerName: "MatriculeFiscale",
      field: "matriculeFiscal",
      width: 200,
      editable: true,
      sortable: true,
      filterable: true,
    },

    {
      headerName: "nRegistreDeCommerce",
      field: "numeroRegistreDeCommerce",
      width: 200,
      editable: true,
      sortable: true,
      filterable: true,
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      renderCell: (params) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(params)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(params)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(params)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(params)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const Id = rows.length -1 ;
      const Rows = rows[Id].id + 1 ;
      setRows((oldRows) => [...oldRows, {id : Rows }]);
      setId(Rows)
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [Rows]: { mode: GridRowModes.Edit, fieldToFocus: "MatriculeFiscale" },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }


  EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow  };
    const AddRow = { ...newRow };
    delete AddRow.id

    if (newRow.id === Id ) {
      AddClient({ data: AddRow }, dispatch);
      setId(null)
    } else {       
      updateClient({ data: updatedRow }, Ids, dispatch,token);
    } 

    return updatedRow;
  };

  const handleDeleteClick = (params) => () => {
    
    deleteClient(params, dispatch);
    setRows(rows.filter((row) => row.id !== params.id));
  };

  const handleCancelClick = (params) => () => {
    setRowModesModel({
      ...rowModesModel,
      [params.id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === params.id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== params.id));
    }
  };

  const handleEditClick = (params) => () => {
    setRowModesModel({
      ...rowModesModel,
      [params.id]: { mode: GridRowModes.Edit },
    });   
  };

  const handleSaveClick = (params) => () => {
    setRowModesModel({...rowModesModel,[params.id]: { mode: GridRowModes.View },
    });
    setIds(params.id)
  };

  const [rowModesModel, setRowModesModel] = useState({});

  return (
    <Box
      sx={{
        height: 650,
        width: "97%",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        List des  Clients
      </Typography>
      <DataGrid
        columns={columns}
        rows={rows}
        components={{
          Toolbar: EditToolbar,
        }}
        editMode="row"
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={processRowUpdate}
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? grey[200] : grey[900],
          },
          ml: 6,
          mt:8
        }}
      />
    </Box>
  );
};

export default Users;
