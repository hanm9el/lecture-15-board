import { Link, useNavigate } from "react-router";
import styled from "styled-components";
import { ActionButton } from "../../styles/styles.tsx";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase.ts";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    color: #333;
    text-align: center;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 4px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const Switcher = styled.p`
    text-align: center;
    margin-top: 20px;

    a {
        color: #3b82f6;
    }
`;

type AuthFormType = {
    email: string;
    password: string;
};

function Register() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<AuthFormType>();

    const onSubmit = async (data: AuthFormType) => {
        try {
            await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );
            navigate("/login");
        } catch (e) {
            if (e instanceof FirebaseError) {
                if (e.code === "auth/email-already-in-use") {
                    setError("root", {
                        message: "이미 사용중인 이메일 입니다.",
                    });
                }
            } else {
                setError("root", { message: " 회원가입이 실패되었습니다." });
            }

        }
    };

    return (
        <Container>
            <Title>회원가입</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register("email", {
                        required: " 이메일은 필수 입력입니다.",
                    })}
                    type={"email"}
                    placeholder={"이메일"}
                />

                <Input
                    {...register("password", {
                        required: "비밀번호는 필수입력입니다.",
                        minLength: {
                            value: 6,
                            message: "비밀번호는 6자 이상이어야 합니다.",
                        },
                    })}
                    type={"password"}
                    placeholder={"비밀번호 (6자 이상)"}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <ActionButton>회원가입</ActionButton>
                {errors.root && <p>{errors.root.message}</p>}
            </Form>
            <Switcher>
                이미 계정이 있으신가요? <Link to={"/login"}>로그인</Link>
            </Switcher>
        </Container>
    );
}
export default Register;
