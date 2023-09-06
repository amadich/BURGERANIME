import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface UserData {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  ranks: {
    admin: number;
    helper: number;
    demo: number;
    vip: number;
  };
  datecreate: string;
}

interface DecodedObject {
   id: string;
   avatar: string;
   ranks: {
     admin: number;
     demo: number;
     vip: number;
   };
}

export default function Showallusers() {
  const SERVER = import.meta.env.VITE_HOSTSERVER;
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const token = window.localStorage.getItem("token");
  const [decoded, setDecoded] = useState<DecodedObject | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken as DecodedObject);

        if (Number(decoded?.ranks.admin) === 0) {
          window.location.href = "/";
        } else {
          axios.get(`${SERVER}/api/profile/getall`)
            .then((response) => {
              setUsers(response.data.users);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      window.location.href = "/";
    }
  }, [token]);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user._id.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <>
      <div className="flex justify-around items-center mt-10 p-10 select-none">
         
        <input
          type="text"
          placeholder="Search by name , Email or ID"
          value={searchTerm}
          className="input w-[70%] bg-transparent outline-none border-b border-b-blue-500 text-white"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

         <Link to="/dashboard" >
         <button className="btn btn-warning duration-500 hover:btn-primary">Dashboard</button>
         </Link>

      </div>
      <div className="overflow-x-auto ">
        <table className="table table-xs text-white font-bold ">
          <thead className="text-blue-500">
            <tr>
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>Avatar</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Helper</th>
              <th>VIP</th>
              <th>Demo</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user: UserData, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <th>{user._id}</th>
                <td>{user.username}</td>
                <Link to={`/profile/${user._id}`}>
                  <td>
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                          <img
                          draggable={false} 
                          src={user.avatar} />
                      </div>
                    </label>
                  </td>
                </Link>
                <td>{user.email}</td>
                <td>{user.ranks.admin === 1 ? <span className="text-red-500">Yes</span> : "No"}</td>
                <td>{user.ranks.helper === 1 ? <span className="text-blue-600">Yes</span> : "No"}</td>
                <td>{user.ranks.vip === 1 ?   <span className="text-green-500">Yes</span> : "No"}</td>
                <td>{user.ranks.demo === 1 ?  <span className="text-yellow-500">Yes</span> : "No"}</td>
                <td>{user.datecreate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
