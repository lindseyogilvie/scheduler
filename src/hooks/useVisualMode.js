import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    
    if (replace) {
      const historyToUpdate = [...history];
      historyToUpdate.pop();
      setHistory([...historyToUpdate, mode]);
      setMode(mode);
      return
    }

    setMode(mode);
    setHistory(prev => ([...prev, mode]));
  }

  const back = () => {
    if (history.length > 1) {
      const historyToUpdate = [...history];
      historyToUpdate.pop();
      setMode(historyToUpdate[historyToUpdate.length-1]);
      setHistory(historyToUpdate);
    }
  }

  return { 
    mode, 
    transition,
    back 
  };
  
}