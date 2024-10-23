import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import {Box, Button, Grid, Paper, TextField, Typography} from "@mui/material";

// Реєструємо необхідні компоненти Chart.js для версії 4
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UniformMotionChart = () => {
  const [initialVelocity, setInitialVelocity] = useState(0); // Початкова швидкість (м/с)
  const [acceleration, setAcceleration] = useState(0); // Прискорення (м/с²)
  const [time, setTime] = useState(10); // Час (с)

  // Функція для обчислення значень графіка
  const calculatePositionData = () => {
    const dataPoints = [];
    for (let t = 0; t <= time; t += 1) {
      const position = initialVelocity * t + 0.5 * acceleration * t ** 2; // Формула рівнозмінного руху
      dataPoints.push({ t, position });
    }
    return dataPoints;
  };

  const data = {
    labels: Array.from({ length: time + 1 }, (_, index) => index), // Масив часу (секунди)
    datasets: [
      {
        label: 'Позиція (м)',
        data: calculatePositionData().map((point) => point.position),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Графік рівнозмінного руху',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Час (с)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Позиція (м)',
        },
      },
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Графік рівнозмінного руху
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Початкова швидкість (м/с)"
              type="number"
              value={initialVelocity}
              onChange={(e) => setInitialVelocity(Number(e.target.value))}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Прискорення (м/с²)"
              type="number"
              value={acceleration}
              onChange={(e) => setAcceleration(Number(e.target.value))}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Час (с)"
              type="number"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => calculatePositionData()}
            >
              Застосувати
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box height={700} width={700}>
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};

export default UniformMotionChart;
