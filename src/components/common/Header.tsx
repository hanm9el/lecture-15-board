import { Link } from "react-router";
import styled from "styled-components";

const Head = styled.header`
    background-color: #eee;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ccc;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    padding: 10px 20px;
`;

const Logo= styled(Link)`
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
`;

const AuthBox = styled.div`
    display: flex;
    gap: 15px;
`;

function Header() {
    return (
        <Head>
            <Nav>
                <Logo to={"/"}>React Board</Logo>
                <AuthBox>
                    <Link to={"/login"}>로그인</Link>
                    <Link to={"/register"}>회원가입</Link>
                </AuthBox>
            </Nav>
        </Head>
    );
}

export default Header;
