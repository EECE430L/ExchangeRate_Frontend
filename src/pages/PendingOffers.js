import React, { useState, useEffect } from "react";
import "../css/myExchangeHistory.css";
import { baseUrl } from "../config/Config.js";
import { getUserToken } from "../utility/tokenStorage";
import UserOffersTable from "../components/UserOffersTable";

function PendingOffers() {
  let [receivedOffers, setReceivedOffers] = useState();
  let [sentOffers, setSentOffers] = useState();

  useEffect(() => {
    fetchIncomingOffers();
    fetchOutgoingOffers();
  }, []);

  async function fetchIncomingOffers() {
    const userToken = getUserToken();
    try {
      const response = await fetch(`${baseUrl}/offer/received`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await response.json();
      setReceivedOffers(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchOutgoingOffers() {
    const userToken = getUserToken();
    try {
      const response = await fetch(`${baseUrl}/offer/sended`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await response.json();
      setSentOffers(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function processOffer(transactionId, accepted) {
    const userToken = getUserToken();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        offer_id: transactionId,
        accepted: accepted,
      }),
    };
    try {
      const response = await fetch(`${baseUrl}/offer/process-offer`, requestOptions);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error accepting offer:", error);
      throw error;
    }
  }

  return (
    <div className="wrapper">
      <div className="header">
        <h1>Pending Offers</h1>
      </div>

      <div className="wrapper-content">
        <h2 className="section-title">Incoming Offers</h2>
        {/* Must wait for transactionsData before rendering component
        source: https://stackoverflow.com/questions/74656680/react-how-to-wait-on-prop-data-before-rendering-child-component */}
        {receivedOffers && sentOffers ? (
          <UserOffersTable isSender={false} data={receivedOffers} handleOffer={processOffer} />
        ) : null}
        <hr />
        <h2 className="section-title">Outgoing Offers</h2>
        {/* Must wait for transactionsData before rendering component
        source: https://stackoverflow.com/questions/74656680/react-how-to-wait-on-prop-data-before-rendering-child-component */}
        {receivedOffers && sentOffers ? (
          <UserOffersTable isSender={true} data={sentOffers} handleOffer={processOffer} />
        ) : null}
      </div>
    </div>
  );
}

export default PendingOffers;
