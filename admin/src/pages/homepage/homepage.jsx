import './homepage.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Home() {
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    // const userdata = useSelector((state) => state.userdata);

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
    const getAllhistory = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/history/`);
          const resData = response.data;
          setData2(resData);
        } catch (error) {
          if (error.response.status === 500) {
            console.log("khong xac dinh");
          }
        }
      };
    useEffect(() => {     
        getAllhistory();
        getAllTransactions();
    }, []);
    const processDataForChart = () => {
        const monthlyData = Array.from({ length: 12 }, () => 0);

        data.forEach((transaction) => {
            const createTime = new Date(transaction.createTime.seconds * 1000);
            transaction.amount = transaction.amount /1000000;
            const month = createTime.getMonth();
            monthlyData[month] += parseInt(transaction.amount, 10);
        });

        return {
            xAxis: [{ data: Array.from({ length: 12 }, (_, i) => i + 1) }],
            series: [{ data: monthlyData }],
        };
    };
    const processDataForChart2 = () => {
        const monthlyData2 = Array.from({ length: 12 }, () => 0);

        data2.forEach((transaction2) => {
            const createTime = new Date(transaction2.Timestamp.seconds * 1000);
            transaction2.amount = transaction2.amount/1000;
            console.log(transaction2.amount)
            const month = createTime.getMonth();
            monthlyData2[month] += parseInt(transaction2.amount, 10);
        });

        return {
            xAxis: [{ data: Array.from({ length: 12 }, (_, i) => i + 1) }],
            series: [{ data: monthlyData2 }],
        };
    };

    return (
        <div style={{ borderRadius: '10px', height: 'auto', width: '98%', backgroundColor: 'white', padding: '15px' }}>
            <div><h1>Thống kê</h1></div>
            <div style={{textAlign: "center",display:"flex", flexDirection:"row",justifyContent:"center"}}>
                <div style={{ paddingLeft: "0px" , margin:" auto"}}>
                    <div>
                        <h2>Số giao dịch đã thực hiện : {data.length}</h2>
                    </div>
                    <LineChart
                        {...processDataForChart()}
                        width={500}
                        height={300}
                    />
                    <div>Giao dich (đơn vị: triệu)</div>
                </div>
                <div style={{ paddingLeft: "0px" , margin:" auto"}}>
                <div>
                        <h2>Số hoạt động đã thực hiện : {data2.length}</h2>
                    </div>
                    <LineChart
                        {...processDataForChart2()}
                        width={500}
                        height={300}
                    />
                    <div>Hoạt động (đơn vị: nghìn)</div>
                </div>
            </div>
        </div>
    );
}
