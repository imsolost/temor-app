import React, { Component } from "react";
import axios from "axios";
import { Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";

class Temor extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    URL: process.env.NODE_ENV === 'production' ? 'temor-app.herokuapp.com' : 'localhost:3001'
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has 
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever 
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // our first get method that uses our backend api to 
  // fetch data from our data base
  getDataFromDb = () => {
    fetch(`//${this.state.URL}/api/getData`)
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  handleFormSubmit = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post(`//${this.state.URL}/api/putData`, {
      id: idToBeAdded,
      message: message
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <form>
            <Input
              type="text"
              onChange={e => this.setState({ message: e.target.value })}
              autoFocus={true}
              placeholder="What do you fear?"
            />
            <FormBtn
              onClick={() => this.handleFormSubmit(this.state.message)}
            >
              Submit
            </FormBtn>
          </form>
        </Row>
      </Container>
    );
  }
}

export default Temor;
