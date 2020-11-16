import React, { Component } from 'react';
import axios from "axios";

class FearCircle extends Component {
  // initialize our state 
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    randArrA: [...new Array(1000)].map(() => Math.random()),
    randArrR: [...new Array(1000)].map(() => Math.random()),
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

  // just a note, here, in the front end, we use the id key of our data object 
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify 
  // data base entries

  // our first get method that uses our backend api to 
  // fetch data from our data base
  getDataFromDb = () => {
    fetch(`//${this.state.URL}/api/getData`)
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = message => {
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

  coords = (fear, i) => {
    let a = this.state.randArrA[i] * 2 * Math.PI
    let r = 215 * Math.sqrt(this.state.randArrR[i])
    let x = r * Math.cos(a)
    let y = r * Math.sin(a)
    return (<div key={i} className="listItem" style={{ 
        left: x + "px",
        top: y + "px"
      }}>
        {fear.message}
      </div>)
  }

  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
    let fearMap = this.state.data.map( (fear, i) => this.coords(fear, i) )
    return (
      <div className="container">
        <div className="circle">
          <div className="list">
            {fearMap}
          </div>
        </div>
      </div>
    );
  }
}

export default FearCircle;
