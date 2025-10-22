import "./styles/theme.css";
import "./styles/global.css";
import { Container } from "./components/Container/index.tsx";
import { Menu } from "./components/Menu";
import { Logo } from "./components/Logo";
import { CountDown } from "./components/CountDown";
import { DefaultInput } from "./components/DefaultInput";
import { Cycles } from "./components/Cycles";
import { DefaultButton } from "./components/DefaultButton";
import { PlayCircleIcon } from "lucide-react";
import { StopCircleIcon } from "lucide-react";

export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      <Container>
        <CountDown />
      </Container>

      <Container>
        <form className="form" action="">
          <div className="formRow">
            <DefaultInput
              labelText="task"
              id="input"
              type="text"
              placeholder="Digite"
            />
          </div>

          <div className="formRow">
            <p>loren ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>

          <div className="formRow">
            <Cycles />
          </div>

          <div className="formRow">
            <DefaultButton icon={<PlayCircleIcon />} color="green" />
            <DefaultButton icon={<StopCircleIcon />} color="red" />
          </div>
        </form>
      </Container>
    </>
  );
}
