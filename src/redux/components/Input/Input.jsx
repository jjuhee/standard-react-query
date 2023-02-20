import React, { useState } from "react";
import LabledInput from "../common/LabledInput";
import HeightBox from "../common/HeightBox";
import { StyledButton } from "./styles";
import { FlexDiv } from "./styles";
import RightMarginBox from "../common/RightMarginBox";
import "./styles";
import { StyledDiv } from "./styles";
import { addTodo } from "../../../api/todos";
import { useMutation, useQueryClient } from "react-query";

/**
 * 컴포넌트 개요 : Todo 메인 페이지에서 제목과 내용을 입력하는 영역
 * 2022.12.16 : 최초 작성
 *
 * @returns Input 컴포넌트
 */
function Input() {
  const queryClient = useQueryClient();

  const mutation = useMutation(addTodo, {
    onSuccess: (data) => {
      console.log("data", data);
      queryClient.invalidateQueries("todos");
    },
  });

  // 컴포넌트 내부에서 사용할 state 2개(제목, 내용) 정의
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // 에러 메시지 발생 함수
  const getErrorMsg = (errorCode, params) => {
    switch (errorCode) {
      case "01":
        return alert(
          `[필수 입력 값 검증 실패 안내]\n\n제목과 내용은 모두 입력돼야 합니다. 입력값을 확인해주세요.\n입력된 값(제목 : '${params.title}', 내용 : '${params.contents}')`
        );
      case "02":
        return alert(
          `[내용 중복 안내]\n\n입력하신 제목('${params.title}')및 내용('${params.contents}')과 일치하는 TODO는 이미 TODO LIST에 등록되어 있습니다.\n기 등록한 TODO ITEM의 수정을 원하시면 해당 아이템의 [상세보기]-[수정]을 이용해주세요.`
        );
      default:
        return `시스템 내부 오류가 발생하였습니다. 고객센터로 연락주세요.`;
    }
  };

  // title의 변경을 감지하는 함수
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // contents의 변경을 감지하는 함수
  const handleContentsChange = (event) => {
    setContents(event.target.value);
  };

  // form 태그 내부에서의 submit이 실행된 경우 호출되는 함수
  const handleSubmitButtonClick = async (event) => {
    // submit의 고유 기능인, 새로고침(refresh)을 막아주는 역함
    event.preventDefault();

    // 제목과 내용이 모두 존재해야만 정상처리(하나라도 없는 경우 오류 발생)
    // "01" : 필수 입력값 검증 실패 안내
    if (!title || !contents) {
      return getErrorMsg("01", { title, contents });
    }

    // 추가하려는 todo를 newTodo라는 객체로 세로 만듦
    const newTodo = {
      title,
      contents,
      isDone: false,
    };

    // todo를 추가하는 reducer 호출
    // 인자 : payload
    mutation.mutate(newTodo);

    // state 두 개를 초기화
    setTitle("");
    setContents("");
  };

  return (
    <StyledDiv>
      <form onSubmit={handleSubmitButtonClick}>
        <FlexDiv>
          <RightMarginBox margin={10}>
            <LabledInput
              id="title"
              label="제목"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={handleTitleChange}
            />
            <HeightBox height={10} />
            <LabledInput
              id="contents"
              label="내용"
              placeholder="내용을 입력해주세요."
              value={contents}
              onChange={handleContentsChange}
            />
          </RightMarginBox>
          <StyledButton type="submit">제출</StyledButton>
        </FlexDiv>
      </form>
    </StyledDiv>
  );
}

export default Input;
