import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'CPU Usage',
    },
  },
  scales: {
    x: {
      min: 0,
      max: 58,
    },
  },
};

const colors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
];

const Dashboard = () => {
  const [swData, setSwData] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      labels: Array.from({ length: 60 }, (_, j) => j + 1),
      datasets: [
        {
          label: `SW${i + 1}`,
          data: Array(60).fill(0),
          borderColor: colors[i % colors.length],
          backgroundColor: 'rgba(0, 0, 0, 0)', // Set background color to transparent
        },
      ],
    }))
  );

  const [googleSheetData, setGoogleSheetData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0); // Tab state for left-side vertical tabs

  const sheetId = '1PNXuAEv4e57U2JlrMRbWFPjBAX661xJfGcvFFRWvBug';
  const gid = '0';

  // Fetch Google Sheets data
  useEffect(() => {
    const fetchGoogleSheetData = async () => {
      try {
        const response = await axios.get(
          `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`
        );
        const jsonData = JSON.parse(response.data.substring(47).slice(0, -2));
        const rows = jsonData.table.rows.map(row => row.c.map(cell => (cell ? cell.v : '')));
        setGoogleSheetData(rows);
      } catch (error) {
        console.error('Error fetching Google Sheet data:', error);
      }
    };

    fetchGoogleSheetData();
  }, []);

  useEffect(() => {
    if (googleSheetData.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % (googleSheetData.length - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [googleSheetData]);

  if (googleSheetData.length === 0) {
    return <div>Loading...</div>;
  }

  // Map the dynamic data from the Google Sheet
  const dynamicData = {
    dateAndTime: googleSheetData[currentIndex + 1][0],
    datapathId: googleSheetData[currentIndex + 1][1],
    portNo: googleSheetData[currentIndex + 1][2],
    rxPkts: googleSheetData[currentIndex + 1][3],
    rxBytes: googleSheetData[currentIndex + 1][4],
    rxError: googleSheetData[currentIndex + 1][5],
    txPkts: googleSheetData[currentIndex + 1][6],
    txBytes: googleSheetData[currentIndex + 1][7],
    txError: googleSheetData[currentIndex + 1][8],
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabItems = [
    'Dashboard',
    'Settings',
    'Statistics',
    'Logs',
    'About',
  ];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left-side vertical tab bar */}
      <Paper
        style={{
          width: 240,
          height: '100%',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
        elevation={3} // Adding elevation for modern look
      >
        <Tabs
          orientation="vertical"
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          style={{
            borderRight: '1px solid #ddd',
            padding: '8px 0',
          }}
        >
          {tabItems.map((item, index) => (
            <Tab
              label={item}
              key={index}
              style={{
                textTransform: 'none',
                padding: '12px 16px',
                marginBottom: '8px',
                backgroundColor: selectedTab === index ? '#f0f0f0' : '#fff',
                boxShadow: selectedTab === index ? '0px 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
                borderRadius: '8px',
                transition: 'background-color 0.3s ease',
              }}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Main content area */}
      <div style={{ flex: 1, padding: 24 }}>
        <Paper style={{ padding: 16, height: '60%', width: '100%' }}>
          <Typography variant="h4" gutterBottom>Current CPU Load</Typography>
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <img src="https://www.example.com/image" alt="Middle Chart" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </Box>
        </Paper>

        <div style={{ padding: 16, marginTop: 16 }}>
          <Grid container spacing={2}>
            {[
              { label: 'Date and Time', value: dynamicData.dateAndTime },
              { label: 'Datapath ID', value: dynamicData.datapathId },
              { label: 'Port No', value: dynamicData.portNo },
              { label: 'Rx Packets', value: dynamicData.rxPkts },
              { label: 'Rx Bytes', value: dynamicData.rxBytes },
              { label: 'Rx Errors', value: dynamicData.rxError },
              { label: 'Tx Packets', value: dynamicData.txPkts },
              { label: 'Tx Bytes', value: dynamicData.txBytes },
              { label: 'Tx Errors', value: dynamicData.txError },
            ].map(({ label, value }) => (
              <Grid item xs={4} key={label}>
                <Paper style={{ padding: 8 }}>
                  <Typography variant="body1" style={{ fontSize: '0.9rem', color: '#666' }}>
                    {label}
                  </Typography>
                  <Typography variant="h6" style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                    {value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      {/* Right-side options area */}
      <Paper style={{ width: 240, padding: 16, height: '100%', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" gutterBottom>Options</Typography>
        {selectedTab === 0 && <Typography variant="body1">Dashboard options</Typography>}
        {selectedTab === 1 && <Typography variant="body1">Settings options</Typography>}
        {selectedTab === 2 && <Typography variant="body1">Statistics options</Typography>}
        {selectedTab === 3 && <Typography variant="body1">Logs options</Typography>}
        {selectedTab === 4 && <Typography variant="body1">About options</Typography>}
      </Paper>
    </div>
  );
};

export default Dashboard;
