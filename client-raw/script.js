async function handleFileUpload() {
  const fileInput = document.getElementById("fileInput");
  const uploadStatus = document.getElementById("uploadStatus");

  if (!fileInput.files.length) {
    uploadStatus.innerHTML = "Please select files to upload.";
    return;
  }

  uploadStatus.innerHTML = "Uploading files...";

  const files = [];
  for (const file of fileInput.files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      files.push({
        filename: file.name,
        content: e.target.result.split(",")[1], // Base64 encoded content
        contentType: file.type,
      });
    };
    reader.readAsDataURL(file);
  }

  console.log(files);
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
    console.log(response);
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
