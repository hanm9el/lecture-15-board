import type { User } from "firebase/auth";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { PostType } from "../../types/post.ts";
import { Container, Title } from "../../styles/auth.tsx";
import styled from "styled-components";
import { ActionButton } from "../../styles/styles.tsx";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.ts";

type Props = {
    currentUser: User | null;
};

const PostMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 14px;
    color: #666;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
`;

const PostContent = styled.div`
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 20px;
    margin-top: 20px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
`;

function BoardDetail({ currentUser }: Props) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState<PostType | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchPost = async () => {
        if (!id) return;

        try {
            // 1개의 데이터만 요청하면 됨 > 쿼리 작성 필요 없음
            const postRef = doc(db, "posts", id);
            const snapshot = await getDoc(postRef);

            if (snapshot.exists()) {
                const postData = snapshot.data();

                setPost({
                    id: snapshot.id,
                    title: postData.title,
                    content: postData.content,
                    userId: postData.userId,
                    username: postData.username,
                    views: postData.views,
                    createdAt: postData.createdAt,
                });
            } else {
                alert("게시글을 찾을 수 없습니다.");
                navigate("/");
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!post)
        return (
            <Container>
                <Title>게시글을 불러올 수 없습니다.</Title>
            </Container>
        );

    const isWriter = currentUser && currentUser.uid === post.userId;

    return (
        <Container>
            <Title>{post.title}</Title>
            <PostMeta>
                <span>작성자 : {post.username?.split("@")[0]}</span>
                <span>
                    작성일 : {post.createdAt.toDate().toLocaleDateString()}
                </span>
                <span>조회수 : {post.views}</span>
            </PostMeta>

            <PostContent>{post.content}</PostContent>
            <ButtonGroup>
                <Link to={"/"}>
                    <ActionButton outlined={true}>목록</ActionButton>
                </Link>
                {isWriter && (
                    <>
                        <Link to={`/post/edit/${post.id}`}>
                            <ActionButton>수정</ActionButton>
                        </Link>

                        <ActionButton style={{ backgroundColor: "#dc3545" }}>
                            삭제
                        </ActionButton>
                    </>
                )}
            </ButtonGroup>
        </Container>
    );
}
export default BoardDetail;
function fetchPost() {
    throw new Error("Function not implemented.");
}
