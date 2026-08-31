import React, { useRef, useState } from "react";
import "./Home.css";
import { upload_pdfs } from "../../../src/services/fetching";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Open the browser's file picker
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  // Handle files selected through the file picker
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(event.target.files);

    // Only allow PDF files
    const pdfFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf"
    );

    setFiles((previousFiles) => [...previousFiles, ...pdfFiles]);
  };

  // Handle files dropped into the upload area
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsDragging(false);

    const droppedFiles = Array.from(event.dataTransfer.files);

    const pdfFiles = droppedFiles.filter(
      (file) => file.type === "application/pdf"
    );

    setFiles((previousFiles) => [...previousFiles, ...pdfFiles]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Remove a selected PDF
  const removeFile = (index: number) => {
    setFiles((previousFiles) => previousFiles.filter((_, i) => i !== index));
  };

  // This will later send the PDFs to your Node backend
  const handleStartResearch = async () => {
    console.log("Files ready for upload:", files);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    //
    await upload_pdfs(formData);
    navigate("/chat");
    // fetch("http://localhost:3000/upload", {
    //   method: "POST",
    //   body: formData
    // });
  };

  return (
    <div className="research-page">
      {/* Main Content */}
      <main className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="badge">AI-Powered Research Assistant</div>

          <h1>
            Turn your research papers
            <br />
            into <span>knowledge.</span>
          </h1>

          <p>
            Upload your research papers and let ResearchMate help you
            understand, search, and explore them.
          </p>
        </section>

        <section className="upload-section">
          <div
            className={`upload-box ${isDragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
          >
            <div className="upload-icon">↑</div>

            <h2>Upload your research papers</h2>

            <p>
              Drag & drop your PDF files here
              <br />
              or click to browse
            </p>

            <button
              className="browse-button"
              onClick={(event) => {
                event.stopPropagation();
                handleBrowseClick();
              }}
            >
              Browse Files
            </button>

            <span className="file-info">PDF files only</span>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              multiple
              hidden
              onChange={handleFileChange}
            />
          </div>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="files-container">
              <div className="files-header">
                <h3>Selected Papers</h3>

                <span>
                  {files.length} {files.length === 1 ? "file" : "files"}
                </span>
              </div>

              <div className="file-list">
                {files.map((file, index) => (
                  <div className="file-item" key={`${file.name}-${index}`}>
                    <div className="pdf-icon">PDF</div>

                    <div className="file-details">
                      <p className="file-name">{file.name}</p>

                      <span className="file-size">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>

                    <button
                      className="remove-button"
                      onClick={() => removeFile(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Start Research */}
              <button className="research-button" onClick={handleStartResearch}>
                Start Research
                <span>→</span>
              </button>
            </div>
          )}
        </section>

        {/* Features */}
        <section className="features">
          <div className="feature-card">
            <div className="feature-icon">✦</div>

            <h3>Understand</h3>

            <p>
              Get clear explanations and summaries of complex research papers.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⌕</div>

            <h3>Search</h3>

            <p>
              Ask questions and find relevant information across your papers.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">◈</div>

            <h3>Connect</h3>

            <p>
              Discover relationships between different pieces of information.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
