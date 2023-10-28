import * as React from 'react';
import { DataGrid, } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const columns = [
    { field: 'id', headerName: 'ID', width: 50,  },
    { field: 'name', headerName: 'Họ và tên', width: 250,  },
    { field: 'userId', headerName: 'Mã sinh viên', width: 150 },
    {
      field: 'paymentcard',
      headerName: 'Thẻ thanh toán',
      width: 200,
    },    
    {
        field: 'type',
        headerName: 'Loại giao dịch',
        width: 120,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
    },
    {
      field: 'amount',
      headerName: 'giao dịch',
      type: 'number',
      width: 150,
  },
  ];

const rows = [
  { id: 1, name: 'Snow', userId: '11203502', paymentcard:'dhfjkdsaflajkfdlfal', amount:'12000',type:'nạp tiền',date:'2002/12/1' },
  { id: 2, name: 'Snow', studentid: '11203502', paymentcard:'dhfjkdsaflajkfdlfal', amount:'12000',type:'nạp tiền',date:'2002/12/1' },
  { id: 3, name: 'Snow', studentid: '11203502', paymentcard:'dhfjkdsaflajkfdlfal', amount:'12000',type:'nạp tiền',date:'2002/12/1' },
  { id: 4, name: 'Snow', studentid: '11203502', paymentcard:'dhfjkdsaflajkfdlfal', amount:'12000',type:'nạp tiền',date:'2002/12/1' },
  { id: 5, name: 'Snow', studentid: '11203502', paymentcard:'dhfjkdsaflajkfdlfal', amount:'12000',type:'nạp tiền',date:'2002/12/1' },
  { id: 6, name: 'Snow', studentid: '11203502', paymentcard:'dhfjkdsaflajkfdlfal', amount:'12000',type:'nạp tiền',date:'2002/12/1' },
  { id: 7, name: 'Snow', studentid: '11203502', paymentcard:'dhfjkdsaflajkfdlfal', amount:'12000',type:'nạp tiền',date:'2002/12/1' },
  { id: 8, name: 'Snow', studentid: '11203502', paymentcard:'dhfjkdsaflajkfdlfal', amount:'12000',type:'nạp tiền',date:'2002/12/1' },

];


export default function Transactionlist() {
  return (
    <div style={{ borderRadius:'10px', height: 'auto', width: '98%', backgroundColor:'white',padding:'15px' }}>
        <div>
            <h1>Lịch sử giao dịch</h1>
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
        <div>
          
        </div>
    </div>
  );
}