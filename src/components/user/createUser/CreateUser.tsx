import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { addUser, editUser } from "../../../store/actions";
import {
  USER_SUBMIT_SUCCESS,
  USER_UPDATE_SUCCESS,
} from "../../../store/constantActions";
import IUserState from "../../../types/IUserState";
import User from "../../../types/User";
import "./CreateUser.css";

export default function CreateUser() {
  const users = useSelector((state: IUserState) => state.users);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { id } = useParams();
  let initialUserState: User = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    password: "",
  };
  const [method, setMethod] = useState("create");
  const [user, setUser] = useState(initialUserState);

  useEffect(() => {
    if (id !== "0") {
      const userData = users.find(
        (element: { id: number }) => element.id === Number(id)
      )!;
      setUser(userData);
      setMethod("update");
    }
  }, [id, users]);

  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { id, firstName, lastName, email, mobileNumber, gender, password } =
      user;
    let userData: User = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      gender: gender,
      password: password,
    };

    if (method === "create") {
      userData.id = users[users.length - 1].id + 1;
      dispatch(addUser(userData));
      alert(USER_SUBMIT_SUCCESS);
    } else {
      dispatch(editUser(user));
      alert(USER_UPDATE_SUCCESS);
    }
    setUser(initialUserState);
    setMethod("create");
    navigate("/userlist");
  };

  return (
    <div className="jumbotron">
      <h2>User Registration :</h2>
      <Form onSubmit={handleOnSubmit}>
        <Row>
          <Col md="6">
            <Form.Group as={Row} className="mb-3">
              <Form.Label className="label">First Name</Form.Label>
              <Col sm="12">
                <Form.Control
                  value={user.firstName}
                  name="firstName"
                  type="text"
                  onChange={handleOnChange}
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
                  value={user.lastName}
                  name="lastName"
                  type="text"
                  onChange={handleOnChange}
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
              value={user.email}
              name="email"
              type="email"
              onChange={handleOnChange}
              placeholder="Enter email"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group>
            <Form.Label className="label">Mobile number</Form.Label>
            <Form.Control
              value={user.mobileNumber}
              name="mobileNumber"
              type="text"
              onChange={handleOnChange}
              placeholder="Enter contact number"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group>
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
              type="password"
              value={user.password}
              name="password"
              onChange={handleOnChange}
              placeholder="Password"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group>
            <Form.Label className="label">Gender</Form.Label>
            <Form.Select
              value={user.gender}
              name="gender"
              onChange={handleOnChange}
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
    </div>
  );
}