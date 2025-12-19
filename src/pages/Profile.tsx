import type { User } from "firebase/auth";
import { Container } from "../styles/auth.tsx";
import styled from "styled-components";

const ProfileImg = styled.img`
    width: 120px; /* 사진을 조금 더 키웠어요 (100px -> 120px) */
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin: 20px auto 30px auto; /* 위쪽 여백 20px, 아래쪽 여백 30px */
    display: block;
    border: 4px solid #fff; /* 사진 테두리에 흰색 띠를 줘서 더 깔끔하게 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 살짝 그림자 추가 */
`;

type Props = {
    currentUser: User | null;
};

function Profile({ currentUser }: Props) {
    const defaultImage =
        "https://ui-avatars.com/api/?background=random&name=" +
        (currentUser?.email || "User");
    return (
        <Container>
            <ProfileImg
                src={currentUser?.photoURL || defaultImage}
                alt={"프로필 사진"}
            />

            <div
                style={{
                    padding: "0 20px 20px 20px",
                    fontSize: "18px",
                    textAlign: "center",
                }}
            >
                <h2
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        color: "#333",
                    }}
                >
                    {currentUser?.email?.split("@")[0]} 님
                </h2>
                <p style={{ color: "#666", marginBottom: "20px" }}>
                    {currentUser?.email}
                </p>
                <p style={{ fontSize: "14px", color: "#999" }}>
                    가입일: {currentUser?.metadata.creationTime}
                </p>
            </div>
        </Container>
    );
}

export default Profile;
