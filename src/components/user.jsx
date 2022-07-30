import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";

const User = (props) => { 
    const navigate = useNavigate()
    const params = useParams();
    const [user, setUser] = useState({});

  useEffect(async () => {
    const response = await axios.get(
      `https://reqres.in/api/users/${params.id}`
    );
    setUser(response.data.data);
  }, []);

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
        onClick={() => {
          this.handleUpdate(user);
        }}
        className="btn btn-sm btn-primary m-2"
      >
        update
      </button>
      <button
        onClick={() => {
          this.handleDelete(user);
        }}
        className="btn btn-sm btn-danger m-2"
      >
        delete
      </button>
     <button className="btn btn-warning" onClick={()=>{navigate('/users')}}>users</button>
    </div>
  );

}; 

export default User;
