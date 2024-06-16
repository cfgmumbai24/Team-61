import React from 'react';
import { PieChart, Pie, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Admin = () => {
  // Dummy data
  const healthData = [
    { name: 'Healthy', value: 50, fill: '#77dd77' }, // green
    { name: 'Mild', value: 30, fill: '#ffb347' },    // yellow
    { name: 'Severe', value: 20, fill: '#ff6961' }
  ];

  const genderData = [
    { name: 'Female', value: 75, fill: '#ffb6c1' },    // pink
    { name: 'Male', value: 25, fill: '#aec6cf' }
  ];

  const weightData = [
    { name: 'Jan', Goat1: 50, Goat2: 45 },
    { name: 'Feb', Goat1: 55, Goat2: 50 },
    { name: 'Mar', Goat1: 60, Goat2: 52 },
  ];

  const ageData = [
    { name: '0-1', value: 10 },
    { name: '1-2', value: 20 },
    { name: '2-3', value: 30 },
    { name: '3-4', value: 15 },
  ];

  const pregnancyData = [
    { name: 'Pregnant', value: 25,  fill:"#aec6cf"},
    { name: 'Not Pregnant', value: 75, fill:"#ffcc80" },
  ];

  const paravatData = [
    { name: 'Paravat 1', Assignments: 10, Completed: 8 },
    { name: 'Paravat 2', Assignments: 15, Completed: 10 },
    { name: 'Paravat 3', Assignments: 12, Completed: 12 },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ width: '300px', height: '300px'}}>
        <h4>Health Status of Goats</h4>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={healthData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '300px', height: '300px', flexGrow: '1' }}>
        <h4>Gender Distribution of Goats</h4>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    
      <div style={{ width: '300px', height: '300px'}}>
        <h4>Pregnancy Status of Goats</h4>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={pregnancyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#ffc658" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div  style={{ width: '100px', height: '300px'}}>

      </div>
      

      <div style={{ width: '400px', height: '300px', margin: '10px',  marginTop: '-10px' }}>
        <h4>Goat Age Distribution</h4>
        <ResponsiveContainer>
          <BarChart data={ageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      

      <div style={{ width: '700px', height: '300px', margin: '10px',  marginTop: '-10px' }}>
        <h4>Para-vet Assignments</h4>
        <ResponsiveContainer>
          <BarChart data={paravatData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Assignments" fill="#8884d8" />
            <Bar dataKey="Completed" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Admin;
