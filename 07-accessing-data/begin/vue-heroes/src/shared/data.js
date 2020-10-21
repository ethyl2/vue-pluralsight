import { format } from 'date-fns';
import { inputDateFormat } from './constants';
import axios from 'axios';

const getHeroes = async function() {
  const response = await axios.get('api/heroes.json');
  const heroes = response.data.map(hero => {
    hero.originDate = format(hero.originDate, inputDateFormat);
    return hero;
  });
  return heroes;
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
