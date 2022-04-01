import { Button, Table } from "react-bootstrap";
import User from "../../../types/User";
import "./UserList.css";
import { MdCreate, MdDeleteOutline } from "react-icons/md";

export default function UserList(props: {
  data: User[];
  deleteUser: (index: number) => void;
  updateUser: (index: number) => void;
}) {
  return (
    <Table className="container" striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email ID</th>
          <th>Phone Number</th>
          <th>Password</th>
          <th>Gender</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((user: User, index: number) => {
          return (
            <tr key={index}>
              <td></td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.password}</td>
              <td>{user.gender}</td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={(e) => {if(window.confirm('This user will be deleted. Are you sure?')){props.deleteUser(user.id)}}}
                >
                  <MdDeleteOutline className="icon" />
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  onClick={(e) => props.updateUser(user.id)}
                >
                  <MdCreate className="icon" />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
