import { Box, Typography, useTheme, TextField, MenuItem, Button} from "@mui/material";
import { tokens } from "../theme";
import Header from "./Header";
import "../styles/pvinsight.css";
import axios from 'axios';
import { useState, useEffect } from "react";

import { useParams } from 'react-router-dom';


const StatBox = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [curr, setCurr] = useState();
  const {id} = useParams();
  const [formData, setFormData] = useState({
    beneficiaryId: '',
    startDate: '',
    endDate: '',
    recurrencePeriod: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3080/api/v1/paravat/find');
        const data = response.data;
        data.mdg.map((item)=>{
            if(item.userId === id){
              setCurr(item);
            }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3080/api/v1/visit/add', {
        // Assuming paravatId and status are static or retrieved from elsewhere in your application
        paravatId: id, // Replace with actual paravatId
        beneficiaryId: formData.beneficiaryId,
        status:'pending',
        date: formData.startDate, // Assuming the start date is the relevant date for this visit
      });
      console.log(response.data);
      // Handle success (e.g., showing a success message)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., showing an error message)
    }
  };

  return (
    <div>
      <Header title=" Paravet Insight" />
      <div className="contentbox">
        <div className="col">
          <div >
            <h2>Assign a Beneficiary</h2>
            <form className="assignform" onSubmit={handleSubmit}>
              <TextField name="beneficiaryId" label="Beneficiary ID" variant="outlined" onChange={handleChange} />
              <TextField name="startDate" label="Start Date" type="date" variant="outlined"  InputLabelProps={{ shrink: true }} onChange={handleChange}/>
              <TextField name="endDate" label="End Date" type="date" variant="outlined"  InputLabelProps={{ shrink: true }} onChange={handleChange}/>
              <TextField name="recurrencePeriod" label="Recurrence Period" select variant="outlined" onChange={handleChange}>
                <MenuItem value={2}>2 days</MenuItem>
                <MenuItem value={5}>5 days</MenuItem>
                <MenuItem value={7}>7 days</MenuItem>
              </TextField>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[300], color:colors.blueAccent[700], width:'50%', alignSelf:'center'}}>
            Submit
        </Button>
            </form>
          </div>
          <div className="stats">
            <h2>Stats</h2>
                <h3>Visits Assigned: {curr?.no_of_assignments}</h3>
                <h3>Visits Completed: {curr?.no_of_completed_assignments}</h3>
          </div>
        </div>
        <div className="right">
            <h2>Todays Schedule</h2>
        </div>
      </div>
    </div>
  );
};

export default StatBox;