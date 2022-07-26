import { useEffect, useRef, useState } from "react";
import { Button } from "../button";

const size = 3;

export const DeckAlgo = () => {
  const ref = useRef<number[]>();
  const intervalRef = useRef<NodeJS.Timer>();
  const [seconds, setSeconds] = useState(0);
  const [pause, setPause] = useState(true);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    ref.current = Array.from({ length: size }, (_, i) => i);
  }, []);

  const start = async () => {
    if (pause === false) return;

    setPause(false);
    while (!sorted) {
      await shuffle();
    }

    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    intervalRef.current = interval;

    return () => clearInterval(interval);
  };

  const stop = () => {
    setPause(true);
    clearInterval(intervalRef.current);
  };

  const shuffle = () => {
    const shuffled = ref?.current?.slice().sort(() => Math.random() - 0.5);
    if (shuffled?.toString() === ref?.current?.toString()) {
      console.log("It's a match");
      console.log("new shuffle", shuffled);
      console.log("old shuffle", ref.current);
      setPause(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Deck Algo</h1>

      <div className="flex justify-center gap-2">
        <Button onClick={start}>Start</Button>
        <Button onClick={stop}>Pause</Button>
      </div>

      <div>{seconds}</div>
      <div>{sorted ? "Sorted" : "Not sorted"}</div>
    </div>
  );
};
