import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomId,
} from '@mui/x-data-grid-generator';




export default function Service() {
    const [data, setData] = useState([]);
    const [editingService, setEditingService] = useState(null);
    const [addingService, setAddingService] = useState(false);
    const [editingObjectId, setEditingObjectId] = useState(null);
    const [editingserviceName, setEditingserviceName] = useState(null);
    const [editedValue, setEditedValue] = useState('');
    const [addService, setaddService] = useState('');

    const getAllServices = async () => {
        try {
            const response = await axios.get('http://localhost:3002/services/');
            const resData = response.data;
            setData(resData);
        } catch (error) {
            if (error.response.status === 500) {
                console.log("khong xac dinh");
            }
        }
    };
    useEffect(() => {
        getAllServices();
        if (data && data.length > 0) {
            const updatedData = data.map(item => ({
                ...item,
                key: item.objectId, // Sử dụng objectId làm key
            }));
            setData(updatedData);
        }
    }, []);

    const columns = [
        { field: 'serviceName', headerName: 'Dịch vụ', width: 200 },
        {
            field: 'amount',
            headerName: 'Giá',
            type: 'number',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
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

    const handleEditClick = (params) => {
        setEditingService(params.row);
        setEditedValue(params.row.amount)
        setEditingObjectId(params.row.objectId);
        setEditingserviceName(params.row.serviceName);
    };
    const handleSaveEdit = async () => {
        // Thực hiện lưu chỉnh sửa thông tin người dùng ở đây
        // Sau khi lưu thành công, bạn có thể đặt editingUser thành null để ẩn cửa sổ popup
        console.log('Chỉnh sửa thành: ', editedValue);
        console.log('ObjectId đang chỉnh sửa: ', editingObjectId);
        console.log('Service đang chỉnh sửa: ', editingserviceName);

        const updateData = {
            amount: editedValue,
        }
        try {
            await axios.put(`http://localhost:3002/services/update/${editingObjectId}`, updateData,
                { headers: { "Content-Type": "application/json" } }
            );
            setEditingService(null);
            console.log("service", editingService)
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
        window.location.reload()
    }

    const handleAddClick = () => {
        setAddingService(true);
        setEditingserviceName(''); // Đặt giá trị mặc định cho tên dịch vụ
        setEditedValue('');
    };
    const handleSaveAdd = async () => {
        const form = {
            serviceName: addService,
            amount: editedValue,
        }
        try {
            console.log(form);
            await axios.post("http://localhost:3002/services/create", form, {
                headers: { "Content-Type ": "application/json" }
            })
            setAddingService(false);
        }
        catch (error) {
            if (error.response && error.response.status === 500)
                console.log(error.response);
        }
        window.location.reload()
    };

    const handleCloseDialog = () => {
        if (editingService) {
            setEditingService(null);
        }
        else {
            setAddingService(false);
        }
    };

    const handleDeleteClick = async (objectId) => {
        try {
            await axios.delete(`http://localhost:3002/services/delete/${objectId}`);
            const updatedData = data.filter((item) => item.objectId !== objectId);
            setData(updatedData);
        } catch (error) {
            console.error('Lỗi khi xóa dữ liệu:', error);
        }
    };

    return (
        <div style={{ width: "50%", display: 'flex', flexDirection: "column", background: 'white', borderRadius: '10px', padding: '10px' }}>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddClick}
            >
                Thêm dịch vụ
            </Button>

            {editingService ? (
                <Dialog open={true} onClose={handleCloseDialog}>
                    <DialogTitle>Cập nhật giá</DialogTitle>
                    <DialogContent>
                        <div style={{ fontSize: "1.2rem", paddingBottom: "20px" }}>
                            {editingserviceName}
                        </div>
                        <TextField
                            label="Giá"
                            type="number"
                            fullWidth
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Hủy bỏ
                        </Button>
                        <Button onClick={handleSaveEdit} color="primary">
                            Lưu
                        </Button>
                    </DialogActions>
                </Dialog>
            ) : null}

            {addingService ? (
                <Dialog open={true} onClose={handleCloseDialog}>
                    <DialogTitle>Thêm dịch vụ mới</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Dịch vụ"
                            fullWidth
                            value={addService}
                            onChange={(e) => setaddService(e.target.value)}
                        />
                        <TextField
                            label="Giá"
                            type="number"
                            fullWidth
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Hủy bỏ
                        </Button>
                        <Button onClick={handleSaveAdd} color="primary">
                            Lưu
                        </Button>
                    </DialogActions>
                </Dialog>
            ) : null}

            <Box
                sx={{
                    height: 400,
                    width: '100%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                }}
            >
                <DataGrid
                    rows={data}
                    columns={columns}
                    getRowId={(row) => row.objectId}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </Box>
        </div>
    );
}