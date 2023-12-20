import { useMutation, useQueryClient } from "react-query";
import { removeTodo, switchTodo } from "../api/todos";
import { QUERY_KEY } from "./keys.constant";

export const useTodoQuery = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(removeTodo);
  const switchMutation = useMutation(switchTodo);

  return { deleteMutation, switchMutation };
};
