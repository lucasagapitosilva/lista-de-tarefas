import './style.css';

import { db, auth } from '../../firebase';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, } from 'firebase/auth';

export default function Home() {
    return(
        <div>
            <h1>PÁGINA HOME</h1>
        </div>
    )
}