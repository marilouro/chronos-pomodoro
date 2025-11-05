import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { MainTemplate } from "../../templates/MainTemplate";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import type { SortTasksOptions } from "../../utils/sortTasks";
import { sortTasks } from "../../utils/sortTasks";
import styles from "./styles.module.css";

export function History() {
  const { state } = useTaskContext();
  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: "startDate",
        direction: "desc",
      };
    }
  );

  function handleSortTasks({ field }: Pick<SortTasksOptions, "field">) {
    const newDirection = sortTasksOptions.direction === "desc" ? "asc" : "desc";

    setSortTasksOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color="red"
              aria-label="Apagar histórico"
              title="Apagar histórico"
            />
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th
                  onClick={() => handleSortTasks({ field: "name" })}
                  className={styles.thSort}
                >
                  Tarefa ⇅
                </th>
                <th
                  onClick={() => handleSortTasks({ field: "duration" })}
                  className={styles.thSort}
                >
                  Duração ⇅
                </th>
                <th
                  onClick={() => handleSortTasks({ field: "startDate" })}
                  className={styles.thSort}
                >
                  Data ⇅
                </th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {sortTasksOptions.tasks.map((task) => {
                const taskTypeDictionary = {
                  workTime: "Foco",
                  shortBreakTime: "Descanso Curto",
                  longBreakTime: "Descanso Longo",
                };

                return (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration}min</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{getTaskStatus(task, state.activeTask)}</td>
                    <td>{taskTypeDictionary[task.type]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
