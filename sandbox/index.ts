import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
    await client.hSet('car',{
        color: 'red',
        year: '1950',
    
    }),
    await client.hSet('Bike',{
        color: 'Yelo',
        year: '1911',
    
    }),await client.hSet('cyc',{
        color: 'black',
        year: '2010',
    
    })
    const result =await Promise.all([
        client.hGetAll('car'),
        client.hGetAll('Bike'),
        client.hGetAll('cyc'),
    ])
    console.log(result)
};


run();
