import IUserState from "../types/IUserState";
import User from "../types/User";
import { ADD_USER, EDIT_USER, DELETE_USER } from "./constantActions";


const initialState: IUserState = {
  users: [
    {
      id: 1,
      firstName: "Niraimathi",
      lastName: "Sankar",
      email: "nirai30@gmail.com",
      mobileNumber: "7868840529",
      gender: "Female",
      password: "Test123",
    },
    {
      id: 2,
      firstName: "Veluprasanth",
      lastName: "Sankar",
      email: "velu24@gmail.com",
      mobileNumber: "78688984529",
      gender: "Male",
      password: "Tesdf#23",
    },
  ],
};

export default function userReducer(
  state = initialState,
  action: { type: string; payload: User }
) {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }
    case EDIT_USER: {
      return {
        ...state,
        users: state.users.map((element) =>
          element.id !== action.payload.id ? element : action.payload
        ),
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        users: state.users.filter((element) => element.id !== action.payload.id),
      };
    }
    default:
      return state;
  }
}
