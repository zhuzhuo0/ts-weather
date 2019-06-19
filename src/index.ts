import commander from 'commander'
import colors from 'colors'
import axios, { AxiosResponse } from 'axios'

const command = commander
    .version('0.1.0')
    .option('-c, --city [name]', 'Add city name')
    .parse(process.argv);

if (process.argv.slice(2).length === 0) {
    command.outputHelp(colors.red);
    process.exit()
}

interface IWeatherResponse {
    status: string;
    count: string;
    info: string;
    infocode: string;
    lives: ILive[];
}

interface ILive {
    province: string;
    city: string;
    adcode: string;
    weather: string;
    temperature: string;
    winddirection: string;
    windpowder: string;
    humidity: string;
    reporttime: string;
}
// 四川 510100
const log = console.log;
const key = '14991c6deaa3920c4cedf7bf355c1019';
const baseUrl = 'https://restapi.amap.com/v3/weather/weatherInfo';

// Promise
// axios.get(`${baseUrl}?key=${key}&city=${encodeURI(command.city)}`).then((res: AxiosResponse<IWeatherResponse>) => {
//     const live = res.data.lives[0];
//     log(colors.yellow(live.reporttime));
//     log(colors.white(`${live.province} ${live.city}`));
//     log(colors.green(`${live.weather} ${live.temperature} 度`))
// }).catch(err => {
//     log(colors.red('天气服务出现异常'))
// })

// async
const getWeather = async (city: string) => {
    const response: AxiosResponse<IWeatherResponse> = await axios.get(`${baseUrl}?key=${key}&city=${encodeURI(city)}`);
    const live = response.data.lives[0]
    log(colors.yellow(live.reporttime));
    log(colors.white(`${live.province} ${live.city}`));
    log(colors.green(`${live.weather} ${live.temperature} 度`))
}

getWeather(command.city)