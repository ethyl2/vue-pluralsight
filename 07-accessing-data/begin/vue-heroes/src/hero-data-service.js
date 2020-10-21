import axios from 'axios';

// Example of axios configuration

async function example() {
  const response = await axios({
    method: 'post',
    url: '/api/heroes/717',
    headers: {
      'X-Custom-Header': 'foo',
    },
    data: {
      firstName: 'Ella',
      lasName: 'Papa',
    },
  });

  console.log(response);
}

example();
