// meters per seconds ==> kilometers per hours
export function convertWindSpeed(sppedInMetersPerSecond : number) : string
{
    const speedInKilonmetersPerHour = (sppedInMetersPerSecond * 3.6).toFixed(1);
    return `${speedInKilonmetersPerHour} km/hour`
}