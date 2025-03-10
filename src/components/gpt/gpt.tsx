'use client'
// npm install openai

import { Dispatch, SetStateAction, useState } from 'react'
import './gpt.css'

type Props = {
    answer : string,
    setAnswer : Dispatch<SetStateAction<string>>;
}

export default function Gpt({answer, setAnswer} : Props){
    const [inputValue, setInputValue] = useState('');

    const  handleSunmit= async(event : React.FormEvent)=>{
        event.preventDefault(); // form태그 새로고침을 막는다 
        if(!inputValue) return;

        try{
            // src/pages/api/gpt.ts 백엔드에 요청을 전송한다
            // 응답값이 200(ok)이면 setAnswer로 담는다
            const response = await fetch('/api/gpt', {
                method:'Post',
                headers:{'Content-Type' : 'application/json'},
                // object를 JSON문자열로 바꿔서 서버에 전송한다
                body: JSON.stringify({prompt: inputValue})
            });

            if(!response.ok){
                // 실패했을때 catch로 넘긴다
                throw new Error('Network response was not ok')
            }

            const data = await response.json();
            setAnswer(data.answer);

        }catch(error){
            console.error('gpt error', error)
        }
    } 
    return(
        <div className='gpt-container'>
            <h2>Chat Gpt</h2>
            <form onSubmit={handleSunmit}>
                <input type='text'
                    onChange={(e)=>setInputValue(e.target.value)}
                    value={inputValue}

                />
                <button type='submit' className='gpt-button'>입력</button>
            </form>
            <p style={{whiteSpace:'pre-line'}}>
                {answer}
            </p>
        </div>
    )
}