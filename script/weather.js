const today = new Date();
const year = today.getFullYear();
const month =
  today.getMonth() + 1 < 10 ? '0' + today.getMonth() + 1 : today.getMonth() + 1;
const date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
const time =
  today.getHours() < 10
    ? '0' + today.getHours() + '00'
    : today.getHours() + '00';

console.log(year);

async function getWeather() {
  const baseUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0';
  const base_date = year + month + date;
  const base_time = time;
  const dataType = 'JSON';
  let queryString = '?';

  const response = await fetch(``);
  const data = await response.json();
  console.log(data);
}
