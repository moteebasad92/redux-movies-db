import React, { useEffect, useRef } from 'react';

const ScoreCanvas = ({ percentage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const angle = (percentage / 100) * 360;
    const radius = canvas.width / 2;

    ctx.lineWidth = 10;
    ctx.strokeStyle = '#0f9d58';
    ctx.beginPath();
    ctx.arc(radius, radius, radius - ctx.lineWidth / 2, 0, angle * Math.PI / 180);
    ctx.stroke();
  }, [percentage]);

  return (
    <canvas id="score-canvas" ref={canvasRef} width={100} height={100} />
  );
};

export default ScoreCanvas;
