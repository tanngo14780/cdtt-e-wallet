import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid, } from '@mui/x-data-grid';

const columns = [
  { field: 'createID', headerName: 'Người gửi', width: 250, },
  { field: 'receiveID', headerName: 'Người nhận', width: 150 },
  {
    field: 'type',
    headerName: 'Loại giao dịch',
    width: 120,
  },
  {
    field: "createTime",
    headerName: "Ngày thực hiện",
    width: 200,
    type:'date',
    valueGetter: (params) => {
      const timestamp = params.row.createTime.seconds; // Giả sử dữ liệu timestamp ở đây
      const date = new Date(timestamp * 1000); // Chuyển đổi timestamp thành đối tượng Date
      return date;
    },
    renderCell: (params) => {
      const formattedDate = params.value.toLocaleString(); // Định dạng ngày tháng
      return formattedDate;
    },
  },
  { 
    field: 'amount',
    headerName: 'Số tiền',
    type: 'number',
    headerAlign: "left",
    align: "left",
    width: 150,
  },
];

  

export default function Transactionlist() {

  const [data, setData] = useState([])
  const userdata = useSelector((state) => state.userdata);

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3002/transactions/');
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
        <h1>Lịch sử giao dịch</h1>
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
                  field: 'createTime',
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