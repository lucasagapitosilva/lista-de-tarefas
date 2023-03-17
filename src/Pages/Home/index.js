import './style.css';

import { db, auth } from '../../firebase';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();

        if(email !== '' && password !== '') {
            
            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/admin', {replace: true})
            })
            .catch((error) => console.log(error))

        } else {
            alert('Preencha o formulário')
        }
    }

    return(
        <div className="home-container">
            <h1>Lista de tarefas</h1>
            <span>Gerencie seu dia de forma fácil.</span>

            <form className="form" onSubmit={handleLogin}>
                <input 
                type="text"
                placeholder="Digite seu email..."
                value={email}
                onChange={ event => setEmail(event.target.value)}
                />

                <input 
                type="password"
                placeholder="********"
                value={password}
                onChange={ event => setPassword(event.target.value)}
                />

                <button type="submit">Acessar</button>
            </form>
            
            <Link to="/register" className="button-link">
             Não possui uma conta? Cadastre-se
            </Link>

        </div>
    )
}