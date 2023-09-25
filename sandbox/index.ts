import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
    await client.hSet('car',{
        color: 'red',
        year: '1950',
       
        owner : null || '',
        service: undefined || ''
    })
    const car = await client.hGetAll('car');
    console.log(car)
};
run();
