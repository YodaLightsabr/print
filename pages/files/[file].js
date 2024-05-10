import { getFile } from "../api/file"
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { upload } from '@vercel/blob/client';
import Link from "next/link";

export default function File ({ url, id, downloadUrl, error }) {
  if (error) {
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
        }}>Not Found</h1>
        <p>The file by the ID <code>{id}</code> does not exist or has expired.</p>
        
        <Link href="/">
          <button style={{
            marginTop: "20px"
          }}>Try again</button>
        </Link>
      </div>
    )
  }

  const frameRef = useRef(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileUrl = URL.createObjectURL(blob);

      frameRef.current.src = fileUrl;

      frameRef.current.onload = () => {
        if (!frameRef.current.contentDocument.head) return;
        frameRef.current.contentDocument.head.innerHTML = /*html*/`
          <style>
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          </style>
        `;
      }
    })();
  })

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
      }}>Your File</h1>
      <p>Print it or download it</p>
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
        }}>
          <h2 style={{ marginTop: "0px" }}>Download & Print</h2>

          <iframe ref={frameRef} scrolling="no" style={{
            border: "none",
            marginBottom: "16px",
            pointerEvents: "none",
            userSelect: "none"
          }} />

          <div style={{
            display: "flex",
            gap: "10px",
            flexDirection: "row"
          }}>
            <a href={downloadUrl} download>
              <button>Download</button>
            </a>

            <button onClick={() => {
              frameRef.current.contentWindow.print();
            }}>Print</button>
          </div>
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
          <h2 style={{ marginTop: "0px" }}>Your File ID is <code>{id}</code></h2>
          <p style={{ margin: "0px" }}>Your file will be valid for 30 minutes.</p>
         
        </div>
      </div>

      <Link href="/">
        <button style={{
          marginTop: "20px"
        }}>Upload another file</button>
      </Link>
    </div>
  )
}

export async function getServerSideProps ({ params }, res) {
    const blob = await getFile(params.file);

    return {
        props: {
            error: blob === null,
            id: params.file,
            url: blob?.blob?.url || null,
            downloadUrl: blob?.blob?.downloadUrl || null
        }
    }
}