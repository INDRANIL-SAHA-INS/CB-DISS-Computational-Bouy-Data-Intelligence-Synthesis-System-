import React from "react";

const Globe: React.FC = () => {
  return (
    <>
      <style jsx>{`
        @keyframes earthRotate {
          0% { background-position: 0 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes twinkling { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
        @keyframes twinkling-slow { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
        @keyframes twinkling-long { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
        @keyframes twinkling-fast { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
      `}</style>
      <div className="flex items-center justify-center w-full h-full">
        <div
          className="relative rounded-full overflow-hidden"
          style={{
            width: 'clamp(100px, 18vw, 250px)',
            height: 'clamp(100px, 18vw, 250px)',
            aspectRatio: '1/1',
            boxShadow: '0 0 30px rgba(255,255,255,0.3), -5px 0 8px #c3f4ff inset, 15px 2px 25px #000 inset, -24px -2px 34px #c3f4ff99 inset, 250px 0 44px #00000066 inset, 150px 0 38px #000000aa inset',
            backgroundImage: "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "left",
            animation: "earthRotate 30s linear infinite",
            filter: 'brightness(1.4) saturate(1.2)',
          }}
        >
          {/* Stars */}
          <div
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: '-20px', animation: "twinkling 3s infinite" }}
          />
          <div
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: '-40px', top: '30px', animation: "twinkling-slow 2s infinite" }}
          />
          <div
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: '90%', top: '30%', animation: "twinkling-long 4s infinite" }}
          />
          <div
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: '70%', top: '95%', animation: "twinkling 3s infinite" }}
          />
          <div
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: '15%', top: '90%', animation: "twinkling-fast 1.5s infinite" }}
          />
          <div
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: '80%', top: '-15px', animation: "twinkling-long 4s infinite" }}
          />
          <div
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: '95%', top: '20%', animation: "twinkling-slow 2s infinite" }}
          />
        </div>
      </div>
    </>
  );
};

export default Globe;