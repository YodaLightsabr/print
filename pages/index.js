import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { upload } from '@vercel/blob/client';

export default function Home () {
  const [jobId, setJobId] = useState("");
  const [drag, setDrag] = useState(false);
  const inputFileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setLoadingProgress(Date.now());
    }, 100);
  });

  const router = useRouter();

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
      <h1 style={{
        marginBottom: "0px"
      }}>Print</h1>
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
          width: "100%",
          ...(drag ? {
            border: "3px dashed var(--links)"
          } : {
            border: "3px solid transparent"
          })
        }} onDragOver={e => {
          setDrag(true);
          e.preventDefault();
        }} onDragLeave={() => setDrag(false)} onDrop={e => {
          inputFileRef.current.files = e.dataTransfer.files;
          inputFileRef.current.form.requestSubmit();
          e.preventDefault();
        }}>
          <h2 style={{ marginTop: "0px" }}>Upload a File</h2>
          {loading ? <>
            <p>Uploading...</p>
            <progress value={95 - 2 ** (6.5 - (loadingProgress - loading) / 750)} max={100} />
          </> : <>
            <p style={{ margin: "0px" }}>Drag & drop or</p>
            <button style={{ marginTop: "4px" }} onClick={() => {
              inputFileRef.current.click();
              inputFileRef.current.form.requestSubmit();
            }}>select from computer</button>
          </>}

          <form
            onSubmit={async (event) => {
              event.preventDefault();

              setDrag(false);
              setLoading(Date.now());
    
              const file = inputFileRef.current.files[0];
    
              const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload'
              });

              const { id } = await fetch("/api/save", {
                headers: {
                  'Content-Type': "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                  blob: newBlob
                })
              }).then(res => res.json());
    
              router.push(`/files/${id}`);
            }} style={{
              display: "none"
            }}
          >
            <input name="file" ref={inputFileRef} type="file" />
          </form>
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
          <p style={{ margin: "0px" }}>Enter the File ID</p>
          <input placeholder="File ID" value={jobId} onChange={e => {
            const id = e.target.value.toUpperCase().substring(0, 5);
            setJobId(id);

            if (id.length === 5) {
              router.push(`/files/${id}`);
            }
          }} style={{
            textAlign: "center",
            marginTop: "4px"
          }} />
        </div>
      </div>
    </div>
  )
}