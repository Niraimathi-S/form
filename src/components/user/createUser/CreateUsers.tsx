import React, { Component } from "react";
import { AnyAction, Dispatch } from "redux";
import { Col, Form, Row, Button } from "react-bootstrap";
// import { RouteComponentProps } from "react-router-dom";
import User from "../../../types/User";

import UserList from "../displayUser/UserList";
import "./CreateUser.css";

import { connect } from "react-redux";
import { addUser, editUser, deleteUser } from "../../../store/actions";

interface IState {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  gender: string;
  password: string;
  method: string;
}

export class CreateUser extends Component<IUserDispatchProps, IState> {
  // history = createBrowserHistory();
  constructor(props: any) {
    super(props);
    this.state = {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      gender: "",
      password: "",
      method: "create",
    };
  }

  handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let users = this.props.users;
    let alertMessage: string;
    let {
      id,
      firstName,
      lastName,
      email,
      mobileNumber,
      gender,
      password,
      method,
    } = this.state;
    let user: User = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      gender: gender,
      password: password,
    };
    
    if (method === "create") {
      user.id = users[users.length-1].id + 1;
      this.props.addNewUser(user);
      alertMessage = "User submitted successfully!!";
    } else {
      this.props.editUser(user);
      alertMessage = "User updated successfully!!";
    }
    this.setState({
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      gender: "",
      password: "",
      method: "create",
    });

    alert(alertMessage);
  };

  handleOnChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<IState, any>);
  };

  render() {
    console.log(this.state);
    // if(this.props.match.params.id == 0){
    let { firstName, lastName, email, mobileNumber, gender, password } =
      this.state;
    // }
    // console.log("router params"+this.props.route.params);
    
    
    return (
      <div className="jumbotron">
        <h2>User Registration :</h2>
        <Form onSubmit={this.handleOnSubmit}>
          <Row>
            <Col md="6">
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="label">First Name</Form.Label>
                <Col sm="12">
                  <Form.Control
                    value={firstName}
                    name="firstName"
                    type="text"
                    onChange={this.handleOnChange}
                    placeholder="First name"
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="label">Last Name</Form.Label>
                <Col sm="12">
                  <Form.Control
                    value={lastName}
                    name="lastName"
                    type="text"
                    onChange={this.handleOnChange}
                    placeholder="Last name"
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Group>
              <Form.Label className="label">Email</Form.Label>
              <Form.Control
                value={email}
                name="email"
                type="email"
                onChange={this.handleOnChange}
                placeholder="Enter email"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group>
              <Form.Label className="label">Mobile number</Form.Label>
              <Form.Control
                value={mobileNumber}
                name="mobileNumber"
                type="text"
                onChange={this.handleOnChange}
                placeholder="Enter contact number"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group>
              <Form.Label className="label">Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                name="password"
                onChange={this.handleOnChange}
                placeholder="Password"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group>
              <Form.Label className="label">Gender</Form.Label>
              <Form.Select
                value={gender}
                name="gender"
                onChange={this.handleOnChange}
              >
                <option>Choose...</option>
                <option>Male</option>
                <option>Female</option>
                <option>Transgender</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Col>
              <div className="btn-row">
                <Button className="btn" variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
        
        {/* <UserList
          data={this.props.users}
          deleteUser={this.props.deleteUser}
          updateUser={this.updateUser}
        /> */}
      </div>
    );
  }

  updateUser = (userId: number) => {
    const userList = this.props.users;
    if (userList && userList.length > 0) {
      const user = userList.find(
        (element: { id: number }) => element.id === userId
      )!;
      const { id, firstName, lastName, email, mobileNumber, gender, password } =
        user;
      this.setState({
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        gender: gender,
        mobileNumber: mobileNumber,
        method: "update",
      });
    }
  };
}
function mapStateToProps(state: { users: User[] }) {
  const users = state.users;
  return { users };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    addNewUser: (payload: User) => dispatch(addUser(payload)),
    editUser: (payload: User) => dispatch(editUser(payload)),
    deleteUser: (payload: User) => dispatch(deleteUser(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
// export default CreateUser;


interface IUserDispatchProps {
  addNewUser(user: User): void;
  editUser(user: User): void;
  deleteUser(user: User): void;
  route: { params: any; };
  id: number;
  users: User[];
}
