import { createClient } from "redis";
export const client =createClient()

const redis = async () => {
    try {
        await client.connect();
        console.log('Connected to Redis client');
    } catch (error) {
        console.log('Error in connecting Redis client', error);
    }
}

export default redis;