'use client';

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/navbar";
import axios from "axios";
import { useQuery } from "react-query";
import { use, useEffect, useState } from "react";
import ListBox from "@/components/listbox/listbox";
import { convertKelvinToCelsius } from "@/utile/convertKelvinToCelsius";
import WeatherIcon from "@/components/weather_icon/weather_icon";

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  '3h': number;
}

interface Sys {
  pod: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface WeatherData {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

interface Coord {
  lat: number;
  lon: number;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface WeatherApiResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: City;
}


// http://api.openweathermap.org/data/2.5/forecast?q=incheon&appid=b857d5e3cdff0dc33085cced8f938f7a&cnt=56
export default function Home() {
  
  const [place, setPlace] = useState('seoul');
  const [data, setData] = useState<WeatherApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 있는 지역인지 검사
  const location : string[] = ['seoul','incheon']
  
  const fetchWeatherData = async ()=>{
    setIsLoading(true);
    try{
      const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`)
      const result = await res.json();
      setData(result);
    }catch(error){
      setError('날씨 가져오기 에러');
    }finally{
      setIsLoading(false);
    }
  }

  // 백그라운드 작업 또는 타이머는 useEffect에서 재실행은 place값이 바뀔때
  useEffect(()=>{
    fetchWeatherData();
  },[place])
  console.log(data);
    let todayData = data?.list[1];
    const daysInKorea = ['월요일','화요일','수요일','목요일', '금요일', '토요일','일요일']
    const today = new Date();
    const dayInKorea = daysInKorea[today.getDay()];

  if(isLoading){
    return(
      <div className={styles.homeLoadingBox}>
        <p className={styles.homeLoadingText}>Loading...</p>
      </div>
    )
  }

  function onlyData(dateTime: string | undefined) {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }

  return (
      <div className={styles.homeContainer}>
        <Navbar place={place} setPlace={setPlace} location={location}/>
        <main>
          {/* 오늘 날씨 */}
          <section className={styles.spaceY4}>
            <div className={styles.spaceY2}>
              <h2 className={styles.todayHeader}>
                <p>{dayInKorea}</p>
                <p>({onlyData(todayData?.dt_txt)})</p>
              </h2>
              {/* 오늘 날씨 시각화 */}
              <ListBox className="box-style2">
                <div className={styles.flexColumnP4}>
                  <span className={styles.fontSize48}>
                  {convertKelvinToCelsius(todayData?.main.temp ?? 298.15)}℃
                  </span>
                  <p className={styles.nowrapText}>
                    <span>체감온도</span>
                    <span>{convertKelvinToCelsius(todayData?.main.feels_like ?? 298.15)}℃</span>
                  </p>
                  <p className={styles.minmaxText}>
                    <span>{convertKelvinToCelsius(todayData?.main.temp_max ?? 298.15)}℃</span>
                    <span>{convertKelvinToCelsius(todayData?.main.temp_min ?? 298.15)}℃</span>
                  </p>

                  <div className={styles.todauInfo}>
                    {
                      data?.list.map((item,index)=>{
                        return(
                          <div className={styles.todayItem} key={index}>
                            <p>
                              {item.dt_txt}
                            </p>
                            <WeatherIcon iconName={item.weather[0].icon}/>
                            <p>
                              {convertKelvinToCelsius(todayData?.main.feels_like ?? 298.15)}℃
                            </p>
                          </div>
                        )
                      })
                    }

                  </div>
                </div>
              </ListBox>
            </div>
          </section>
        </main>
      </div>
  );
}
