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

export default function SimpleContainer() {
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [holidays, setHolidays] = useState([]);
  const [flag, setFlag] =useState([])

  let url = `https://calendarific.com/api/v2/holidays?&api_key=47bbad09ac6713178e45e53a49b019fceaac2750&country=${country}&year=${year}&type=national`

  let url2 = `https://restcountries.com/v3.1/all`

  const getData = async() => {
    const {data} = await axios.get(url)
    setHolidays(data.response.holidays)
  }

  const fetchData = async() => {
    const {data} = await axios.get(url2)
    setFlag(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getData()
    fetchData()
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: "1rem" }}>
      <CssBaseline />
      <Box
        sx={{ bgcolor: "#A1A2A6", height: "20vh", padding: "1rem", color:"#F0F0F2" }}
        component="form" onSubmit={handleSubmit}
      >
        <TextField
          placeholder="Please Enter Country..."
          variant="filled"
          type="search"
          InputProps={{ disableUnderline: true }}
          onChange={(e) => setCountry(e.target.value)}
        />
        <TextField
          placeholder="Please Enter Year..."
          variant="filled"
          type="number"
          InputProps={{ disableUnderline: true }}
          
          sx={{marginLeft:"20px", marginRight:"20px"}}
          onChange={(e) => setYear(e.target.value)}
        />
      <Button variant="standard" type="submit" sx={{border:"1px solid #3B3C40", marginTop:"10px", color:"#F0F0F2", "&:hover":{background:'#6E6F73'}}} >Search</Button>
      </Box>
      <Box>
        <Typography variant="h3" component="h3" align="center">
        {year}
        </Typography>
        <Typography variant="h4" component="h4" align="center">
          Holidays for {country.toUpperCase()}
        </Typography>
        <Typography sx={{textAlign:"center"}}>
        <img src={flag?.filter((c) => c.altSpellings[0] === country.toUpperCase())[0]?.flags.png} alt="" />
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
        {holidays.map((item,index) => {
            const {country:{name:ctname}, date:{iso} , description : desc, name:hname, urlid } = item
            return(
            <TableRow
              key={urlid}
              sx={{backgroundColor:
                index % 2 
                    ? "#A1A2A6"
                    : "#F0F0F2",}}
            >
              <TableCell component="th" scope="row">
                {ctname}
              </TableCell>
              <TableCell align="left">{hname}</TableCell>
              <TableCell align="left">{iso}</TableCell>
              <TableCell align="left">{desc}</TableCell>
            </TableRow>
        )})}
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
      </Box>
    </Container>
  );
}
