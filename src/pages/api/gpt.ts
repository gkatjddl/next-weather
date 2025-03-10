'use server'
import { NextApiRequest, NextApiResponse } from "next";
// use server : nodejs전용 코드를 넣을때(파일쓰기 등...)

// /api/gpt
import OpenAI from "openai";

// process.env : .env 또는 .env.local파일에서 값을 읽기
// 깃허브 등록이 안되는 파일이기 때문에 배포시에는 배포사이트에 직접 입력
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
}) 

export default async function handler(req:NextApiRequest, res : NextApiResponse){
    console.log('gpt사용')
    if(req.method === 'POST'){
        const {prompt} = req.body;

        try{
            const response = await openai.chat.completions.create({
                model:'gpt-3.5-turbo',
                messages:[
                    {role:'system',content:'HTML 태그를 제외한 내용을 한글로 적어주세요'},
                    {role:'user', content:prompt}
                ],
                max_tokens:500,
            });

            const answer = response.choices[0].message.content;
            return res.status(200).json({ answer });

        }catch(error){
            console.error('gpt 관련 에러',error);
            return res.status(500).json({error:'failed'});
        }
    }
}