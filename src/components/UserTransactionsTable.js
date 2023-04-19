import * as React from 'react';
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';


function UserTransactionsTable({ data }) {
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;

    function handleChangePage(event, newpage) {
        setPage(newpage);
    }

    //Since MUI Styles is deprecated, to style the top row, I defined an object containing styles and then
    // used the sx property sx={style}
    //source for the idea: https://stackoverflow.com/questions/70625797/how-to-import-makestyles-from-mui
    const styles = {
        topRow: {
            //table header cells CSS selector code
            '& thead th': {
                fontWeight: 'bold',
                border: '2px solid black',
                borderLeft: '0',
                borderRight: '0'
            },
        },
    };

    return (
        <TableContainer component={Paper} sx={{ height: '400px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" sx={styles.topRow}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Exchanged With</TableCell>
                        <TableCell align="center">Transaction Type</TableCell>
                        <TableCell align="center">USD Amount</TableCell>
                        <TableCell align="center">LBP Amount</TableCell>
                        <TableCell align="center">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Table pagination source: https://www.geeksforgeeks.org/react-mui-tablepagination-api/ */}
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => (
                        <TableRow
                            key={transaction.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{transaction.exchangedWith}</TableCell>
                            <TableCell align="center">{transaction.transactionType}</TableCell>
                            <TableCell align="center">{transaction.usdAmount}</TableCell>
                            <TableCell align="center">{transaction.lbpAmount}</TableCell>
                            <TableCell align="center">{transaction.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5]}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default UserTransactionsTable;


