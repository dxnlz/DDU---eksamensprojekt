import { NextApiRequest, NextApiResponse } from 'next';
import { IUser, JWT_SECRET } from '../../lib/auth_helper'
import { db_req } from '../../lib/db_helper'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body);
    db_req("INSERT INTO reviews (stars, review, author, created, product, last_updated) VALUES ($1, $2, $3, $4, $5, $6)", [req.body["stars"], req.body["review"], 1, "2020-04-06",  req.body["product"], "2020-04-06"]);
    res.send("yeet");

    
};