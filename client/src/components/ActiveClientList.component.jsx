import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StopButton from "./StopButton.component";
import StartButton from "./StartButton.component";
import ResetButton from "./ResetButton.component";
import ResetAfterEndButton from "./ResetAfterEndButton.component";
import InsertClimbers from "./InsertClimbers.component";
import PauseButton from "./PauseButton.component";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import StopAll from "./StopAll.component";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import CardGroup from "react-bootstrap/CardGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import { FaArrowRight, FaCheckCircle, FaWindowClose } from "react-icons/fa";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function LastCreatedModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [clientId, setClientId] = useState();
  const [limit, setLimit] = useState(3);
  const [sort, setSort] = useState("desc");

  function getFetchUrl() {
    return `${SERVER_URL}/clients/`;
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(getFetchUrl(), {
        params: {
          limit,
          sort,
        },
      })
      .then((res) => {
        setData(res.data.clients);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(getFetchUrl(), {
        params: {
          limit,
          sort,
        },
      })
      .then((res) => {
        setData(res.data.clients);
      })
      .catch((err) => {
        alert(err);
      });
  }, [limit]);

  return (
    <Modal show={true} onHide={props.handleClose} size='xl' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          {isLoading ? (
            "Loading..."
          ) : (
            <span>
              <Form inline>
                <h2>Last Created</h2>
                <FaArrowRight size='15px' />{" "}
                <FormControl
                  className='inlineFormInputGroupUsername2'
                  type='number'
                  style={{ width: "80px" }}
                  min='1'
                  value={limit}
                  onChange={(e) => {
                    e.preventDefault;
                    setLimit(e.target.value);
                  }}
                />
              </Form>
            </span>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            {isLoading ? (
              <Spinner animation='border' />
            ) : (
              <Col sm='auto'>
                <div className='scrollableContent'>
                  {data
                    .sort((a, b) => (a.timeStamp < b.timeStamp ? 1 : -1))
                    .map((item) => (
                      <ListGroup key={item._id} variant='flush'>
                        <ListGroup.Item action onClick={() => setClientId(item._id)}>
                          <span style={{ fontSize: "14px" }}>
                            {item.date.toString().substr(0, 10)}
                            <FaArrowRight size='10px' />
                            {item.date.toString().substr(11, 8)}
                            <FaArrowRight size='10px' />
                            {item.name}
                          </span>
                        </ListGroup.Item>
                      </ListGroup>
                    ))}
                </div>
              </Col>
            )}

            <Col sm='auto'>
              <span>
                {clientId !== undefined ? (
                  <Search4ActiveCard nos={props.totalInGym} refresh={props.refresh} id2Search={clientId} />
                ) : null}
              </span>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyVerticallyCenteredModal(props) {
  const [id4Start, setId4Start] = useState("");
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>Results: {props.no}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col sm={4}>
              <div className='scrollableContent'>
                {props.clients.map((item) => (
                  <ListGroup key={item._id} variant='flush'>
                    <ListGroup.Item action onClick={() => setId4Start(item._id)}>
                      {item.name}
                    </ListGroup.Item>
                  </ListGroup>
                ))}
              </div>
            </Col>
            <Col sm={8}>
              <span>
                <Search4ActiveCard nos={props.totalInGym} refresh={props.refresh} id2Search={id4Start} />
              </span>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Search4ActiveCard({ id2Search, refresh, nos }) {
  const [adults, setAdults] = useState(0);
  const [kids, setKids] = useState(0);
  const [minikids, setMiniKids] = useState(0);
  const [totalClimbers, setTotalClimbers] = useState(0);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChangeAdults = (e) => {
    setAdults(e.target.value);
  };
  const onChangeKids = (e) => {
    setKids(e.target.value);
  };
  const onChangeMiniKids = (e) => {
    setMiniKids(e.target.value);
  };

  const insert = async () => {
    try {
      const url = `${SERVER_URL}/clients/update-numbers/` + id2Search;
      setLoading(true);
      const response = await axios({
        method: "POST",
        url: url,
        data: {
          adults: adults,
          kids: kids,
          minikids: minikids,
        },
      });
    } catch (err) {
      console.log("Some error, please stop that!!!");
      console.log("--------------------------------");
      console.log(err);
    }
    setLoading(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    insert();
    setTotalClimbers(adults + kids + minikids);
  };

  function getFetchUrl(id) {
    return `${SERVER_URL}/clients/4active/${id}`;
  }

  useEffect(() => {
    setLoading(true);
    let mounted = true;

    if (mounted) {
      async function fetchData() {
        const result = await axios.get(getFetchUrl(id2Search));
        setClient(result.data.client);
        setLoading(false);
        setTotalClimbers(0);
        setAdults(0);
        setKids(0);
        // console.log(result.data);
      }
      if (id2Search !== "") {
        fetchData();
        refresh();
      }
    }

    return () => {
      mounted = false;
    };
  }, [id2Search, nos, totalClimbers]);

  // console.log(client);
  // console.log(client);
  if (client !== null) {
    return (
      <span>
        <Card bg='dark' text='light' style={{ width: "100%", height: "100%" }} className='mb-2'>
          <Card.Header>
            {loading === true ? "loading..." : client.timeIn > 0 ? "Time is running" : "Time is NOT running"}

            <span style={{ float: "right" }}>
              <Link style={{ marginRight: "5px" }} className='btn btn-primary' to={"/edit/" + id2Search}>
                Details
              </Link>
            </span>
          </Card.Header>
          <Card.Body>
            <Card.Title>{client.name}</Card.Title>
            {client.timeIn > 0 ? (
              `The time was started at:${client.startTime}`
            ) : (
              <span>
                {client.noOfpeopleClimbing === 0 ? (
                  //  <InsertClimbers noAdult={client.adults} refresh={refresh} noKids={client.kids} ClientId={client._id} />
                  <span>
                    <Form onSubmit={onSubmit} inline>
                      <InputGroup size='sm' className='mb-2 mr-sm-2'>
                        <InputGroup.Prepend>
                          <InputGroup.Text>Adults</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          style={{ width: "60px" }}
                          min='0'
                          type='number'
                          className='inlineFormInputGroupUsername2'
                          onChange={onChangeAdults}
                        />
                      </InputGroup>
                      <InputGroup size='sm' className='mb-2 mr-sm-2'>
                        <InputGroup.Prepend>
                          <InputGroup.Text>Kids</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          style={{ width: "60px" }}
                          min='0'
                          type='number'
                          className='inlineFormInputGroupUsername2'
                          onChange={onChangeKids}
                        />
                      </InputGroup>
                      <InputGroup size='sm' className='mb-2 mr-sm-2'>
                        <InputGroup.Prepend>
                          <InputGroup.Text>MiniKids</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          style={{ width: "60px" }}
                          min='0'
                          type='number'
                          className='inlineFormInputGroupUsername2'
                          onChange={onChangeMiniKids}
                        />
                      </InputGroup>

                      <Button type='submit' className='mb-2' size='sm' inline='true'>
                        Ok
                      </Button>
                    </Form>
                  </span>
                ) : (
                  <StartButton refresh={refresh} ClientId={id2Search} status={client.status} />
                )}
              </span>
            )}
          </Card.Body>
        </Card>
      </span>
    );
  } else {
    return null;
  }
}

function ClientList() {
  const [alert, setAlert] = useState(false);
  const [clients, setClients] = useState([]);
  const [priceKids, setPriceKids] = useState(0);
  const [priceAdults, setPriceAdults] = useState(0);
  const [priceMinikids, setPriceMinikids] = useState(0);
  const [searchClients, setSearchClients] = useState([]);
  const [query, setQuery] = useState("");
  const [modal4SearchResults, setModal4SearchResults] = useState(false);
  const [reverseOrder, setReverseOrder] = useState(false);
  const [showLastCreated, setShowLastCreated] = useState(false);
  const [totalInGym, setTotalInGym] = useState(0);
  const [loading, isLoading] = useState(false);

  let totalClimbers = clients.reduce((accumulator, current) => accumulator + current.noOfpeopleClimbing, 0);
  let totalClimbersRemaining = clients.reduce(
    (accumulator, current) => accumulator + (current.adultsRemaining + current.kidsRemaining),
    0
  );

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
  }, 30000);

  let ctime = (a, b) => {
    return b - a;
  };

  function calculateMins(a, b) {
    var total;

    if (b === 0) {
      return (total = 0);
    } else {
      return (total = ((a - b) / 1000 / 60).toFixed(0));
    }
  }

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    }
  }, [alert]);


  const onChangeSearch = (e) => {
    setQuery(e.target.value);
    // console.log(e.target.value);
  };

  
  /////////////////////////
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      async function fetchData() {
        try {
          isLoading(true);
          const result = await axios.get(`${SERVER_URL}/clients/active`);
          setTotalInGym(result.data.totalInGym);
          setClients(result.data.clients);
          setPriceAdults(result.data.adultPrice);
          setPriceKids(result.data.kidPrice);
          setPriceMinikids(result.data.miniKidPrice);
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
  }, [alert, reverseOrder]);

  async function onClickSendQuery() {
    try {
      isLoading(true);
      const result = await axios.get(`${SERVER_URL}/clients/search4active/?search=${query}`);
      // console.log(result.data.clients);
      setSearchClients(result.data.clients)
      isLoading(false);
    } catch (error) {
      isLoading(false);
      console.log(error);
    }
  }

  const refresh = () => {
    setAlert(true);
  };

  return (
    <div>
      <MyVerticallyCenteredModal
        totalInGym={totalClimbers}
        show={modal4SearchResults}
        handleClose={() => {
          setModal4SearchResults(false);
          setQuery("");
        }}
        onHide={() => {
          setModal4SearchResults(false);
          setQuery("");
        }}
        clients={searchClients}
        no={searchClients.length}
        refresh={refresh}
      />
      {showLastCreated === true ? (
        <LastCreatedModal
          totalInGym={totalClimbers}
          show={true}
          handleClose={() => setShowLastCreated(false)}
          onHide={() => setShowLastCreated(false)}
          refresh={refresh}
        />
      ) : null}

      <Row>
        <span style={{ marginTop: "10px", marginLeft: "15px", marginRight: "15px" }}>
          <h3>Active Clients </h3>

          <span style={{ verticalAlign: "middle", display: "table-cell" }}>
            Total Climbers in Gym:{" "}
            <span style={totalInGym > 20 ? { color: "red", fontSize: "40px" } : { color: "green", fontSize: "40px" }}>
              {totalInGym}
            </span>{" "}
          </span>
        </span>
      </Row>
      <Row>
        <Form inline>
          <InputGroup>
            <FormControl
              style={{ width: "200px" }}
              placeholder='Search'
              className='inlineFormInputGroupUsername2'
              type='text'
              value={query}
              onChange={onChangeSearch}
              
            />
          </InputGroup>
          <Button
            onClick={(e) => {
              e.preventDefault;
              onClickSendQuery()
            }}
            variant='info'
            disabled={query===''?true:false}
          >
            {loading ? <>Loading</> : <>Search</>}
          </Button>
          <Button style={{ margin: "10px" }} onClick={() => setShowLastCreated(true)}>
            Last Created
          </Button>
          <Button
                onClick={() => setModal4SearchResults(true)}
                variant={searchClients.length === 0 ? "danger" : "success"}
                disabled={searchClients.length === 0 ? true : false}
              >
                Results: {searchClients.length}
              </Button>
        </Form>
      </Row>
      <Row style={{ marginTop: "10px" }} xl={3} lg={2} md={2} sm={1} xs={1}>
        {/* reverseOrder,setReverseOrder  */}

        {clients
          .sort((a, b) => (b.timeIn < a.timeIn ? 1 : -1))
          .map((client) => (
            <Col style={{ padding: "5px" }} key={client._id}>
              <CardGroup>
                <Card border='dark' bg='dark' text='light' style={{ width: "auto", height: "auto" }} className='mb-2'>
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
                      <span style={{ marginLeft: "3px", fontSize: "25px" }}>{client.name} ~ Paused</span>
                    ) : (
                      <span>
                        <span style={{ marginLeft: "3px", fontSize: "25px" }}>
                          {client.terms ? (
                            <>
                              <FaCheckCircle color='green' style={{ margin: "0 4 0 0" }} size='1.4em' />
                            </>
                          ) : (
                            <>
                              <FaWindowClose color='red' style={{ margin: "0 4 0 0" }} size='1.4em' />
                            </>
                          )}{" "}
                          {client.name}{" "}
                        </span>
                      </span>
                    )}

                    <span style={{ float: "right" }}>
                      <Link style={{ marginRight: "5px" }} className='btn btn-primary' to={"/edit/" + client._id}>
                        Details{" "}
                      </Link>
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <span>
                        <small style={{ color: "white" }}>
                          <cite title='Source Title'>
                            <span style={{ fontSize: "15px", color: "white", marginRight: "10px" }}>
                              {client.startTime}
                            </span>

                            {client.timeOut ? (
                              <span
                                style={{ fontSize: "20px", color: "white", marginRight: "10", fontWeight: "bolder" }}
                              >
                                ~ {client.finalTime}(initial time) /min @{" "}
                                {client.dueList === undefined
                                  ? 0
                                  : client.dueList.reduce((prev, cur) => prev + cur.due, 0)}
                                /lei
                              </span>
                            ) : client.pausedStatus === false ? (
                              <span style={{ fontSize: "15px", color: "white", marginRight: "10px" }}>
                                {ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn)) <= 35 ? (
                                  <span>
                                    {ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn))} / min - aprox.{" "}
                                    {client.kids * (priceKids - 10) +
                                      client.adults * (priceAdults - 10) +
                                      client.minikids * (priceMinikids - 10)}{" "}
                                    / lei
                                  </span>
                                ) : null}
                                {ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn)) >= 35.0001 &&
                                ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn)) <= 125 ? (
                                  <span>
                                    {ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn))} / min - aprox.{" "}
                                    {client.kids *
                                      (priceKids -
                                        15 +
                                        Math.ceil(
                                          (ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn)) - 35) /
                                            15
                                        ) *
                                          7.5) +
                                      client.adults *
                                        (priceAdults -
                                          15 +
                                          Math.ceil(
                                            (ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn)) - 35) /
                                              15
                                          ) *
                                            7.5) +
                                      client.minikids *
                                        (priceMinikids -
                                          15 +
                                          Math.ceil(
                                            (ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn)) - 35) /
                                              15
                                          ) *
                                            2.5)}{" "}
                                    / lei
                                  </span>
                                ) : null}
                                {ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn)) >= 125.0001 ? (
                                  <span>
                                    <span>
                                      {ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn))} / min -
                                      aprox.{" "}
                                      {client.kids *
                                        (priceKids -
                                          0 +
                                          Math.ceil(
                                            (ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn)) - 35) /
                                              15
                                          ) *
                                            5) +
                                        client.adults *
                                          (priceAdults -
                                            0 +
                                            Math.ceil(
                                              (ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn)) -
                                                35) /
                                                15
                                            ) *
                                              5) +
                                        client.minikids *
                                          (priceMinikids -
                                            15 +
                                            Math.ceil(
                                              (ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn)) -
                                                35) /
                                                15
                                            ) *
                                              2.5)}{" "}
                                      / lei
                                    </span>
                                  </span>
                                ) : null}
                              </span>
                            ) : (
                              <span style={{ marginRight: "10px", fontSize: "15px", color: "red" }}>
                                {client.elapsedOnPaused}/min
                              </span>
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
                          ClientId={client._id}
                        />
                      ) : (
                        <span>
                          <ButtonGroup size='lg' className='mb-2'>
                            {/* <StartButton ClientId={client._id} refresh={refresh} status={client.status} /> */}
                            {/* <PauseButton ClientId={client._id} refresh={refresh} timeOut={client.timeOut} name={client.name} status={client.status} paused={client.pausedStatus}/> */}
                            {/* {client.timeOut===0?null:<StopAll ClientId={client._id} refresh={refresh}/>} */}
                            <StopAll ClientId={client._id} name={client.name} refresh={refresh} />
                            {/* <StopButton ClientId={client._id} refresh={refresh} timeOut={client.timeOut} status={client.status} name={client.name} paused={client.pausedStatus}/>  */}
                          </ButtonGroup>
                          {client.timeOut > 0 ? (
                            <span style={{ float: "right" }}>
                              <ResetAfterEndButton ClientId={client._id} refresh={refresh} />
                            </span>
                          ) : (
                            <span style={{ float: "right" }}>
                              <ResetButton
                                ClientId={client._id}
                                refresh={refresh}
                                in={client.timeIn}
                                out={client.timeOut}
                                paused={client.pausedStatus}
                                name={client.name}
                                due={client.due}
                                time={client.finalTime}
                                dueFromClientSide={
                                  ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn)) < 35
                                    ? client.kids * priceKids + client.adults * priceAdults
                                    : client.kids *
                                        (priceKids +
                                          Math.ceil(
                                            (ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn)) - 35) /
                                              15
                                          ) *
                                            5) +
                                      client.adults *
                                        (priceAdults +
                                          Math.ceil(
                                            (ctime(client.totalPaused, calculateMins(Date.now(), client.timeIn)) - 35) /
                                              15
                                          ) *
                                            5)
                                }

                                // timeEndResetClientSide=
                              />
                            </span>
                          )}
                        </span>
                      )}

                      {/* <InsertClimbers noAdult={client.adults} refresh={refresh} noKids={client.kids} ClientId={client._id}/> */}
                    </span>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Col>
          ))}
      </Row>
    </div>
  );
}
export default ClientList;
