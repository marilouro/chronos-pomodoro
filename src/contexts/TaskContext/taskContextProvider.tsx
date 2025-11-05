import { useEffect, useReducer, useRef } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { loadBeep } from "../../utils/loadBeep";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { initialTaskState } from "./initialTaskState";
import { TaskActionTypes } from "./taskActions";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem("state");

    if (storageState === null) return initialTaskState;

    const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00",
    };
  });

  const playBeepRef = useRef<() => void | null>(null);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((e) => {
    const countDownSeconds = e.data;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) playBeepRef.current();
      dispatch({ type: TaskActionTypes.COMPLETE_TASK });
      worker.terminate();
      playBeepRef.current = null;
    } else {
      dispatch({
        type: TaskActionTypes.COUNTDOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));

    if (!state.activeTask) {
      worker.terminate();
    }

    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      {
        playBeepRef.current = null;
      }
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
