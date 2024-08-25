// Function to handle file upload
async function handleFileUpload() {
  const fileInput = document.getElementById("fileInput");
  const uploadStatus = document.getElementById("uploadStatus");

  if (!fileInput.files.length) {
    uploadStatus.innerHTML = "Please select files to upload.";
    return;
  }

  uploadStatus.innerHTML = "Uploading files...";

  const formData = new FormData();
  for (const file of fileInput.files) {
    formData.append("files", file);
  }

  try {
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      uploadStatus.innerHTML = `Files uploaded successfully: ${result.files.join(
        ", "
      )}`;
    } else {
      uploadStatus.innerHTML = "File upload failed.";
    }
  } catch (error) {
    uploadStatus.innerHTML = "Error uploading files.";
    console.error("Error:", error);
  }
}

// Attach event listeners
document
  .getElementById("uploadButton")
  .addEventListener("click", handleFileUpload);
