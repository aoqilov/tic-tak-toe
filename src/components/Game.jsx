import React, { useState } from "react";
import "./game.css";
import Circle from "../assets/circle.png";
import Cross from "../assets/cross.png";

const Game = () => {
  const [data, setData] = useState(Array(9).fill("")); // 9 ta bo'sh hujayra
  const [lock, setLock] = useState(false); // O'yinni bloklash
  const [count, setCount] = useState(0); // Harakatlar sanog'i

  // Foydalanuvchi harakati
  const toggle = (num) => {
    if (lock || data[num] !== "") return; // Hujayra bo'sh bo'lmasa, qaytadi
    const newData = [...data];
    newData[num] = "x"; // Foydalanuvchi "X" o'ynaydi
    setData(newData);
    setCount(count + 1);

    if (checkWin(newData, "x")) {
      setLock(true);
      alert("Siz g'alaba qozondingiz!");
      return;
    }

    // Agar o'yin davom etsa, kompyuter harakati
    if (count < 8) {
      setTimeout(() => computerMove(newData), 500); // Kompyuter biroz kutib o'ynaydi
    }
  };

  // Kompyuter harakati
  const computerMove = (currentData) => {
    const emptyCells = currentData
      .map((cell, index) => (cell === "" ? index : null))
      .filter((i) => i !== null);
    const randomIndex =
      emptyCells[Math.floor(Math.random() * emptyCells.length)]; // Tasodifiy bo'sh joyni tanlaydi

    const newData = [...currentData];
    newData[randomIndex] = "o"; // Kompyuter "O" o'ynaydi
    setData(newData);
    setCount(count + 1);

    if (checkWin(newData, "o")) {
      setLock(true);
      alert("Kompyuter g'alaba qozondi!");
    }
  };

  // G'alaba tekshiruvi
  const checkWin = (board, player) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombos.some((combo) =>
      combo.every((index) => board[index] === player)
    );
  };

  return (
    <div className="container">
      <h1 className="title">
        <span>X va O</span> oyini
      </h1>
      <div className="board">
        {data.map((cell, index) => (
          <div
            key={index}
            className="boxes"
            onClick={() => toggle(index)}
            dangerouslySetInnerHTML={{
              __html:
                cell === "x"
                  ? `<img src="${Cross}" />`
                  : cell === "o"
                  ? `<img src="${Circle}" />`
                  : "",
            }}
          ></div>
        ))}
      </div>
      <button
        className="reset"
        onClick={() => {
          setData(Array(9).fill(""));
          setLock(false);
          setCount(0);
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Game;
