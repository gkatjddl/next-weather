

// 절대온도에서 섭씨온도로 바꾸는 함수

export function convertKelvinToCelsius(tempInKelvin: number): number {
    return Math.round(tempInKelvin - 273.15);
}