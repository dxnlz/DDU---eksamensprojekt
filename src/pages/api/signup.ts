import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import {IUser} from '../../lib/auth_helper'
import {db_req} from '../../lib/db_helper'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'POST')
        return res.status(405).json({ status: 'error', error: 'Method not allowed' });

    let user_data: IUser = await req.body;

    if (!user_data.username || !user_data.password)
        return res.status(400).json({ status: 'error', error: 'Request missing username or password' });

    // Check if user with this username exists
    if((await db_req("SELECT * FROM users WHERE username = $1", [user_data.username])).rows.length != 0)
        return res.status(400).json({ status: 'error', error: 'User with this username already exists'});

    user_data.password = await bcrypt.hash(user_data.password, 10);

    // First we insert the required data
    try {
        await db_req("INSERT INTO users (username, registered, password) VALUES ($1, $2, $3)", [user_data.username, new Date(), user_data.password])
    } catch (error) {
        return res.status(500).json({ status: 'error', error: 'Could not insert data into database'});
    }

    // We now insert the optional data
    // TODO: Insert optional data like birthday, profile image...

    res.status(200).json({ success: true });
};