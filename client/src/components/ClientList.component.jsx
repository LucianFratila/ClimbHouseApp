import React, { Component, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
// import CreateClient from "./CreateClient.component";
import axios from "axios";
import DeleteButton from "./DeleteButton.component";
import StartButton from "./StartButton.component";
import Container from "react-bootstrap/Container";
import StopButton from "./StopButton.component";
import CreateClient from "./CreateClient.component";
import InsertClimbers from "./InsertClimbers.component";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import { FaArrowAltCircleUp, FaArrowCircleDown } from "react-icons/fa";
import StopAll from "./StopAll.component";
import { FaCheckCircle, FaWindowClose } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ClientListSuper(props) {
  const [alert, setAlert] = useState(false);
  const [clients, setClients] = useState([]);
  const [all, setAll] = useState();
  const [query, setQuery] = useState("");
  const [sendQuery, setSendQuery] = useState("");
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState("desc");
  const [loading, isLoading] = useState(false);
  const sortListFunction = () => {
    setSort(sort === "asc" ? "desc" : "asc");
  };
  console.log(clients.length);
  const [counter, setCounter] = useState(0);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      let id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }, [delay]);
  }

  useInterval(() => {
    setCounter(counter + 1);
  }, 60000);

  let ctime = (a, b) => {
    return b - a;
  };

  function calculateSeconds(a, b) {
    var total;

    if (b === 0) {
      return (total = 0);
    } else {
      return (total = ((a - b) / 1000).toFixed(0));
    }
  }

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    }
  }, [alert]);

  function getFetchUrl() {
    if (query === "") {
      return `${SERVER_URL}/clients`;
    } else {
      return `${SERVER_URL}/clients/?search=${query}`;
    }
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      async function fetchData() {
        try {
          isLoading(true);
          const result = await axios.get(getFetchUrl(), {
            params: {
              limit,
              sort,
            },
          });
          setClients(result.data.clients);
          setAll(result.data.results);
          isLoading(false);
        } catch (error) {
          isLoading(false);
          console.log(error);
        }
      }
      fetchData();
    }
    return () => {
      mounted = false;
    };
  }, [limit, sendQuery, sort]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      async function fetchData() {
        try {
          const result = await axios.get(getFetchUrl(), {
            params: {
              limit,
              sort,
            },
          });
          setClients(result.data.clients);
          setAll(result.data.results);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
    return () => {
      mounted = false;
    };
  }, [alert]);

  const refresh = () => {
    setAlert(true);
  };
  const onChangeSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <Row>
        <span style={{ marginTop: "10px", marginLeft: "15px", marginRight: "15px" }}>
          <h4>All Clients</h4>
          <h5>Create Client</h5>
          <CreateClient refresh={refresh} style={{ marginLeft: "5px" }} />
          {/* <SearchClientForm  refresh={refresh}/> */}
          <Form inline>
            <InputGroup className='mb-2 mr-sm-2'>
              <InputGroup.Prepend>
                <InputGroup.Text>Search</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl className='inlineFormInputGroupUsername2' type='text' onChange={onChangeSearch} />
              <span style={{ marginLeft: "12px" }}>
                <Button
                  onClick={(e) => {
                    e.preventDefault;
                    setSendQuery(query);
                  }}
                  variant='info'
                >
                  {loading ? <>Loading</> : <>Search</>}
                </Button>
              </span>
            </InputGroup>
            <InputGroup className='mb-2 mr-sm-2'>
              <InputGroup.Prepend>
                <InputGroup.Text>#Limit(Total: {!loading ? <>{`${all}`}</> : <>Loading...</>} )</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className='inlineFormInputGroupUsername2'
                type='number'
                min='0'
                value={limit}
                onChange={(e) => {
                  e.preventDefault;
                  setLimit(e.target.value);
                }}
              />
              <span style={{ marginLeft: "12px" }}>
                <Button onClick={sortListFunction} variant='info'>
                  {sort === "asc" ? <FaArrowAltCircleUp /> : <FaArrowCircleDown />}
                </Button>
              </span>
            </InputGroup>
          </Form>
          {`Results: ${clients.length}`}
        </span>
      </Row>
      <Row style={{ marginTop: "10px" }} xl={4} lg={2} md={2} sm={1} xs={1}>
        {loading ? (
          <>
            <Container style={{ marginLeft: "auto", marginRight: "auto", position: "relative" }}>
              <Row>
                <Col>
                  <Spinner
                    style={{ margin: "auto", display: "block", width: "150px", height: "150px" }}
                    animation='grow'
                    variant='light'
                  />
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <>
            {clients.length == 0 ? (
              <><Container><Row><Col>{`No results for: ${sendQuery}`}</Col></Row></Container></>
            ) : (
              <>
                {clients.map((client) => (
                  <Col style={{ padding: "5px" }} key={client._id}>
                    
                    <CardGroup>
                      <Card
                        border='dark'
                        bg='dark'
                        text='light'
                        style={{ width: "auto", height: "auto" }}
                        className='mb-2'
                      >
                        <Card.Header
                          style={{
                            background:
                              client.timeOut > 0
                                ? client.status === true
                                  ? "linear-gradient(180deg, rgba(130,0,0,1) 0%, rgba(171,8,8,1) 50%, rgba(255,0,0,1) 100%)"
                                  : "gray"
                                : client.status === true
                                ? "linear-gradient(180deg, rgba(71,120,1,1) 0%, rgba(104,150,8,1) 50%, rgba(107,186,1,1) 100%)"
                                : "gray",
                          }}
                          className='mb-2 '
                        >
                          {client.pausedStatus === true ? (
                            <span style={{ marginLeft: "3px", fontSize: "20px" }}>{client.name} ~ Paused</span>
                          ) : (
                            <span style={{ marginLeft: "3px", fontSize: "20px" }}>
                              {client.terms ? (
                                <>
                                  <FaCheckCircle color='green' style={{ margin: "0 4 0 0" }} size='1.4em' />
                                </>
                              ) : (
                                <>
                                  <FaWindowClose color='red' style={{ margin: "0 4 0 0" }} size='1.4em' />
                                </>
                              )}{" "}
                              {client.name}
                            </span>
                          )}
                          <span style={{ float: "right" }}>
                            <Link style={{ marginRight: "5px" }} className='btn btn-primary' to={"/edit/" + client._id}>
                              Details
                            </Link>
                            {/* <DeleteButton ClientId={client._id} refresh={refresh} name={client.name} /> */}
                          </span>
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>
                            <span>
                              <small style={{ color: "white" }}>
                                <cite title='Source Title'>
                                  {client.noOfpeopleClimbing === 0 ? (
                                    "Add climbers to start"
                                  ) : client.timeOut > 0 ? (
                                    <span>
                                      Started: {client.startTime} ~ {client.finalTime}/min @{" "}
                                      {client.dueList.reduce((prev, cur) => prev + cur.due, 0)}/lei
                                    </span>
                                  ) : (
                                    <span>Started: {client.startTime}</span>
                                  )}
                                </cite>
                              </small>
                            </span>
                          </Card.Title>

                          <span>
                            {client.noOfpeopleClimbing === 0 ? (
                              <InsertClimbers
                                noAdult={client.adults}
                                refresh={refresh}
                                noKids={client.kids}
                                noMiniKids={client.minikids}
                                ClientId={client._id}
                              />
                            ) : (
                              <span>
                                <StartButton ClientId={client._id} refresh={refresh} status={client.status} />
                                <StopAll ClientId={client._id} refresh={refresh} />
                              </span>
                            )}

                            {/* <InsertClimbers noAdult={client.adults} refresh={refresh} noKids={client.kids} ClientId={client._id}/> */}
                          </span>
                        </Card.Body>
                      </Card>
                    </CardGroup>
                  </Col>
                ))}
              </>
            )}
          </>
        )}
      </Row>
    </div>
  );
}
export default ClientListSuper;
