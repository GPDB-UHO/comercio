import { useState, useReducer } from "react";

export function useToggleState() {
  const [state, setState] = useState(false);

  return [state, () => setState(true), () => setState(false)];
}

export function useData(initial) {
  return useReducer(
    (oldData, newData) => ({ ...oldData, ...newData }),
    initial
  );
}
