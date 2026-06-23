"use client";

import React, { useEffect, useRef } from "react";

// declare global {
//   interface Window {
//     QRCode: any;
//   }
// }

export default function ConnectPage() {
  const qrRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (typeof window !== "undefined" && qrRef.current) {
  //     const script = document.createElement("script");
  //     script.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
  //     script.onload = () => {
  //       if (window.QRCode) {
  //         new window.QRCode(qrRef.current, {
  //           text: "https://card.sharadb.com.np",
  //           width: 180,
  //           height: 180
  //         });
  //       }
  //     };
  //     document.body.appendChild(script);
  //     return () => {
  //       if (document.body.contains(script)) {
  //         document.body.removeChild(script);
  //       }
  //     };
  //   }
  // }, []);

  const saveContact = () => {
    const contact = `BEGIN:VCARD
VERSION:3.0
FN:Sharad Bhandari
TEL:+9779761800749
EMAIL:contact@sharadb.com.np
URL:https://sharadb.com.np/
URL:https://www.linkedin.com/in/sharads28n/
URL:https://github.com/SharadS28N
END:VCARD`;

    const blob = new Blob([contact], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Sharad-Bhandari.vcf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      margin: 0,
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px 15px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
      color: "#111",
      background: "radial-gradient(circle at top, #ffffff, #f5f5f7 45%, #d1d5db)"
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        *{
          box-sizing:border-box;
        }

        .container{
          width:100%;
          max-width:430px;
          animation:appear 1s cubic-bezier(.2,.8,.2,1);
        }

        .card{
          background:rgba(255,255,255,.65);
          backdrop-filter:blur(50px);
          -webkit-backdrop-filter:blur(50px);
          border:1px solid rgba(255,255,255,.8);
          border-radius:35px;
          padding:35px 25px;
          text-align:center;
          box-shadow:0 40px 100px rgba(0,0,0,.12),inset 0 1px 2px rgba(255,255,255,.9);
        }

        @keyframes appear{
          from{opacity:0;transform:translateY(40px) scale(.95);}
          to{opacity:1;transform:none;}
        }

        .profile{
          width:145px;
          height:145px;
          border-radius:50%;
          object-fit:cover;
          border:5px solid rgba(255,255,255,.8);
          box-shadow:0 20px 40px rgba(0,0,0,.15);
          animation:float 5s ease-in-out infinite;
        }

        @keyframes float{
          50%{transform:translateY(-10px);}
        }

        h1{
          font-size:32px;
          margin:20px 0 5px;
          letter-spacing:-1px;
        }

        .subtitle{
          color:#555;
          font-size:16px;
        }

        .bio{
          margin-top:20px;
          line-height:1.6;
          color:#555;
        }

        .btn{
          display:flex;
          align-items:center;
          justify-content:center;
          gap:12px;
          width:100%;
          padding:15px;
          margin:12px 0;
          border-radius:18px;
          text-decoration:none;
          font-size:16px;
          color:#111;
          background:rgba(255,255,255,.55);
          border:1px solid rgba(0,0,0,.08);
          transition:.3s;
          cursor: pointer;
        }

        .btn:hover{
          transform:translateY(-3px);
          background:white;
        }

        .primary{
          background:#111;
          color:white;
        }

        .primary:hover{
          background:#FFF;
          color:#111;
        }

        svg{
          width:22px;
          height:22px;
          fill:none;
          stroke:currentColor;
          stroke-width:2;
        }

        .qr-box{
          margin-top:35px;
          padding:20px;
          display:inline-block;
          background:white;
          border-radius:25px;
          box-shadow:0 20px 40px rgba(0,0,0,.12);
        }

        #qrcode img{
          border-radius:10px;
        }

        .nfc-section{
          margin-top:35px;
        }

        .nfc-card{
          height:220px;
          border-radius:25px;
          padding:25px;
          text-align:left;
          color:white;
          background:linear-gradient(135deg,#111,#444);
          position:relative;
          overflow:hidden;
          box-shadow:0 25px 50px rgba(0,0,0,.25);
        }

        .nfc-card:before{
          content:"";
          position:absolute;
          width:200px;
          height:200px;
          right:-70px;
          top:-70px;
          background:rgba(255,255,255,.15);
          border-radius:50%;
        }

        .nfc-name{
          font-size:24px;
          font-weight:600;
          margin-top:40px;
        }

        .nfc-small{
          opacity:.7;
          margin-top:10px;
        }

        footer{
          margin-top:30px;
          font-size:13px;
          color:#777;
        }
      `}} />
      <div className="container">
        <div className="card">
          <img
            className="profile"
            src="https://avatars.githubusercontent.com/u/583231?v=4"
            alt="Sharad Bhandari"
          />
          <h1>Sharad Bhandari</h1>
          <div className="subtitle">
            Student • Developer • Freelancer
          </div>
          <p className="bio">
            Exploring technology, building ideas,
            and connecting with people.
          </p>
          <button className="btn primary" onClick={saveContact}>
            <svg viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Save Contact
          </button>
          <a className="btn" href="resume.pdf">
            <svg viewBox="0 0 24 24">
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Download Resume
          </a>
          <a className="btn" href="https://sharadb.com.np/" target="_blank">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
            </svg>
            Website
          </a>
          <a className="btn" href="https://www.linkedin.com/in/sharads28n/" target="_blank">
            <svg viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M8 10v8" />
              <path d="M8 7h.01" />
              <path d="M12 18v-5a3 3 0 0 1 6 0v5" />
            </svg>
            LinkedIn
          </a>
          <a className="btn" href="https://github.com/SharadS28N" target="_blank">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M9 18c-4 1-4-2-5-2" />
            </svg>
            GitHub
          </a>
          <a className="btn" href="mailto:contact@sharadb.com.np">
            <svg viewBox="0 0 24 24">
              <path d="M4 4h16v16H4z" />
              <path d="m4 6 8 6 8-6" />
            </svg>
            Email
          </a>
          {/* <h3>Scan To Connect</h3>
          <div className="qr-box">
            <div id="qrcode" ref={qrRef}></div>
          </div> */}
          {/* <div className="nfc-section">
            <h3>NFC Card Preview</h3>
            <div className="nfc-card">
              <div className="nfc-name">
                SHARAD BHANDARI
              </div>
              <div className="nfc-small">
                Tap To Connect
              </div>
            </div>
          </div> */}
          <footer>
            © Sharad Bhandari
          </footer>
        </div>
      </div>
    </div>
  );
}
