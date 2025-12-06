import { ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();
const ratelimit=new ratelimit({
    Redis:Redis.fromEnv(),
    limiter:ratelimit.slidingwindow(5,"10 s"),
})

export default ratelimit