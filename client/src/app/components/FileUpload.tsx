"use client";
import React, { useState } from "react";
import styles from "./FileUpload.module.css";

const FileUpload: React.FC = () => {
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileInput = event.target;
    if (!fileInput.files?.length) {
      setUploadStatus("Please select files to upload.");
      return;
    }

    setUploadStatus("Uploading files...");

    const files: { filename: string; content: string; contentType: string }[] =
      [];
    const fileArray = Array.from(fileInput.files); // Convert FileList to Array
    for (const file of fileArray) {
      const reader = new FileReader();
      reader.onload = (e) => {
        files.push({
          filename: file.name,
          content: (e.target?.result as string).split(",")[1], // Base64 encoded content
          contentType: file.type,
        });
      };
      reader.readAsDataURL(file);
    }

    // Wait for all files to be read
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const apiEndpoint =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/upload"
        : "https://1veqm1rkph.execute-api.us-east-1.amazonaws.com/upload";

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files }),
      });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus(`Files uploaded successfully: ${result.message}`);
      } else {
        setUploadStatus("File upload failed.");
      }
    } catch (error) {
      setUploadStatus("Error uploading files.");
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        multiple
        onChange={handleFileUpload}
        className={styles.fileInput}
      />
      <p className={styles.uploadStatus}>{uploadStatus}</p>
    </div>
  );
};

export default FileUpload;
