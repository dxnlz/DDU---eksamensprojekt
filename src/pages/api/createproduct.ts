import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import formidable from 'formidable';

import { db_req } from '../../lib/db_helper'

// Disable Next.JS bodyparser
export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'POST')
        return res.status(405).json({ status: 'error', error: 'Method not allowed' });

    let user_data: IUser = {
        id: undefined,
        username: undefined,
        registered: new Date(),
        password: undefined,
        isadmin: false
    };

    const form = new formidable.IncomingForm({
        uploadDir: "/tmp",
        keepExtensions: true
    });

    // We insert all the fields into user_data
    form.on('field', (field, value) => {
        console.log(field + ": " + value)
    })

    // We convert the recieved file into base64 and insert it into user_data
    // TODO: We should build a data storage system for this instead of using the database
    form.on('file', async (formname, file) => {
        console.log(formname + ": ", file)
    })

    // This is called when all the fields have been parsed and files loaded
    form.on('end', async () => {
        

        res.writeHead(301, { location: "/admin" });
	    return res.end();
    });

    // We parse the form
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(400).json({ status: 'error', error: 'Error parsing form' });
            return res.end();
        }
    });
};
