import React, { useEffect, useRef } from 'react';

interface WavyBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: number;
  waveOpacity?: number;
}

export const WavyBackground: React.FC<WavyBackgroundProps> = ({
  children,
  className = '',
  containerClassName = '',
  colors = ['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee'],
  waveWidth = 50,
  backgroundFill = 'black',
  blur = 10,
  speed = 1,
  waveOpacity = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let nt = 0;

    const resizeCanvas = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);

    const getColor = (index: number) => {
      return colors[index % colors.length];
    };

    const drawWave = (n: number) => {
      nt += speed;
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = getColor(i);
        ctx.globalAlpha = waveOpacity;
        
        for (let x = 0; x < w; x += 5) {
          const y = h / 2 + Math.sin((x * 0.01) + (nt * 0.01) + (i * 0.5)) * 100 * Math.sin((nt * 0.007) + (i * 0.3));
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      ctx.fillStyle = backgroundFill;
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, w, h);
      
      if (blur > 0) {
        ctx.filter = `blur(${blur}px)`;
      }
      
      drawWave(5);
      
      ctx.filter = 'none';
      animationIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [colors, waveWidth, backgroundFill, blur, speed, waveOpacity]);

  return (
    <div className={`relative ${containerClassName}`}>
      <canvas
        className={`absolute inset-0 z-0 ${className}`}
        ref={canvasRef}
        style={{
          filter: `blur(${blur}px)`,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
