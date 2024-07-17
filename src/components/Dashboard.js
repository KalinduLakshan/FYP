import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
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

const generateRandomData = (length) => Array.from({ length }, () => Math.floor(Math.random() * 100));

const initialData = {
  labels: Array.from({ length: 60 }, (_, i) => i + 1),
  datasets: [
    {
      label: '% Utilization',
      data: generateRandomData(60),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
};

const colors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];

const Dashboard = () => {
  const [cpuData, setCpuData] = useState(initialData);
  const [swData, setSwData] = useState(
    Array.from({ length: 6 }, (_, i) => ({
      labels: Array.from({ length: 60 }, (_, j) => j + 1),
      datasets: [
        {
          label: `SW${i + 1}`,
          data: generateRandomData(60),
          borderColor: colors[i % colors.length],
          backgroundColor: 'rgba(0, 0, 0, 0)', // Set background color to transparent
        },
      ],
    }))
  );

  const [dynamicData, setDynamicData] = useState({
    utilization: 9,
    speed: 1.58,
    processes: 234,
    threads: 2904,
    handles: 102994,
    uptime: '8:23:00:08',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = Math.floor(Math.random() * 100);

      // Update CPU data
      setCpuData((prevData) => {
        const updatedData = [...prevData.datasets[0].data.slice(1), newData];
        return {
          labels: Array.from({ length: 60 }, (_, i) => i + 1),
          datasets: [
            {
              label: '% Utilization',
              data: updatedData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        };
      });

      // Update switch data
      setSwData((prevData) =>
        prevData.map((sw, index) => ({
          ...sw,
          datasets: [
            {
              ...sw.datasets[0],
              data: [...sw.datasets[0].data.slice(1), newData],
            },
          ],
        }))
      );

      // Update dynamic data
      setDynamicData((prevData) => ({
        ...prevData,
        utilization: Math.floor(Math.random() * 100),
        speed: (Math.random() * 2 + 1).toFixed(2),
        processes: Math.floor(Math.random() * 1000),
        threads: Math.floor(Math.random() * 5000),
        handles: Math.floor(Math.random() * 200000),
        uptime: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 24, display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <div style={{ width: '20%', marginRight: '2%', height: '100%', overflowY: 'scroll' }}>
        {swData.map((sw, num) => (
          <Paper
            key={num}
            style={{
              padding: 16,
              marginBottom: 16,
              height: 150,
              transition: 'transform 0.3s',
              zIndex: 1,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Typography variant="h6">{`SW${num + 1}`}</Typography>
            <Line options={options} data={sw} />
          </Paper>
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Paper style={{ padding: 16, height: '60%', width: '100%' }}>
          <Typography variant="h4" gutterBottom>Current CPU Load</Typography>
          <Line options={options} data={cpuData} />
        </Paper>
        <div style={{ padding: 16, marginTop: 16 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="subtitle2" style={{ color: 'gray' }}>Utilization</Typography>
              <Typography variant="body1">{dynamicData.utilization}%</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" style={{ color: 'gray' }}>Speed</Typography>
              <Typography variant="body1">{dynamicData.speed} GHz</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" style={{ color: 'gray' }}>Processes</Typography>
              <Typography variant="body1">{dynamicData.processes}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" style={{ color: 'gray' }}>Threads</Typography>
              <Typography variant="body1">{dynamicData.threads}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" style={{ color: 'gray' }}>Handles</Typography>
              <Typography variant="body1">{dynamicData.handles}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" style={{ color: 'gray' }}>Up time</Typography>
              <Typography variant="body1">{dynamicData.uptime}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" style={{ color: 'gray' }}>Base speed</Typography>
              <Typography variant="body1">1.80 GHz</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" style={{ color: 'gray' }}>Sockets</Typography>
              <Typography variant="body1">1</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" style={{ color: 'gray' }}>Cores</Typography>
              <Typography variant="body1">4</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" style={{ color: 'gray' }}>Logical processors</Typography>
              <Typography variant="body1">8</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" style={{ color: 'gray' }}>Virtualization</Typography>
              <Typography variant="body1">Enabled</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" style={{ color: 'gray' }}>L1 cache</Typography>
              <Typography variant="body1">256 KB</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" style={{ color: 'gray' }}>L2 cache</Typography>
              <Typography variant="body1">1.0 MB</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" style={{ color: 'gray' }}>L3 cache</Typography>
              <Typography variant="body1">6.0 MB</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
