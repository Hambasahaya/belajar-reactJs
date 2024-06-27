import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'; 
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Admin() {
    return (
        <div className="userpages d-flex">
            <Sidebar/>
            <div className="adminmain d-flex flex-column">
            <Navbar/>
            </div>
        </div>
    );
}

