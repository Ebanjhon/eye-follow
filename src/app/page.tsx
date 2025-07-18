'use client';
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const boxRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef({ x: 0, y: 0 });// điểm nằm giữa của mắt
  const [eyeDeg, setEyeDeg] = useState(0); // độ của măt

  useEffect(() => {
    const updateCenter = () => {
      if (boxRef.current) {
        const rect = boxRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        centerRef.current = { x: centerX, y: centerY };
      }
    };

    updateCenter();
    window.addEventListener("resize", updateCenter);
    return () => window.removeEventListener("resize", updateCenter);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMove = (event: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        let dx = event.clientX - centerRef.current.x;
        let dy = event.clientY - centerRef.current.y;
        let radian = Math.atan2(dy, dx);
        let rot = (radian * 180) / Math.PI + 90;
        setEyeDeg(rot);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-[radial-gradient(at_center,_#0600AB,_#00033D)] flex justify-center items-center gap-3">
      <div className="eye-ball w-50 h-50 rounded-full">
        <div style={{ transform: `rotate(${eyeDeg}deg)` }}
          ref={boxRef}
          className="w-50 h-50 bg-amber-50 rounded-full items-center flex justify-center">
          <div className="w-40 h-40  rounded-full flex justify-center">
            <div style={{ transform: `rotate(${-eyeDeg}deg)` }}
              className="w-15 h-15 bg-black rounded-full" >
              <div className="w-5 h-5 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="eye-ball w-50 h-50 rounded-full">
        <div style={{ transform: `rotate(${eyeDeg}deg)` }}
          ref={boxRef}
          className="w-50 h-50 bg-amber-50 rounded-full items-center flex justify-center">
          <div className="w-40 h-40  rounded-full flex justify-center">
            <div style={{ transform: `rotate(${-eyeDeg}deg)` }}
              className="w-15 h-15 bg-black rounded-full" >
              <div className="w-5 h-5 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}