import React, { useEffect, useState } from 'react'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Box, IconButton, useTheme, TablePagination, TableFooter, Grid} from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="previous page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </Box>
    );
}
TablePaginationActions.propTypes = {
    count:PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };      


function TablesSec() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); 

//   const emptyRows =
//   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredResults.length) : 0;

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
}; 
    const [apidata, setApidata] = useState();
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [title,setTitle] = useState();
    const [body,setBody] = useState();
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/posts") 
        .then(res =>{
            setApidata(res.data)
            setFilteredResults(res.data)
        })
    },[])
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = apidata.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(apidata)
        }
    }
    const resetbtn = ()=>{
        searchItems('')
        setFilteredResults(apidata)
    }
    const postdatas = (e)=>{
        e.preventDefault();
        axios.post("https://jsonplaceholder.typicode.com/posts",{
            title,body
        }).then(res => console.log("datas", res))
    }
  return (
    <div>
        <Grid lg={12} xs={12} item container justifyContent="space-between">
            <Grid lg={3} xs={3} item container justifyContent="center">
                <input value={searchInput} placeholder='Search...' onChange={(e) => searchItems(e.target.value)}/>
                <button onClick={resetbtn}>clear</button>
            </Grid>
            <Grid lg={3} xs={3} item container justifyContent="center">
                <input type='text' onChange={(e) => setTitle(e.target.value)}/>
            </Grid>
            <Grid lg={3} xs={3} item container justifyContent="center">
                <input type='text' onChange={(e) => setBody(e.target.value)}/>
            </Grid>
            <Grid lg={3} xs={3} item container justifyContent="center">
                <button onClick={postdatas}>Post Data</button>
            </Grid>
        </Grid>
        
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell align="center">Id </TableCell>
            <TableCell align="center">Title </TableCell>
            <TableCell align="center">Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? filteredResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : filteredResults
          ).map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.userId}</TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            //   colSpan={3}
              count={filteredResults.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            //   ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>

      </Table>
    </TableContainer>
    </div>
  )
}

export default TablesSec
