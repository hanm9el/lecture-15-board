import type { User } from "firebase/auth";
import styled from "styled-components";
import { ActionButton } from "../styles/styles.tsx";

type Props = {
    postId: string;
    currentUser: User | null;
};

const Section = styled.section`
    margin-top: 40px;
    border-top: 2px solid #eee;
    padding-top: 20px;
`;

const CommentCount = styled.h3`
    font-size: 18px;
    margin-bottom: 15px;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;
`;

const InputWrapper = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
`;

const Textarea = styled.textarea`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: none;
    height: 60px;
    
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
`;

function CommentContainer({ postId, currentUser }: Props) {
    // 1. 댓글을 작성하는 폼 만들기
    // 1-1. 폼데이터(textarea)를 submit할 때 firebase에 쓰는 핸들러(function) 만들기

    // 2. 댓글의 내용을 불러오기
    // 2-1. 댓글의 내용을 화면에 출력해주기

    // 3. 댓글의 목록 중, 본인이 작성한 댓글에는 삭제 버튼 출력해주기
    // 3-1. 삭제 버튼 누르면 삭제하기

    return (
        <Section>
            <CommentCount>댓글 0개</CommentCount>
            <Form>
                <InputWrapper>
                    <Textarea />
                    <ActionButton>등록</ActionButton>
                </InputWrapper>
                <ErrorMessage>에러메세지자리</ErrorMessage>
            </Form>
        </Section>
    );
}

export default CommentContainer;
