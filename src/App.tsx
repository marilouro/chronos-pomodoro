import { MessagesContainer } from "./components/MessagesContainer";
import { TaskContextProvider } from "./contexts/TaskContext/taskContextProvider";
import { MainRouter } from "./routers/MainRouters";
import "./styles/global.css";
import "./styles/theme.css";

export function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer>
        <MainRouter />
      </MessagesContainer>
    </TaskContextProvider>
  );
}
