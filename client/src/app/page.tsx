"use client";

import React from "react";
import FileUpload from "./components/FileUpload";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Share Your Photos with the Bride and Groom!</h1>
      <FileUpload />
    </div>
  );
};

export default HomePage;
