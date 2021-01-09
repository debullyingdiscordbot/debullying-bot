const fetch = require('node-fetch');

const baseUrl = 'https://coronavirus-19-api.herokuapp.com/';

module.exports = {
  name: 'corona',
  description: 'Stats for covid-19.',
  execute(message, args, client) {
    if (!args.length) {
      fetchGlobal().then((data) => message.channel.send('```fix' + data + '```'));
    } else if (args[0] === 'top') {
      fetchTopCountries().then((data) => message.channel.send('```fix' + data + '```'));
    } else {
      fetchStats(args).then((msg) => message.channel.send('```fix' + msg + '```'));
    }
  },
};

const fetchGlobal = async () => {
  const res = await fetch(baseUrl + 'all');
  const data = await res.json();
  // console.log(data);
  return `
    Global cases: ${data.cases}
    Global deaths: ${data.deaths}
    Global recovered: ${data.recovered}
  `;
};

const fetchTopCountries = async () => {
  try {
    const res = await fetch('https://coronavirus-19-api.herokuapp.com/countries');
    const data = await res.json();
    return data.slice(0, 5).map((country, index) => {
      return `
        ${index + 1}. ${country.country}
        cases: ${country.cases} | today: ${country.todayCases} | active: ${country.active}
        deaths: ${country.deaths} | today: ${country.todayDeaths}
        recovered: ${country.recovered} | critical: ${country.critical}
      `;
    });
  } catch (err) {
    console.log(err);
  }
};

const fetchStats = async (country = 'usa') => {
  const res = await fetch(baseUrl + `countries/${country}`);
  const data = await res.json();
  return `
    ${data.country}
    cases: ${data.cases} | today: ${data.todayCases} | active: ${data.active}
    cases per millions: ${data.casesPerOneMillion}
    deaths: ${data.deaths} | today: ${data.todayDeaths}
    recovered: ${data.recovered} | critical: ${data.critical}
    total tests: ${data.totalTests} | tests/million: ${data.testsPerOneMillion} 
  `;
};
