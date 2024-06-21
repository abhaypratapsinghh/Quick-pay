import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SubmitButton from "./submitButton";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState("");

  const navigate = useNavigate();

  useEffect(
    () => async () => {
      const data = await axios({
        method: "GET",
        url: "http://localhost:3000/api/v1/user/bulk?filter=" + filters,
        headers:{
          Authorization:"Bearer " + localStorage.getItem("token")
        }
      });

      setUsers(data.data.user);
    },
    [filters]
  );

  return (
    <div className="text-left">
      <div className="font-bold py-1">Users</div>
      <input
        onChange={(e) => setFilters(e.target.value)}
        className="border w-[100%] py-1 rounded-md border-slate-500"
        type="text"
        placeholder="Search Users....."
      ></input>

      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );







  function User({ user }) {
    return (
      <div className="flex justify-center justify-between border mt-2 rounded-md text-lg">
        <div className="flex justify-center items-center">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
              {user.firstName[0]}
            </div>
          </div>
          <div className=" flex items-center">
            {user.firstName} {user.lastName}
          </div>
        </div>

        <div>
          <SubmitButton
            onClick={(e) => {
              navigate("/send?name=" + user.firstName +"&id=" + user._id);
            }}
            label={"Send"}
          />
        </div>
      </div>
    );
  }
}
