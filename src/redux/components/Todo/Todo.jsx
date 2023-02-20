import React from "react";
import HeightBox from "../common/HeightBox";
import { useNavigate } from "react-router-dom";
import {
  StyledDiv,
  StyledTitle,
  StyledContents,
  TodoButton,
  FlexButtonBox,
  LinkedP,
  FlexTitleBox,
} from "./styles";
import { useMutation, useQueryClient } from "react-query";
import { removeTodo, switchTodo } from "../../../api/todos";

/**
 * 컴포넌트 개요 : 메인 > TODOLIST > TODO. 할 일의 단위 컴포넌트
 * 2022.12.16 : 최초 작성
 *
 * @returns Todo 컴포넌트
 */
function Todo({ todo, isActive }) {
  const queryClient = useQueryClient();
  // 삭제 확인 용 메시지 관리

  const deleteMutation = useMutation(removeTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const switchMutation = useMutation(switchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  // hooks
  const navigate = useNavigate();

  // 완료, 취소를 handling하는 함수
  const handleSwitchButton = () => {
    const payload = {
      id: todo.id,
      isDone: !todo.isDone,
    };
    console.log(todo.id, !todo.isDone);
    switchMutation.mutate(payload);
  };

  // [삭제] 버튼 선택 시 호출되는 함수(user의 confirmation 필요)
  const handleRemoveButton = () => {
    deleteMutation.mutate(todo.id);
  };

  // [상세보기]를 선택하는 경우 이동하는 함수
  const handleDetailPageLinkClick = () => {
    navigate(`/${todo.id}`);
  };

  return (
    <StyledDiv>
      <FlexTitleBox>
        <StyledTitle>{todo.title}</StyledTitle>
        <LinkedP onClick={handleDetailPageLinkClick}>[상세보기]</LinkedP>
      </FlexTitleBox>
      <HeightBox height={10} />
      <StyledContents>{todo.contents}</StyledContents>
      <HeightBox height={20} />
      <FlexButtonBox>
        <TodoButton onClick={handleSwitchButton}>
          {isActive ? "완료" : "취소"}
        </TodoButton>
        <TodoButton onClick={handleRemoveButton}>삭제</TodoButton>
      </FlexButtonBox>
    </StyledDiv>
  );
}

export default Todo;
