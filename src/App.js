import React, { Component } from "react";
import UserList from "./components/user-list";
import EditUser from "./components/user-edit";
import Header from "./components/header";
import Footer from "./components/footer";
import { Route, BrowserRouter } from "react-router-dom";
import "./assets/css/app-styles.scss";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <BrowserRouter>
          <Route path="/" exact component={UserList}></Route>
          <Route exact path="/editar/:user" component={EditUser}></Route>
        </BrowserRouter>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default App;
