import './homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import React,{useState} from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
    const [selectedOption, setSelectedOption] = useState('A');

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
    };
    return(
        <body className="Homepage">
        </body>
    )
}