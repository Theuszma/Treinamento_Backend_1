"use client";
import React, { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 20;
const TILE_SIZE = 20; // in pixels

type Position = { x: number; y: number };

interface SnakeGameProps {
  onWin: () => void;
}

export default function SnakeGame({ onWin }: SnakeGameProps) {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 0, y: -1 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  
  // ✅ CORREÇÃO AQUI: Initialize the ref with null and allow its type to be null.
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const createFood = () => {
    let newFoodPosition: Position;
    do {
      newFoodPosition = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
    setFood(newFoodPosition);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  const moveSnake = () => {
    if (isGameOver) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 1);
        createFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  useEffect(() => {
    if (!isGameOver) {
      gameLoopRef.current = setInterval(moveSnake, 200);
      return () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      };
    }
  }, [snake, direction, isGameOver]);
  
  useEffect(() => {
    if (score >= 3) {
      setIsGameOver(true);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      onWin();
    }
  }, [score, onWin]);

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setIsGameOver(false);
    createFood();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-xl mb-2">Pontos: {score}</div>
      <div className="bg-gray-200 border-4 border-gray-800 relative" style={{ width: GRID_SIZE * TILE_SIZE, height: GRID_SIZE * TILE_SIZE }}>
        {snake.map((segment, index) => (
          <div key={index} className="absolute bg-green-500" style={{ left: segment.x * TILE_SIZE, top: segment.y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE }} />
        ))}
        <div className="absolute bg-red-500" style={{ left: food.x * TILE_SIZE, top: food.y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE }} />
        {isGameOver && score < 3 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
            <div className="text-3xl font-bold">Fim de Jogo</div>
            <button onClick={restartGame} className="mt-4 px-4 py-2 bg-blue-500 rounded">Tentar Novamente</button>
          </div>
        )}
      </div>
    </div>
  );
}