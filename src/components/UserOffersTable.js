import * as React from "react";
import "../css/userOffersTable.css";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableFooter,
} from "@mui/material";
import { Button } from "@mui/material";

//source: https://mui.com/material-ui/react-table/
function UserOffersTable({ isSender, data, handleOffer }) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  function handleChangePage(event, newpage) {
    setPage(newpage);
  }

  function formatTransactionType(usdToLbp) {
    if (usdToLbp) {
      return "USD to LBP";
    }
    return "LBP to USD";
  }

  function handleAcceptButtonClick(transactionId) {
    handleOffer(transactionId, true);
  }

  function handleDeclineButtonClick(transactionId) {
    handleOffer(transactionId, false);
  }

  //Since MUI Styles is deprecated, to style the top row, I defined an object containing styles and then
  // used the sx property sx={style}
  //source for the idea: https://stackoverflow.com/questions/70625797/how-to-import-makestyles-from-mui
  const styles = {
    topRow: {
      //table header cells CSS selector code
      "& thead th": {
        fontWeight: "bold",
        border: "2px solid black",
        borderLeft: "0",
        borderRight: "0",
      },
    },
  };

  return (
    <TableContainer component={Paper} sx={{ height: "400px" }}>
      <Table sx={{ minWidth: 650, ...styles.topRow }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">{isSender ? "Receiver" : "Sender"}</TableCell>
            <TableCell align="center">Offered Amount</TableCell>
            <TableCell align="center">Requested Amount</TableCell>
            <TableCell align="center">USD to LBP</TableCell>
            {!isSender ? <TableCell align="center">Accept</TableCell> : null}
            {!isSender ? <TableCell align="center">Decline</TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Table pagination source: https://www.geeksforgeeks.org/react-mui-tablepagination-api/ */}
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => {
            return (
              <TableRow
                key={transaction.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  {!isSender ? transaction.offerer : transaction.receiver}
                </TableCell>
                <TableCell align="center">{transaction.offered_amount}</TableCell>
                <TableCell align="center">{transaction.requested_amount}</TableCell>
                <TableCell align="center">
                  {formatTransactionType(transaction.usd_to_lbp)}
                </TableCell>
                {!isSender ? (
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      className="reply-offer-button"
                      onClick={() => handleAcceptButtonClick(transaction.id)}
                    >
                      Accept
                    </Button>
                  </TableCell>
                ) : null}
                {!isSender ? (
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      className="reply-offer-button"
                      onClick={() => handleDeclineButtonClick(transaction.id)}
                    >
                      Decline
                    </Button>
                  </TableCell>
                ) : null}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[rowsPerPage]}
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

export default UserOffersTable;
