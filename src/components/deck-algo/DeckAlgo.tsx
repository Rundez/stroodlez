import { useEffect, useRef, useState } from "react";
import { Button } from "../button";

const size = 5;

export const DeckAlgo = () => {
  const ref = useRef<number[]>();
  const intervalRef = useRef<NodeJS.Timer>();
  const [seconds, setSeconds] = useState(0);
  const [pause, setPause] = useState(true);
  const [sorted, setSorted] = useState(false);
  const [tries, setTries] = useState(0);
  const deckWorker = useRef<Worker>();

  useEffect(() => {
    ref.current = Array.from({ length: size }, (_, i) => i);
  }, []);

  useEffect(() => {
    deckWorker.current = new Worker("/worker.js");
  }, []);

  const start = () => {
    if (!pause) return;
    deckWorker?.current?.postMessage(ref.current);
    (deckWorker.current as Worker).onmessage = (e) => {
      if (e.data.finished) {
        setPause(true);
        setSorted(true);
        setTries(e.data.tries);
        clearInterval(intervalRef.current);
        return;
      } else {
        setTries(e.data.tries);
      }
    };

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

  const submit = () => {};

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Deck Algo</h1>

      <div className="flex justify-center gap-2">
        <Button onClick={start}>Start</Button>
        <Button onClick={stop}>Pause</Button>
      </div>

      <div>{seconds} seconds</div>
      <div>{sorted ? "Sorted" : pause ? "Paused" : "Shuffling"}</div>
      <div>Tries: {tries}</div>
      <div>
        {sorted && <Button onClick={() => submit()}>Submit score</Button>}
      </div>
    </div>
  );
};
