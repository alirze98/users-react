import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UsersContext from "../store/usersContext";

const User = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState({});
  const usersCntx = useContext(UsersContext);

  useEffect(async () => {
    const response = await axios.get(
      `https://reqres.in/api/users/${params.id}`
    );
    setUser(response.data.data);
  }, []);
  async function handleUpdate(){
    const newUser = { 
       avatar:'https://picsum.photos/200/300',
       first_name:'updated',
       last_name:'user',
       email:'updatedUser@gmail.com'
    };
    const response = await axios.put('https://reqres.in/api/users/${params.id}',newUser);
    setUser(response.data)
  }

  return (
    <div className="col-4 text-center p-5">
      <img src={user.avatar} style={{ borderRadius: "50%", width: "100px" }} />
      <Link to={`/users/${user.id}`}>
        <h4>
          {user.first_name} {user.last_name}
        </h4>
      </Link>
      <h3>{user.email}</h3>
      <button
        onClick={handleUpdate}
        className="btn btn-sm btn-primary m-2"
      >
        update
      </button>
      <button
        className="btn btn-warning"
        onClick={() => {
          navigate("/users");
        }}
      >
        users
      </button>
    </div>
  );
};

export default User;
