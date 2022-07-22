import React, {useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useInput} from '../hooks/useInput';
import useFetch from "../hooks/useFetch";

export default function SimpleContainer() {
  
  // const [flag, setFlag] =useState([])
  const [inputs, setInputs] = useInput({year: "", country: ""})


  // let url2 = `https://restcountries.com/v3.1/all`


  const {data, loading, error, refetch} = useFetch(`https://calendarific.com/api/v2/holidays?&api_key=47bbad09ac6713178e45e53a49b019fceaac2750&country=${inputs.country}&year=${inputs.year}&type=national`)


  // const fetchData = async() => {
  //   const {data} = await axios.get(url2)
  //   setFlag(data)
  // }


  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   fetchData()
  // }

  if(loading) return <h2>Loading...</h2>
  if (error) console.log(error)
  return (
    <Container maxWidth="md" sx={{ marginTop: "1rem" }}>
      <CssBaseline />
      <Box
        sx={{ bgcolor: "#cfe8fc", height: "20vh", padding: "1rem" }}
        component="form" onSubmit={refetch}
      >
        <TextField
          id="outlined-basic"
          placeholder="Please Enter Country..."
          variant="outlined"
          type="search"
          name="country"
          value={inputs.country}
          onChange={setInputs}
        />
        <TextField
          id="outlined-basic"
          placeholder="Please Enter Year..."
          variant="outlined"
          type="number"
          name="year"
          value={inputs.year}
          onChange={setInputs}
        />
      <Button variant="contained" type="submit">Search</Button>
      </Box>
      <Box>
        <Typography variant="h3" component="h3" align="center">
        {inputs.year}
        </Typography>
        <Typography variant="h4" component="h4" align="center">
          Holidays for {inputs.country}
        </Typography>
        <Typography sx={{textAlign:"center"}}>
        {/* <img src={flag?.filter((c) => c.altSpellings[0] === inputs.country)[0]?.flags.png} alt="" /> */}
        </Typography>
        <Grid container>
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{width:"150px"}}>Country Name</TableCell>
            <TableCell align="left">Holiday Name</TableCell>
            <TableCell align="left" sx={{width:"150px"}}>Date</TableCell>
            <TableCell align="left">Description</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        {Array.isArray(data) ? (data).map((item,index) => {
            const {country:{name:ctname}, date:{iso} , description : desc, name:hname, urlid } = item
            return(
            <TableRow
              key={urlid}
              sx={{backgroundColor:
                index % 2 
                    ? "lightgray"
                    : "white",}}
            >
              <TableCell component="th" scope="row">
                {ctname}
              </TableCell>
              <TableCell align="left">{hname}</TableCell>
              <TableCell align="left">{iso}</TableCell>
              <TableCell align="left">{desc}</TableCell>
            </TableRow>
        )}) : null}

        
        {}
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
      </Box>
    </Container>
  );
}
