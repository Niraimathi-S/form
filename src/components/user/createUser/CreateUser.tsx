import React, { Component } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import User from "../../../types/User";
import UserList from "../displayUser/UserList";
import "./CreateUser.css";

interface IUserState {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  gender: string;
  password: string;
  users: User[];
  method: string;
}

export class Create extends Component<{}, IUserState> {
  id: number = 0;
  constructor(props: {}) {
    super(props);
    this.state = {
      id: this.id,
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      gender: "",
      password: "",
      method: "create",
      users: [],
    };
  }

  handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let alertMessage: string;
    let {
      id,
      firstName,
      lastName,
      email,
      mobileNumber,
      gender,
      password,
      users,
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
      user.id = this.id++;
      users.push(user);
      alertMessage = "User submitted successfully!!";
    } else {
      users = users.map((element) => (element.id !== user.id ? element : user));
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
      users: users,
    });
    alert(alertMessage);
  };

  handleOnChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<IUserState, any>);
  };

  render() {
    console.log(this.state);
    return (
      <div className="jumbotron">
        <h2>User Registration</h2>
        <Form onSubmit={this.handleOnSubmit}>
          <Row>
            <Col md="6">
              <Form.Group as={Row} className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Col sm="12">
                  <Form.Control
                    value={this.state.firstName}
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
                <Form.Label>Last Name</Form.Label>
                <Col sm="12">
                  <Form.Control
                    value={this.state.lastName}
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={this.state.email}
                name="email"
                type="email"
                onChange={this.handleOnChange}
                placeholder="Enter email"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group>
              <Form.Label>Mobile number</Form.Label>
              <Form.Control
                value={this.state.mobileNumber}
                name="mobileNumber"
                type="text"
                onChange={this.handleOnChange}
                placeholder="Enter contact number"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.password}
                name="password"
                onChange={this.handleOnChange}
                placeholder="Password"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={this.state.gender}
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
        <UserList
          data={this.state.users.length > 0 ? this.state.users : []}
          deleteUser={this.deleteUser}
          updateUser={this.updateUser}
        />
      </div>
    );
  }

  deleteUser = (userId: number) => {
    const userList = this.state.users;
    if (userList && userList.length > 0) {
      const indexToDelete = userList.findIndex(
        (element) => element.id === userId
      );
      if (indexToDelete === -1) return;
      userList.splice(indexToDelete, 1);
    }
    this.setState({
      users: userList,
    });
  };

  updateUser = (userId: number) => {
    const userList = this.state.users;
    if (userList && userList.length > 0) {
      const user = userList.find((element) => element.id === userId)!;
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

export default Create;
