import { Outlet } from 'react-router-dom';
import ButtonAppBar from './components/AppBar';
import styled from 'styled-components';

const Root = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
    height: 100vh;

    #detail {
        height: 100%;
    }
`;

function App() {
    return (
        <Root>
            <ButtonAppBar />

            <div id="detail">
                <Outlet />
            </div>
            <footer>
                <p>Esse é um projeto criado para o Desafio Yssy</p>
                <p>Desenvolvido por Renan Koji Hanashiro: ME CONTRATA YSSY!</p>
            </footer>
        </Root>
    );
}

export default App;
