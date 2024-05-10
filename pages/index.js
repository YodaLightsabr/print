import { useState } from "react";

export default function Home () {
  const [jobId, setJobId] = useState("");
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      inset: "0"
    }}>
      <h1>Print</h1>
      <p>Upload your files to print them on a shared computer.</p>
      <div style={{
        background: "var(--background-alt)",
        display: "flex",
        padding: "20px",
        gap: "20px",
        borderRadius: "6px",
        flexDirection: "row",
        width: "700px",
        maxWidth: "calc(100vw - 100px)"
      }}>
        <div style={{
          display: "flex",
          flexGrow: "1",
          height: "300px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}>
          <h2 style={{ marginTop: "0px" }}>Upload a File</h2>
          <p style={{ margin: "0px" }}>Drag & drop or</p>
          <button style={{ marginTop: "4px" }}>select from computer</button>
        </div>
        <div style={{
          width: "1px",
          height: "100%",
          background: "var(--text-muted)",
          borderRadius: "1px",
        }} />
        <div style={{
          display: "flex",
          flexGrow: "1",
          height: "300px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}>
          <h2 style={{ marginTop: "0px" }}>Print a File</h2>
      <input placeholder="Job ID" value={jobId} onChange={e => setJobId(e.target.value.toUpperCase().substring(0, 5))} style={{
        textAlign: "center"
      }} />
        </div>
      </div>
    </div>
  )
}