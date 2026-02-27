import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import axios from "axios";

const Profile = () => {

  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get("https://opp-server.vercel.app/users")
        .then((res) => {
          const currentUser = res.data.find(
            (u) => u.email === user.email
          );
          setUserData(currentUser);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  if (!userData) {
    return (
      <div className="text-center mt-20 text-lg font-bold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">

        <div className="text-center mb-8">
          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 border"
          />
          <h2 className="text-2xl font-black text-slate-900">
            {userData.name}
          </h2>
          <p className="text-slate-500 text-sm">
            {userData.email}
          </p>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 space-y-3 text-sm font-semibold">

          <div className="flex justify-between">
            <span>Role:</span>
            <span className={`px-3 py-1 rounded-full text-xs ${
              userData.role === "admin"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}>
              {userData.role}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Last Login:</span>
            <span>
              {new Date(userData.lastLogin).toLocaleString()}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;