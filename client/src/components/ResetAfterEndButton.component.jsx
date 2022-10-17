import React, { Component, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function ResetAfterEndButton(props) {
  const [isLoading, setLoading] = useState(false);

  const action = async () => {
    // console.log(firebaseID);
    const url = `${SERVER_URL}/clients/dismiss/${props.ClientId}`;
    try {
      await axios(url, {
        method: "POST",
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (isLoading) {
      action().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      props.refresh();
    }, 2000);
  };

  return (
    <span>
      <Button
        variant='success'
        size='lg'
        disabled={(isLoading, props.status)}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? "Loading..." : `Dismiss`}
      </Button>
    </span>
  );
}

export default ResetAfterEndButton;
