//console.log("hello");

//https://www.googleapis.com/customsearch/v1?key=AIzaSyCJLCSHoeZrYyQrwt3NFkBASaaao5o0Pbc&cx=b4446aaaee76842e0&q=A B C Infra Equipment Pvt. Ltd.


const axios = require('axios');

async function searchGoogle(query) {
    const apiKey = 'AIzaSyCJLCSHoeZrYyQrwt3NFkBASaaao5o0Pbc';
     const cx = 'b4446aaaee76842e0';
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(url);
    if (response.data) {
      console.log(response.data.items[0].link);
      // Process the data as needed
    } else {
      console.log('No results found.');
    }
  } catch (error) {
    console.error('Error searching Google:', error);
  }
}

// Example usage
const query = 'A B C Infra Equipment Pvt. Ltd.';
searchGoogle(query);


// async function searchGoogle(query) {
//     const apiKey = 'AIzaSyCJLCSHoeZrYyQrwt3NFkBASaaao5o0Pbc';
//     const cx = 'b4446aaaee76842e0';
//     const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

//     try {
//         const response = await axios.get(url);
//         console.log("response", response);
//         return response.data;
//     } catch (error) {
//         console.error('Error searching Google:', error);
//         return null;
//     }
// }


// const query = 'Adaequare Pvt. Ltd.';
// searchGoogle(query)
//     .then(data => {
//         if (data) {
//             console.log(data);
//             // Process the data as needed
//         } else {
//             console.log('No results found.');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });



