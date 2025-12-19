import type { User } from "firebase/auth";
import styled from "styled-components";
import { ActionButton } from "../styles/styles.tsx";
import { useForm } from "react-hook-form";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase.ts";
import { useNavigate } from "react-router";

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

type CommentFormData = {
    content: string;
};

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
`;

function CommentContainer({ postId, currentUser }: Props) {
    const navigate = useNavigate();

    // 1. 댓글을 작성하는 폼 만들기
    // 1-1. 폼데이터(textarea)를 submit할 때 firebase에 쓰는 핸들러(function) 만들기

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CommentFormData>();

    const onSubmit = async (data: CommentFormData) => {
        if (!currentUser) return;
        // 일반적인 컬렉션에 저장하는 것이 아니라,
        // 그 posts 컬렉션의 하위 컬렉션인 comments 하위컬렉션(sub collection)에 저장

        try {
            const newComment = {
                content: data.content,
                userId: currentUser.uid,
                username: currentUser.email,
                createAt: Timestamp.now(),
            };

            await addDoc(
                collection(db,"posts", postId, "comments"),
                newComment,
            )
            reset();  // 폼에 입력 되어져 있는 값 초기화

            // 임시로 화면을 갱신하여 등록한 코멘트가 나오는지 확인
            navigate(0);
        } catch (e) {
            alert("댓글을 작성하지 못했습니다.");
            console.log(e);
        }
    };

    // 2. 댓글의 내용을 불러오기
    // 2-1. 댓글의 내용을 화면에 출력해주기

    // 3. 댓글의 목록 중, 본인이 작성한 댓글에는 삭제 버튼 출력해주기
    // 3-1. 삭제 버튼 누르면 삭제하기

    return (
        <Section>
            <CommentCount>댓글 0개</CommentCount>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper>
                    <Textarea
                        placeholder={"댓글을 입력해주세요"}
                        disabled={!currentUser || isSubmitting}
                        {...register("content", {
                            required: "댓글 내용을 입력해주세요.",
                            minLength: {
                                value: 2,
                                message: "최소 2글자 이상 입력해주세요.",
                            },
                        })}
                    />
                    <ActionButton disabled={!currentUser || isSubmitting}>
                        {isSubmitting ? "등록 중..." : "등록"}
                    </ActionButton>
                </InputWrapper>
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </Form>
        </Section>
    );
}

export default CommentContainer;
