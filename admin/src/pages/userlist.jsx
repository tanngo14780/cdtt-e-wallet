import * as React from 'react';
import { DataGrid, } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Họ và tên', width: 200,  },
    { field: 'studentid', headerName: 'Mã sinh viên', width: 200 },
    {
      field: 'paymentcard',
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
              <Link to={"/order/" + params.row.studentid}>
                <button className="orderListEdit">Edit</button>
              </Link>
            </>
          );
        },
      },
  ];

const rows = [
  { id: 1, name: 'Snow', studentid: '11203502', balance: 3000000, paymentcard:'dhfjkdsaflajkfdlfal', tuition:"no hoc phi" },
  { id: 2, name: 'Lannister', studentid: 'Cersei', balance: 42, paymentcard: 'sdklasl12e21', tuition:"no hoc phi" },
  { id: 3, name: 'Lannister', studentid: 'Jaime', balance: 45, paymentcard: 'sdklasl12e21', tuition:"no hoc phi" },
  { id: 4, name: 'Stark', studentid: 'Arya', balance: 16, paymentcard: 'sdklasl12e21', tuition:"no hoc phi" },
  { id: 5, name: 'Targaryen', studentid: 'Daenerys', balance: 10, paymentcard: 'sdklasl12e21', tuition:"no hoc phi" },
  { id: 6, name: 'Melisandre', studentid: 'abc', balance: 150, paymentcard: 'sdklasl12e21', tuition:"no hoc phi" },
  { id: 7, name: 'Clifford', studentid: 'Ferrara', balance: 44 , paymentcard: 'sdklasl12e21', tuition:"no hoc phi"},
  { id: 8, name: 'Frances', studentid: 'Rossini', balance: 36, paymentcard: 'sdklasl12e21', tuition:"no hoc phi" },
  { id: 9, name: 'Roxie', studentid: 'Harvey', balance: 65, paymentcard: 'sdklasl12e21', tuition:"no hoc phi" },
  { id: 10, name: 'Roxasie', studentid: 'Harvey', balance: 65,paymentcard: 'sdklasl12e21', tuition:"no hoc phi" },
  { id: 11, name: 'Frasadasnces', studentid: 'Rossini', balance: 36, paymentcard: 'sdklasl12e21', tuition:"no hoc phi" },
];


export default function Userlist() {
  return (
    <div style={{borderRadius:'10px', height: 'auto', width: '98%', backgroundColor:'white',padding:'15px' }}>
        <div>
            <h1>Danh sách sinh viên</h1>
        </div>
        <div style={{textAlign:'center'}}>
            <DataGrid
            rows={rows}
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