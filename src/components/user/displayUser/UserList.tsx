import { Button, Table } from "react-bootstrap";
import User from "../../../types/User";
import "./UserList.css";
import { MdCreate, MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, editUser } from "../../../store/actions";
import { Link } from "react-router-dom";
import IUserState from "../../../types/IUserState";


export default function UserList(props: {}) {
  const users = useSelector((state: IUserState) => state.users)
  const dispatch = useDispatch();
  return (
    <div className="user-list">
      <h2>User List :</h2>
      <Table className="container" striped bordered hover size="lg">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email ID</th>
            <th>Phone Number</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User, index: number) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.mobileNumber}</td>
                <td>{user.password}</td>
                <td>{user.gender}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={(e) => {
                      if (
                        window.confirm("This user will be deleted. Are you sure?")
                      ) {
                        dispatch(deleteUser(user));
                      }
                    }}
                  >
                    <MdDeleteOutline className="icon" />
                  </Button>
                </td><td>
                  <Link to={`/createuser/${user.id}`}>  <Button
                    variant="outline-primary">
                    <MdCreate className="icon" />
                  </Button></Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Link to={`/createuser/${0}`}> <Button className="btn" variant="primary">
        Create New User</Button>
      </Link>
    </div>
  );
}
