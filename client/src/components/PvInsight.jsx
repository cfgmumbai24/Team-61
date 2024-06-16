import { Box, Typography, useTheme, TextField, MenuItem, Button, Alert } from "@mui/material";
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
    const { id } = useParams();
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
                data.mdg.map((item) => {
                    if (item.userId === id) {
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

    const [success, setSuccess] = useState(false);
    async function incrementAssignments(userId) {
        try {
          const response = await axios.patch(`http://localhost:3080/api/v1/paravat/${userId}/incrementAssignments`);
          console.log('Assignment incremented successfully:', response.data);
        } catch (error) {
          console.error('Error incrementing assignment:', error.response?.data || error.message);
        }
      }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            try {
                const formattedDate = currentDate.toISOString().split('T')[0]; // Format the date to YYYY-MM-DD
                const response = await axios.post('http://localhost:3080/api/v1/visit/add', {
                    paravatId: id, // Use the actual paravatId
                    beneficiaryId: formData.beneficiaryId,
                    status: 'Pending',
                    date: formattedDate, // Use the formatted date
                });
                console.log(response.data);
                incrementAssignments(id);
                setSuccess(true); // Set success to true
            } catch (error) {
                console.error('Error submitting form:', error);
                // Handle error here, e.g., showing an error message
                break; // Exit the loop on error
            }

            // Calculate the next date based on the recurrence period
            currentDate.setDate(currentDate.getDate() + parseInt(formData.recurrencePeriod));
        }
    };


    const [todaysVisits, setTodaysVisits] = useState([]);

    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const response = await axios.get('http://localhost:3080/api/v1/visit/find'); // Adjust the endpoint as necessary
                const visits = response.data.msg; // Assuming the data is in response.data.msg
                const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

                const todaysVisits = visits.filter(visit => {
                    // Assuming visit has a date property in YYYY-MM-DD format
                    const visitDate = new Date(visit.date).toISOString().split('T')[0];
                    return visit.paravatId === id && visitDate === today;
                });

                setTodaysVisits(todaysVisits);
            } catch (error) {
                console.error('Error fetching visits:', error);
            }
        };

        fetchVisits();
    }, []);
    const [beneficiaries, setBeneficiaries] = useState({}); // State to store the beneficiaries

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            try {
                const response = await axios.get('http://localhost:3080/api/v1/banef/all');
                var dictBnF = {};
                const beneficiaryData = response.data.msg.forEach((beneficiary) => {
                    dictBnF[beneficiary._id] = beneficiary.name;

                });
                console.log(dictBnF);
                setBeneficiaries(dictBnF);
            } catch (error) {
                console.error(error); // Handle the error according to your needs
            }
        };

        fetchBeneficiaries();
    }, []);

    return (
        <div>
            <Header title=" Paravet Insight" />
            <div className="contentbox">
                <div className="col">
                    <div >
                        <h2>Assign a Beneficiary</h2>
                        {success && <Alert severity="success">Data inserted successfully!</Alert>} {/* Add the Alert component */}
                        <form className="assignform" onSubmit={handleSubmit}>
                            <TextField
                                required
                                id="beneficiary_id"
                                name="beneficiary_id"
                                label="Beneficiary ID"
                                value={formData.beneficiary_id}
                                onChange={handleChange}
                                sx={{ width: '100%!important' }}
                                select
                            >
                                {Object.entries(beneficiaries).map(([id, name]) => (
                                    <MenuItem key={id} value={id}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </TextField>                            <TextField name="startDate" label="Start Date" type="date" variant="outlined" InputLabelProps={{ shrink: true }} onChange={handleChange} required />
                            <TextField name="endDate" label="End Date" type="date" variant="outlined" InputLabelProps={{ shrink: true }} onChange={handleChange} required />
                            <TextField name="recurrencePeriod" label="Recurrence Period" select variant="outlined" onChange={handleChange} required>
                                <MenuItem value={2}>2 days</MenuItem>
                                <MenuItem value={5}>5 days</MenuItem>
                                <MenuItem value={7}>7 days</MenuItem>
                            </TextField>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[300], color: colors.blueAccent[700], width: '50%', alignSelf: 'center' }}>
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
                    {todaysVisits.map((visit, index) => (
                        <div key={index} className="visit">
                            <h3>Beneficiary ID: {visit.beneficiaryId}</h3>
                            <p>Status: {visit.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatBox;
