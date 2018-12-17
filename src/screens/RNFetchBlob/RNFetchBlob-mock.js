import RNFetchBlob from 'rn-fetch-blob'

const Bars = [{
    "id": 1,
    "title": "SafeHouse Chicago",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "60 E Ontario St,IL,60611",
    "city": "Chicago",
    "location": "",
    "longitude": -87.62,
    "latitude": 41.89,
    "date": "1527829200"
  },
  {
    "id": 2,
    "title": "Fox Bar",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "113-125 N Green St,IL,60607",
    "city": "Chicago",
    "location": "",
    "longitude": -87.649008,
    "latitude": 41.890414,
    "date": "1527829200"
  },
  {
    "id": 3,
    "title": "The Library",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "230 W Kinzie St,IL,60654",
    "city": "Chicago",
    "location": "",
    "longitude": -87.635356,
    "latitude": 41.889421,
    "date": "1527829200"
  },
  {
    "id": 4,
    "title": "Three Dots and a Dash",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "435 N Clark St,IL,60654",
    "city": "Chicago",
    "location": "",
    "longitude": -87.630767,
    "latitude": 41.890312,
    "date": "1527829200"
  },
  {
    "id": 5,
    "title": "Remedy",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "1910 N Milwaukee Ave,IL,60647",
    "city": "Chicago",
    "location": "",
    "longitude": -87.686671,
    "latitude": 41.91604,
    "date": "1527829200"
  },
  {
    "id": 6,
    "title": "Best Intentions",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "3281 W Armitage Ave,IL,60647",
    "city": "Chicago",
    "location": "",
    "longitude": -87.710122,
    "latitude": 41.91717,
    "date": "1527829200"
  },
  {
    "id": 7,
    "title": "Delilah’s",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "2771 N Lincoln Ave,IL,60614",
    "city": "Chicago",
    "location": "",
    "longitude": -87.658043,
    "latitude": 41.932307,
    "date": "1527829200"
  },
  {
    "id": 8,
    "title": "Sparrow",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "12 W Elm St,IL,60610",
    "city": "Chicago",
    "location": "",
    "longitude": -87.63,
    "latitude": 41.9,
    "date": "1527829200"
  },
  {
    "id": 9,
    "title": "The Violet Hour",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "1520 N Damen Ave,IL,60622",
    "city": "Chicago",
    "location": "",
    "longitude": -87.677822,
    "latitude": 41.908968,
    "date": "1527829200"
  },
  {
    "id": 10,
    "title": "The Victor Bar",
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "4011 N Damen Ave,IL,60618",
    "city": "Chicago",
    "location": "",
    "longitude": -87.678754,
    "latitude": 41.95463,
    "date": "1527829200"
  },
  {
    "id": 11,
    "title": "Tapster",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "2027 W North Ave,IL,60647",
    "city": "Chicago",
    "location": "",
    "longitude": -87.678629,
    "latitude": 41.910224,
    "date": "1527829200"
  },
  {
    "id": 12,
    "title": "The Arrogant Frog Bar",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "1365 W Fullerton Ave,IL,60614",
    "city": "Chicago",
    "location": "",
    "longitude": -87.783727,
    "latitude": 41.923698,
    "date": "1527829200"
  },
  {
    "id": 13,
    "title": "Milk Room",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "12 S Michigan,IL,60603",
    "city": "Chicago",
    "location": "",
    "longitude": -87.624967,
    "latitude": 41.881647,
    "date": "1527829200"
  },
  {
    "id": 14,
    "title": "Queen Mary Tavern",
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "2125 W Division St,IL,60622",
    "city": "Chicago",
    "location": "",
    "longitude": -87.680735,
    "latitude": 41.902845,
    "date": "1527829200"
  },
  {
    "id": 15,
    "title": "Navigator Taproom",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "2211 N Milwaukee Ave,IL,60647",
    "city": "Chicago",
    "location": "",
    "longitude": -87.694351,
    "latitude": 41.921073,
    "date": "1527829200"
  },
  {
    "id": 16,
    "title": "The Pink Squirrel",
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "2414 N Milwaukee Ave,IL,60647",
    "city": "Chicago",
    "location": "",
    "longitude": -87.701092,
    "latitude": 41.925063,
    "date": "1527829200"
  },
  {
    "id": 17,
    "title": "Drink and Ink",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "4443 N Broadway,IL,60640",
    "city": "Chicago",
    "location": "",
    "longitude": -87.660497,
    "latitude": 41.996836,
    "date": "1527829200"
  },
  {
    "id": 18,
    "title": "Torali Bar",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "160 E Pearson St,IL,60611",
    "city": "Chicago",
    "location": "",
    "longitude": -87.62231,
    "latitude": 41.897603,
    "date": "1527829200"
  },
  {
    "id": 19,
    "title": "the Albert",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "228 E Ontario St,IL,60611",
    "city": "Chicago",
    "location": "",
    "longitude": -87.62153,
    "latitude": 41.893616,
    "date": "1527829200"
  },
  {
    "id": 20,
    "title": "Rogers Park Social",
    'description': 'We’re all about FUN at Eskimo Joe’s! Whether you’re shopping for the grin that’s always in or eating a plate piled high with cheese fries, you’re gonna’ have a good time at  Eskimo Joe’s - guaranteed!',
    "featured": [
        "https://www.daydrinkingbars.com/assets/img/items/1542227085.900134_img.jpg",
        "https://www.daydrinkingbars.com/assets/img/items/1540588034.832429_img.jpg"
    ],
    "address": "6920 N Glenwood Ave,IL,60626",
    "city": "Chicago",
    "location": "",
    "longitude": -87.665515,
    "latitude": 41.998268,
    "date": "1527829200"
  }
]

export const getBars = function(paginate) {
  return new Promise((resolve, reject) => {
    const perPage = 5;
    return resolve({
        statusCode: 200,
        success: true,
        message: null,
        data: {
            items: Bars.slice(paginate * perPage, perPage)
        }
    })
  })
}
export function getBarDetail(id) {
    return new Promise((resolve, reject) => {
        return resolve({
            statusCode: 200,
            success: true,
            message: null,
            data: {
                Bar: id < Bars.length ? Bars[id]: Bars[0]
            }
        })
      })
}
export function getBarByLocation(lat, lng) {
    return new Promise((resolve, reject) => {
        return resolve({
            statusCode: 200,
            success: true,
            message: null,
            data: {
                items: Bars
            }
        })
    })
}