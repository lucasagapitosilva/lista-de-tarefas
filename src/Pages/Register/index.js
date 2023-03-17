import { auth } from '../../firebase';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleRegister(event) {
        event.preventDefault();

        if (email !== '' && password !== '') {

            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/admin', { replace: true })

                    setEmail('')
                    setPassword('')
                    alert('Cadastro realizado com sucesso !')
                })
                .catch((error) => {
                    if(error.code === 'auth/weak-password') {
                        alert('Senha muito fraca')
                    } else if(error.code === 'auth/email-already-in-use') {
                        alert('Email já cadastrado !')
                    }
                })

        } else {
            alert('Preencha o formulário')
        }
    }

    return (
        <div className="home-container">
            <h1>Cadastre-se</h1>
            <span>Vamos criar sua conta !</span>

            <form className="form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Digite seu email..."
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <input
                    autoComplete={false}
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />

                <button type="submit">Cadastrar</button>
            </form>

            <Link to="/" className="button-link">
                Já possui uma conta? Faça o login!
            </Link>

        </div>
    )
}