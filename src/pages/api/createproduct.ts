import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import formidable from 'formidable';

import { db_req } from '../../lib/db_helper'
import { getCookie, GetProfileStatus } from '../../lib/auth_helper';

interface IProduct {
    name?: string,
    description?: string,
    price?: number,
    stock?: number,
    category?: number,
    image?: string,
    created?: Date,
    last_updated?: Date
}

// Disable Next.JS bodyparser
export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'POST')
        return res.status(405).json({ status: 'error', error: 'Method not allowed' });

    let token = getCookie("token", req.headers.cookie);

    if(!token) 
        return res.status(403).json({ status: 'error', error: 'ERROR: FORBIDDEN. This incident will be reported, your IP is ' + req.socket.remoteAddress.replace(/^.*:/, '') });
    else if(!GetProfileStatus(token).isAdmin) {
        return res.status(403).json({ status: 'error', error: 'ERROR: FORBIDDEN. ' + GetProfileStatus(token).username + ' is not an admin user. This incident will be reported, your IP is ' + req.socket.remoteAddress.replace(/^.*:/, '') });
    }

    const form = new formidable.IncomingForm({
        uploadDir: "/tmp",
        keepExtensions: true
    });

    let product: IProduct = {};

    // We insert all the fields into products
    form.on('field', (field, value) => {
        if (field == "created" || field == "last_updated")
            product[field] = new Date(value);
        else if (field == "price" || field == "stock" || field == "category")
            product[field] = Number(value);
        else
            product[field] = value;
    })

    // Same with file
    form.on('file', async (formname, file) => {
        if (formname == "image") {
            try {
                // TODO: This is horrible, since we block main thread while reading IO
                product["image"] = fs.readFileSync(file.path, { encoding: 'base64' });
            } catch (error) {
                res.status(400).json({ status: 'error', error: 'Could not read image' });
                res.end();
            }
        }
    })

    // All fields and files are loaded
    form.on('end', async () => {
        console.log(product)
        // Do validation on our data
        if (!(product.name != undefined &&
            product.price != undefined &&
            product.description != undefined &&
            product.stock != undefined &&
            product.image != undefined &&
            product.category != undefined)) {
            res.writeHead(301, { location: "/admin?error=Missing%20Field" });
            return res.end();
        }

        product.created = new Date();
        product.last_updated = new Date();

        try {
            await db_req("INSERT INTO products (name, description, price, stock, category, image, created, last_updated) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [
                product.name, 
                product.description,
                product.price,
                product.stock,
                product.category,
                product.image,
                product.created,
                product.last_updated
            ])
        } catch (error) {
            res.writeHead(301, { location: "/admin?error=Database%20error" });
            return res.end();
        }
        
        res.writeHead(301, { location: "/admin" });
        return res.end();
    });

    // Parse the form
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.writeHead(301, { location: "/admin?error=Parse%20error" });
            return res.end();
        }
    });
};
