/** @jsxImportSource https://esm.sh/react@18.2.0 */
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import React, { useState } from "https://esm.sh/react@18.2.0";

const NO_PHRASES = [
  "Beneran?",
  "Beneran banget? 🥺",
  "Kamu nolak aku nihh?? 🥺",
  "Tombol warna ijo menarik lohhh 🥺",
  "Aku sedih nih :(",
  "Gimana kalo dipikirin lagi?",
  "Tidaaaaaaaaak",
];
const hearts = [];

function App() {
  const [noClicks, setNoClicks] = useState(0);
  const [isValentine, setIsValentine] = useState(false);
  const yesButtonSize = (noClicks * 20) + 16;
  const [showHearts, setShowHearts] = useState(false);

  const firstImg =
    "https://i.ibb.co.com/0jCcMkYk/Whats-App-Image-2026-02-06-at-15-29-58.jpg";
  const secondImg =
    "https://i.ibb.co.com/Z161YFHg/Whats-App-Video2026-02-06at15-38-20-ezgif-com-video-to-gif-converter.gif";

  const handleNo = () => {
    setNoClicks((prev) => prev + 1);
  };

  const handleYes = () => {
    setIsValentine(true);

  for (let i = 0; i < 40; i++) {  // 40 hati biar lebih rame, sesuaikan aja
    const heart = document.createElement('div');
    heart.className = 'heart';
    const emojis = ['💖', '❤️', '💕', '💘', '🥰', '💗', '💓'];
    heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 4 + 2) + 's';
    heart.style.animationDelay = Math.random() * 1.2 + 's';
    heart.style.transform = `translateX(-50%) rotate(${Math.random() * 60 - 30}deg)`;
    heart.style.fontSize = (Math.random() * 1.5 + 1.8) + 'rem';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      {!isValentine
        ? (
          <>
            <img
              src={firstImg}
              alt="Gambar romantis" // tambahin alt biar bagus
              style={{
                maxWidth: "90%", // max 90% lebar layar
                maxHeight: "50vh", // max 50% tinggi viewport (supaya ga nutup teks)
                height: "auto", // jaga proporsi
                width: "auto", // biar ga dipaksa
                objectFit: "contain", // gambar tetap utuh, ga kepotong
                borderRadius: "12px", // optional: biar cantik
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)", // optional efek
                marginBottom: "20px",
              }}
            />
            <h1>Kamu Mau jadi valentine ku ga? 💘</h1>
            <div>
              <button
                onClick={handleYes}
                style={{
                  fontSize: `${yesButtonSize}px`,
                  margin: "10px",
                  padding: "10px 20px",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={handleNo}
                style={{
                  fontSize: "16px",
                  margin: "10px",
                  padding: "10px 20px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {noClicks === 0
                  ? "No"
                  : NO_PHRASES[Math.min(noClicks - 1, NO_PHRASES.length - 1)]}
              </button>
            </div>
          </>
        )
        : (
          <>
            <img src={secondImg} />
            <div
              style={{
                fontSize: "48px",
                color: "pink",
                fontWeight: "bold",
              }}
            >
              Yay!!! 💖🎉
            </div>
          </>
        )}
    </div>
  );
}

function client() {
  createRoot(document.getElementById("root")).render(<App />);
}
if (typeof document !== "undefined") client();

export default async function server(request: Request): Promise<Response> {
  return new Response(
    `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Valentine's Day Invitation</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      overflow: hidden;
      background: linear-gradient(to bottom, #fff0f5, #ffe4e1);
    }
    .heart {
      position: fixed;
      top: 100vh;
      pointer-events: none;
      z-index: 9999;
      animation: flyHeart linear forwards;
    }
    @keyframes flyHeart {
      0% {
        opacity: 1;
        transform: translate(-50%, 0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -150vh) scale(0.3) rotate(720deg);
      }
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script src="https://esm.town/v/std/catch"></script>
  <script type="module" src="${import.meta.url}"></script>
</body>
</html>`,
    {
      headers: { "content-type": "text/html" },
    }
  );
}