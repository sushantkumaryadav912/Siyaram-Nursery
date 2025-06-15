"use client";

import { DashboardSidebar, CustomButton } from "@/components";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3001/api/users");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
        toast.success("User deleted");
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h2>Users</h2>
        <Link href="/admin/users/new">
          <CustomButton text="Add New User" />
        </Link>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link href={`/admin/users/${user.id}`}>Edit</Link>
                  <CustomButton text="Delete" onClick={() => handleDelete(user.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;