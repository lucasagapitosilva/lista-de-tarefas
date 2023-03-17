import './style.css'
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export default function Admin() {

    const [tarefa, setTarefa] = useState('');
    const [user, setUser] = useState({});
    const [tarefas, setTarefas] = useState([]);
    const [edit, setEdit] = useState({});

    useEffect(() => {
        async function loadTarefas() {
            const userDatail = localStorage.getItem('@detailUser')
            setUser(JSON.parse(userDatail))

            if (userDatail) {
                const data = JSON.parse(userDatail)

                const tarefaRef = collection(db, 'tarefas')
                const q = query(tarefaRef, orderBy('created', 'desc'), where('userUid', '==', data?.uid))

                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid,
                        })
                    })

                    console.log(lista);
                    setTarefas(lista);
                });
            };
        };

        loadTarefas();
    }, []);

    async function handleRegister(e) {
        e.preventDefault();

        if (tarefa === '') {
            alert('Digite sua tarefa...')
            return;
        }

        if (edit?.id) {
            handleUpdateTarefa();
            return;
        }

        await addDoc(collection(db, 'tarefas'), {
            tarefa: tarefa,
            created: new Date(),
            userUid: user?.uid
        })
            .then(() => {
                setTarefa('');
            })
            .catch((error) => console.log(error))
    }

    async function handleLogout() {
        await signOut(auth)
    }

    async function deleteTarefa(id) {
        const docRef = doc(db, 'tarefas', id)
        await deleteDoc(docRef)
            .then(() => {

            })
    }

    function editTarefa(item) {
        setTarefa(item.tarefa)
        setEdit(item)
    }

    async function handleUpdateTarefa() {
        const docRef = doc(db, 'tarefas', edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefa
        })
        .then(() => {
            setTarefa('');
            setEdit({});
        })
        .catch((error) => {
            alert('ERRO AO ATUALIZAR')
            console.log(error)

            setTarefa('');
            setEdit({});
        })
        
    }

    return (
        <div className="admin-container">
            <h1>Minhas tarefas</h1>

            <form className='form' onSubmit={handleRegister}>
                <textarea
                    placeholder="Digite sua tarefa..."
                    value={tarefa}
                    onChange={event => setTarefa(event.target.value)}
                />

                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register' type="submit">Atualizar tarefa</button>
                ) : (
                    <button className='btn-register' type="submit">Registrar tarefa</button>
                )}
            </form>


            {tarefas.map((item) => {
                return (
                    <article className='list' key={item.id}>
                        <p>{item.tarefa}</p>
                        <div>
                            <button onClick={() => editTarefa(item)}>Editar</button>
                            <button onClick={() => deleteTarefa(item.id)} className='btn-delete'>Concluir</button>
                        </div>
                    </article>
                )
            })}

            <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )
}