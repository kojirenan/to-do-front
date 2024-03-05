import { Outlet } from 'react-router-dom';
import ButtonAppBar from './components/AppBar';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Root = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
    height: 100vh;
    background-color: #d6cdba;

    #detail {
        height: 90vh;
        position: relative;
    }
`;

function App() {
    return (
        <>
            <Root>
                <ButtonAppBar />
                <div id="detail">
                    <Outlet />
                </div>
            </Root>
            <ToastContainer
                position={'top-right'}
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
}

export default App;
