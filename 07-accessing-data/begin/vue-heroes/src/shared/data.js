import { format } from 'date-fns';
import { inputDateFormat } from './constants';
import axios from 'axios';
import { API } from './config';

const getHeroes = async function() {
  try {
    const response = await axios.get(`${API}/heroes.json`);
    let data = parseList(response);
    const heroes = data.map(hero => {
      hero.originDate = format(hero.originDate, inputDateFormat);
      return hero;
    });
    return heroes;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const parseList = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

const ourHeroesHardcoded = [
  {
    id: 10,
    firstName: 'Ella',
    lastName: 'Papa',
    capeCounter: 1,
    originDate: format(new Date(1996, 5, 1), inputDateFormat),
    description: 'fashionista',
  },
  {
    id: 20,
    firstName: 'Madelyn',
    lastName: 'Papa',
    capeCounter: 3,
    originDate: format(new Date(1998, 7, 1), inputDateFormat),
    description: 'the cat whisperer',
  },
  {
    id: 30,
    firstName: 'Haley',
    lastName: 'Papa',
    capeCounter: 2,
    originDate: format(new Date(1999, 8, 1), inputDateFormat),
    description: 'pen wielder',
  },
  {
    id: 40,
    firstName: 'Landon',
    lastName: 'Papa',
    capeCounter: 0,
    originDate: format(new Date(2000, 9, 1), inputDateFormat),
    description: 'arc trooper',
  },
];

export const data = {
  getHeroes,
};
