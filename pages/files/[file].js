import { getFile } from "../api/file"
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { upload } from '@vercel/blob/client';

export default function File ({ url, id }) {
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
      <h1>Your File</h1>
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
          <a href={url} download target="_blank">
            <button>Download</button>
          </a>

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
    </div>
  )
}

export async function getServerSideProps ({ params }) {
    const { blob } = await getFile(params.file);

    return {
        props: {
            id: params.file,
            url: blob
        }
    }
}