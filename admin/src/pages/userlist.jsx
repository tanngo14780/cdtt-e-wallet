import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

export default function Userlist() {
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editingObjectId, setEditingObjectId] = useState(null);
  const [editingusername, setEditingusername] = useState(null);
  const [editedValue, setEditedValue] = useState('');

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3002/users/');
      const resData = response.data;
      resData.forEach((data, index) => {
        data.id = index + 1;
      });
      setData(resData);
    } catch (error) {
      if (error.response.status === 500) {
        console.log("khong xac dinh");
      }
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDeleteClick = async (objectId) => {
    try {
      await axios.put(`http://localhost:3002/users/update/${objectId}`, { active: false });
    } catch (error) {
      console.error('Lỗi khi xóa dữ liệu:', error);
    }
  };

  const handleEditClick = (params) => {
    setEditingUser(params.row);
    setEditedValue(params.row.tuition)
    setEditingObjectId(params.row.objectId);
    setEditingusername(params.row.username);
  };

  const handleSaveEdit = async () => {
    // Thực hiện lưu chỉnh sửa thông tin người dùng ở đây
    // Sau khi lưu thành công, bạn có thể đặt editingUser thành null để ẩn cửa sổ popup
    console.log('Chỉnh sửa thành: ', editedValue);
    console.log('ObjectId đang chỉnh sửa: ', editingObjectId);
    console.log('username đang chỉnh sửa: ', editingusername);

    const updateData = {
      tuition : editedValue,
    }

    try {
      await axios.put(`http://localhost:3002/users/update/${editingObjectId}`, updateData,
        { headers: { "Content-Type": "application/json" } }
      );
      setEditingUser(null);
      console.log("user",editingUser)
    }
    catch (error) {
      if (error.response)
        if (error.response.status === 404) {
          console.log(error.response.send);
        }
        else {
          console.log("Khong xac dinh");
        }
    }
  }


  const columns = [
    { field: 'username', headerName: 'Họ và tên', width: 200 },
    { field: 'userId', headerName: 'Mã sinh viên', width: 200 },
    { field: 'cardID', headerName: 'Thẻ thanh toán', width: 200 },
    { field: 'balance', headerName: 'Số dư', width: 200 },
    { field: 'tuition', headerName: 'Học phí', width: 100 },
    {
      field: "action",
      headerName: "Tùy chỉnh",
      width: 150,
      renderCell: (params) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(params)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params.row.objectId)}
            color="red"
          />,
        ];
      },
    },
  ];

  return (
    <div style={{ borderRadius: '10px', height: 'auto', width: '98%', backgroundColor: 'white', padding: '15px' }}>
      <div>
        <h1>Danh sách sinh viên</h1>
      </div>
      <div style={{ textAlign: 'center' }}>
        {editingUser ? (
          <Dialog open={true} onClose={() => setEditingUser(null)}>
            <DialogTitle>Cập nhập học phí</DialogTitle>
            <DialogContent>
              <div style ={{fontSize:"1.2rem",paddingBottom:"20px"}}>
                {editingusername}
              </div>
              <input
                type="text"
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditingUser(null)} color="primary">
                Hủy bỏ
              </Button>
              <Button type='submit' onClick={handleSaveEdit} color="primary">
                Lưu
              </Button>
            </DialogActions>
          </Dialog>
        ) : (
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
        )}
      </div>
    </div>
  );
}
