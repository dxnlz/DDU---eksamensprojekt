import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import formidable from 'formidable';

import { getCookie, GetProfileStatus, IUser } from '../../lib/auth_helper'
import { db_req } from '../../lib/db_helper'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'GET')
        return res.status(405).json({ status: 'error', error: 'Method not allowed' });
    let image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="

    try {
        if(Number.isSafeInteger(Number(req.query["id"]))) {
            let db_request = await db_req("SELECT image FROM products WHERE id = $1", [Number(req.query["id"])]);
            image = db_request.rowCount > 0 && db_request.rows[0].image ? db_request.rows[0].image : image
        }
    } catch (error) {
        console.log(error)
    }

    // Return the image as binary data
    res.setHeader('Content-Type', 'image/jpg');
    res.send(Buffer.from(image, 'base64'));
};