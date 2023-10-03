import GlobalStyles from "./styles/GlobalStyles.js";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Bookings from "./pages/Bookings.jsx";
import Cabins from "./pages/Cabins.jsx";
import Users from "./pages/Users";
import Settings from "./pages/Settings.jsx";
import Account from "./pages/Account.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./ui/AppLayout.jsx";

function App() {
    return (
        <>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout/>}>
                        <Route index element={<Navigate replace to="dashboard"/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="bookings" element={<Bookings/>}/>
                        <Route path="cabins" element={<Cabins/>}/>
                        <Route path="users" element={<Users/>}/>
                        <Route path="settings" element={<Settings/>}/>
                        <Route path="account" element={<Account/>}/>
                    </Route>
                    <Route path="login" element={<Login/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;




/*
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles.js";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import Heading from "./ui/Heading.jsx";
import Row from "./ui/Row.jsx";


const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`

function App() {
    return (
        <>
            <GlobalStyles/>
            <StyledApp>
                <Row>
                    <Row type="horizontal">
                        <Heading as="h1">The Wild Oasis</Heading>

                        <div>
                            <Heading as="h2">Check in and out</Heading>
                            <Button>Check in</Button>
                            <Button variation="secondary" size="small">Check out</Button>
                        </div>
                    </Row>

                    <Row>
                        <Heading as="h3">Form</Heading>
                        <form action="">
                            <Input type="number" placeholder="Number of guests"></Input>
                            <Input type="number" placeholder="Number of guests"></Input>
                        </form>
                    </Row>
                </Row>
            </StyledApp>
        </>
    )
}

export default App;
    */