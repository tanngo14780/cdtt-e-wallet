import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { DataGrid, } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';


const handleDeleteClick = (params)=>{
  console.log(params);
}


export default function Userlist() {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState(data);
  const token = useSelector((state) => state.token);

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3002/users/'
        // ,{
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      );
      const resData = response.data;
      resData.forEach((data, index) => {
        data.id = index + 1;
      });
      setData(resData);
      console.log(data);
    }
    catch (error) {
      if (error.response.status === 500)
        console.log("asda");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'username', headerName: 'Họ và tên', width: 200, },
    { field: 'userId', headerName: 'Mã sinh viên', width: 200 },
    {
      field: 'cardID',
      headerName: 'Thẻ thanh toán',
      width: 200,
    },
    {
      field: 'balance',
      headerName: 'Số dư',
      type: 'number',
      width: 200,
    },
    {
      field: 'tuition',
      headerName: 'Học phí',
      width: 100,
    },
    {
      field: "action",
      headerName: "Tùy chỉnh",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/users/" + params.row.userId}>
              <Button color="primary" startIcon={<EditIcon/>} >                
              </Button>
            </Link>
            <Button startIcon={<DeleteIcon/>} onclick={handleDeleteClick(params)}></Button>
          </>
        );
      },
    },
  ];

  return (
    <div style={{ borderRadius: '10px', height: 'auto', width: '98%', backgroundColor: 'white', padding: '15px' }}>
      <div>
        <h1>Danh sách sinh viên</h1>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}