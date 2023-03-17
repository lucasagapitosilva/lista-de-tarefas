import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Register from './Pages/Register';
import Error from './Pages/Error';

export default function Rotas() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<Error />} />
        </Routes>
    )
}