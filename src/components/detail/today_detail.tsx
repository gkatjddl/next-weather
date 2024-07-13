import React from 'react';
import './today_detail.css'
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu';
import { FiDroplet } from 'react-icons/fi';
import { MdAir } from 'react-icons/md';
import { ImMeter } from 'react-icons/im';

export interface TodayDetailProps{
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise : string;
    sunset : string;
}

export interface SingleWeatherDtail{
    information: string;
    icon:React.ReactNode;
    value:string;
}

export default function TodayDetail(props : TodayDetailProps){
    return(
        <>
            <SingleWeatherDetail information='가시성' icon={<LuEye/>} value={props.visibility}/>
            <SingleWeatherDetail information='습도' icon={<FiDroplet/>} value={props.humidity}/>
            <SingleWeatherDetail information='풍속' icon={<MdAir/>} value={props.windSpeed}/>
            <SingleWeatherDetail information='기압' icon={<ImMeter/>} value={props.airPressure}/>
            <SingleWeatherDetail information='일출시간' icon={<LuSunrise/>} value={props.sunrise}/>
            <SingleWeatherDetail information='일몰시간' icon={<LuSunset/>} value={props.sunset}/>
        </>
    )
}

function SingleWeatherDetail(props: SingleWeatherDtailProps){
    return(
        <div className='todaydetail-item'>
            <p className=''>
                {props.information}
            </p>
        </div>
    )
}