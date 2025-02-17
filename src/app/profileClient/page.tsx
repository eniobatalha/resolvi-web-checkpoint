"use client";
import React, { useEffect, useState } from "react";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import Menu from "@/components/organisms/SidebarClient";
import Footer from "@/components/organisms/Footer";

import axiosInstance from "../../../axiosInstance";
import ProfileWorker from "@/components/organisms/ProfileWorker";
import ProfileClient from "@/components/organisms/ProfileClient";

export default function ProfilePage() {
  

  return (
    <>
      <MenuCompleto />
      <div className="flex min-h-screen">
        <Menu />
          <ProfileClient/>

      </div>
      <Footer profissional={false} />
    </>
  );
}
