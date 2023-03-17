import { Routes, Route } from 'react-router-dom';

import Home from '../Pages/Home';
import Register from '../Pages/Register';
import Admin from '../Pages/Admin';
import Private from '../Routes/Private';
import Error from '../Pages/Error';

export default function Rotas() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Private><Admin /></Private>} />

            <Route path="*" element={<Error />} />
        </Routes>
    )
}