"use client";
import React from "react";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const SuperAdminSidebar = ({ isOpen, toggle }: SidebarProps) => {
  return <div>SuperAdminSidebar</div>;
};

export default SuperAdminSidebar;
