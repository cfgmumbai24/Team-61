import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {collection, getDocs} from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  const { currentUser, currentUserDetails } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);
        const arr = []
        snapshot.forEach((doc) => {
            arr.push({...doc.data(), id:doc.id});
          });
        setUsers(arr);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h4>Current User</h4>
      <p>{JSON.stringify(currentUserDetails)}</p>

      <h4>All Users</h4>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{JSON.stringify(user)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
