'use clinet'

import { Dispatch, SetStateAction, useState } from 'react';
import './navbar.css'
import { IoSunny } from "react-icons/io5";
import { MdWbSunny } from 'react-icons/md';
import SearchBox from '../searchbox/seachbox';
import axios from 'axios';

type Props = {
    place : string;
    setPlace : Dispatch<SetStateAction<string>>;
    location: string[];
}

export default function Navbar(props : Props){

    const [city, setCity] = useState('');
    const [error, setError] = useState('');

    //  onChange에 제공할 함수
    async function handleInputChange(value : string){
        setCity(value);
        if (value.length >= 3){
            try{
                const res = await axios.get(
                    `http://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
                )
            }catch(error){
                console.log(error);
            }
        }
    }


    // 검색 박스의 onSubmit에 제공할 함수
    function handleSumitSeach(e : React.FormEvent<HTMLFormElement>){
        // 클릭의 영향이 버블링 되지않게 막는다
        e.preventDefault();
        if(props.location.includes(city)){
            props.setPlace(city);
            setError("");
        }else{
            setError("해당하는 지역이 없슴니다")
        }
    }


    return(
        <div className='navbar-container'>
            <div className='navbar-inner'>
                <div className='navbar-title'>
                    <h2 className='navbar-heading'>Nextjs 날씨앱</h2>
                    <MdWbSunny className='navbar-logo-icon'/>
                </div>

                <section className='navbar-section'>
                    <p className='location-text'>{props.place}</p>
                    <div style={{position:'relative'}}>
                        <SearchBox searchValue={city} onChange={undefined} onSubmit={undefined} />
                    </div>
                </section>
            </div>
        </div>
    )
}

// 리액트 아이콘  
// npm install react-icons --save
// npm install react-query axios classnames
// npm install date-fns@2.30.0