import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid, } from '@mui/x-data-grid';

const columns = [
  { field: 'userId', headerName: 'Người dùng', width: 250, },
  {
    field: 'type',
    headerName: 'Dịch vụ',
    width: 120,
  },
  {
    field: 'amount',
    headerName: 'Số tiền',
    type: 'number',
    headerAlign: "left",
    align: "left",
    width: 150,
  },
  {
    field: "Timestamp",
    headerName: "Thời gian thực hiện",
    width: 250,
    type:'date',
    valueGetter: (params) => {
      const timestamp = params.row.Timestamp.seconds; // Giả sử dữ liệu timestamp ở đây
      const date = new Date(timestamp * 1000); // Chuyển đổi timestamp thành đối tượng Date
      return date;
    },
    renderCell: (params) => {
      const formattedDate = params.value.toLocaleString(); // Định dạng ngày tháng
      return formattedDate;
    },
  },
  
];



export default function UserActivities() {

  const [data, setData] = useState([])
  const userdata = useSelector((state) => state.userdata);

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/history/`);
        const resData = response.data;
        setData(resData);
      } catch (error) {
        if (error.response.status === 500) {
          console.log("khong xac dinh");
        }
      }
    };
    getAllTransactions();
  }, []);

  return (
    <div style={{ borderRadius: '10px', height: 'auto', width: '98%', backgroundColor: 'white', padding: '15px' }}>
      <div>
        <h1>Lịch sử hoạt động</h1>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.objectId}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            sorting: {
              ...data.initialState?.sorting,
              sortModel: [
                {
                  field: 'Timestamp',
                  sort: 'desc',
                },
              ],
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
      <div>

      </div>
    </div>
  );
}