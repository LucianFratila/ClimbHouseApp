import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { createResource } from "../../utils/createResource";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, lazy } from "react";
import Button from "react-bootstrap/Button";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AllClients() {
  const [query, setQuery] = useState("");
  const [sendQuery, setSendQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const promise = fetch(`${SERVER_URL}/clients/?search=${sendQuery}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("API error");
      }
      return res.json();
    })
    .then((data) => {
      data;
    });

  const allClientsResource = createResource(promise);

  function ClientCard({ resource }) {
    let clients;
    if (sendQuery !== "") {
      clients = resource.read();
    }
    console.log(clients);
    if (clients) {
      return (
        <section>
          <h5>{`total: ${clients.results}, active: ${clients.active}, results: ${clients.clients.length}`}</h5>
        </section>
      );
    } else return null;
  }

  const onChangeSearch = (e) => {
    setQuery(e.target.value);
  };
  const onSubmitSearch = (e) => {
    setSendQuery(query);
  };

  return (
    <main>
      <ErrorBoundary fallback={<strong>Ooops! Something bad happened! Please try again later!</strong>}>
        <h4>All Clients</h4>
        <InputGroup className='mb-2 mr-sm-2'>
          <InputGroup.Prepend>
            <InputGroup.Text>Search</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl className='inlineFormInputGroupUsername2' type='text' onChange={onChangeSearch} />
          <Button onClick={onSubmitSearch} type='submit'>
            Submit
          </Button>
        </InputGroup>
        <Suspense fallback={<strong>Loading ...</strong>}>
          <ClientCard resource={allClientsResource} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
export default AllClients;
