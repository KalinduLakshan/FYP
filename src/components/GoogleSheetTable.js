import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoogleSheetTable = () => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const sheetId = '1PNXuAEv4e57U2JlrMRbWFPjBAX661xJfGcvFFRWvBug';
    const gid = '0';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`
                );
                const jsonData = JSON.parse(response.data.substring(47).slice(0, -2));
                const rows = jsonData.table.rows.map(row => 
                    row.c.map(cell => (cell ? cell.v : ''))
                );
                setData(rows);
            } catch (error) {
                console.error('Error fetching the Google Sheet data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [data]);

    if (data.length === 0) {
        return <div>Loading...</div>;
    }

    // Define the headers based on the given order
    const headers = [
        'Date and Time',
        'Datapath_ID',
        'Port No',
        'rx_pkts',
        'rx_bytes',
        'rx_error',
        'tx_packets',
        'tx_bytes',
        'tx_error'
    ];
    
    const rows = data.slice(1); // Assuming the first row is header row, adjust as needed

    return (
        <div>
            <h1>Ryu Flow Data</h1>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${headers.length}, 1fr)`, gap: '20px' }}>
                {headers.map((header, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                        <h2>{header}</h2>
                        <p>{rows[currentIndex] ? rows[currentIndex][index] : 'No data'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoogleSheetTable;
