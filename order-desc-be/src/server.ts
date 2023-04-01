import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

const PORT = 3000;

const BASE_URL = 'https://app.orderdesk.me/api/v2';

const headers = {
  'ORDERDESK-STORE-ID': '51853',
  'ORDERDESK-API-KEY': '8oEb5jL9wf972Y7ByhKPJQDGNgMUVGni2kCmnCx5m29PaMq4py',
  'Content-Type': 'application/json',
};

app.use(cors());

app.get('/orders', async (req, res) => { 
  try {
    const ISODate = new Date().toISOString().replace('Z', '').replace('T', ' ').split('.')[0];
    let lastTime = ISODate;

    async function getData(fullDate: string) {
      let dateOfDate = fullDate.split(' ')[0];
      let timeOfDate = fullDate.split(' ')[1];
      let dayISO = dateOfDate.split('-')[2];
      let monthISO = dateOfDate.split('-')[1];
      let yearISO = dateOfDate.split('-')[0];
      let timeISODate = timeOfDate.split(':')[0];

      switch (true) {
        case ((+timeISODate - 1).toString() === '-1'):
					timeISODate = '23';
					dayISO = (+dayISO - 1).toString();
          dateOfDate = `${yearISO}-${monthISO}-${dayISO}`;
          break;

        default:
          timeISODate = (+timeISODate - 1).toString();
          break;
        };

        let startTime = `${dateOfDate} ${timeISODate}:${timeOfDate.split(':')[1]}:${timeOfDate.split(':')[2]}`;

	      const args = {
		      'search_start_date': startTime,
        };

        const response = await axios.get(`${BASE_URL}/orders`, {
          headers: headers,
          params: args
				});
			
				response.data.orders.forEach((el: any) => {
					if (el.shipping.adress1) {
            console.log('Order ID: ' + el.id + ', shipping adress: ' + el.shipping.adress1);
          } else {
            console.log('Order ID: ' + el.id + ', shipping adress: has not any info :(');
          }
        });

        res.end();
        lastTime = startTime;
      };
				
      await getData(lastTime);

      setInterval(async () => {
        await getData(lastTime);
      }, 3600000);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
        res.end();
    }
})

app.listen(PORT || process.env.PORT, () => {
  console.log('start server');
})
