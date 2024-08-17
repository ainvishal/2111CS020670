const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;



app.get('/categories/:categoryname/products/:productname', async(req, res) => {
    let data = JSON.stringify({
        "companyName": "Martmax",
        "clientID": "be8c80d5-62ed-45bd-a4c9-17febfafc88a",
        "clientSecret": "zMYPtqILKlCsEqUX",
        "ownerName": "A.vishal",
        "ownerEmail": "vishalaindala49@gmail.com",
        "rollNo": "2111CS020670"
      }); 
    const auther_token = await axios({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://20.244.56.144/test/auth',
        headers: { 
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIzODcyNjk2LCJpYXQiOjE3MjM4NzIzOTYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImJlOGM4MGQ1LTYyZWQtNDViZC1hNGM5LTE3ZmViZmFmYzg4YSIsInN1YiI6InZpc2hhbGFpbmRhbGE0OUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJNYXJ0bWF4IiwiY2xpZW50SUQiOiJiZThjODBkNS02MmVkLTQ1YmQtYTRjOS0xN2ZlYmZhZmM4OGEiLCJjbGllbnRTZWNyZXQiOiJ6TVlQdHFJTEtsQ3NFcVVYIiwib3duZXJOYW1lIjoiQS52aXNoYWwiLCJvd25lckVtYWlsIjoidmlzaGFsYWluZGFsYTQ5QGdtYWlsLmNvbSIsInJvbGxObyI6IjIxMTFDUzAyMDY3MCJ9.SxyqKA44YxxKczRzSOw48cwbZTscFb_GUkuha3l4-gA'
        },
        data : data
    })
    const AutherizationKey = 'Bearer ' + auther_token.data.access_token;
    const category_name = req.params.categoryname;
    const product_name  = req.params.productname;
    const getUrl = 'http://20.244.56.144/test/companies/' + category_name +'/categories/' + product_name + '/products?top=10&minPrice=1&maxPrice=10000'
    const ServerResponce = await axios({
        method:'get',
        maxBodyLength: Infinity,
        url: getUrl,
        headers: { 
          Authorization : AutherizationKey
        }
    })
    console.log(ServerResponce.data)
    res.json(ServerResponce.data);
})


app.listen(port, () => {
    console.log('App listening on port 3000!');
});
