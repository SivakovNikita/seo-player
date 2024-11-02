const Post = () => {
  fetch('http://localhost:3002/api/addData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: 'trackListBarbershopAudio',
      value: [
        {
          title: 'Факты о барбершопах',
          src: 'https://testsite202995931.ucoz.net/barbeshop_alt_05_ng.mp3',
          artist: 'Звук Бизнес',
          duration: '00:18',
          img: [
            {
              src: '/images/trackImage/trackCover.jpg',
              sizes: '96x96',
              type: 'image/png',
            },
            {
              src: '/images/trackImage/trackCover_128x128.png',
              sizes: '128x128',
              type: 'image/png',
            },
            {
              src: '/images/trackImage/trackCover_192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/images/trackImage/trackCover_256x256.png',
              sizes: '256x256',
              type: 'image/png',
            },
            {
              src: '/images/trackImage/trackCover_384x384.png',
              sizes: '384x384',
              type: 'image/png',
            },
            {
              src: '/images/trackImage/trackCover_512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        {
          title: 'Тренды для мужчин',
          src: 'https://testsite202995931.ucoz.net/barbershop_03.mp3',
          artist: 'Звук Бизнес',
          duration: '00:57',
          img: [
            {
              src: '/images/trackImage/trackCover.jpg',
              sizes: '96x96',
              type: 'image/png',
            },
            {
              src: '/images/trackImage/trackCover_128x128.png',
              sizes: '128x128',
              type: 'image/png',
            },
            {
              src: '/images/trackImage/trackCover_192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/images/trackImage/trackCover_256x256.png',
              sizes: '256x256',
              type: 'image/png',
            },
            {
              src: '/images/trackImage/trackCover_384x384.png',
              sizes: '384x384',
              type: 'image/png',
            },
            {
              src: '/images/trackImage/trackCover_512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        {
          title: 'Стендап',
          src: 'https://testsite202995931.ucoz.net/barbershop_02.mp3',
          artist: 'Звук Бизнес',
          duration: '00:42',
          img: [
            {
              src: '/images/trackImage/trackCover.jpg',
              sizes: '96x96',
              type: 'image/png',
            },
            {
              src: '/images/trackImage/trackCover_128x128.png',
              sizes: '128x128',
              type: 'image/png',
            },
            {
              src: '/images/trackImage/trackCover_192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/images/trackImage/trackCover_256x256.png',
              sizes: '256x256',
              type: 'image/png',
            },
            {
              src: '/images/trackImage/trackCover_384x384.png',
              sizes: '384x384',
              type: 'image/png',
            },
            {
              src: '/images/trackImage/trackCover_512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
};

export default Post;
