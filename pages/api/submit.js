//import { NextApiRequest, NextApiResponse } from "next"
import { google } from "googleapis"


async function handler(req, res) {
    if(req.method === "POST"){
        const {name, email, phone, message} = req.body
        console.log(name, email, phone, message)
        const auth = new google.auth.GoogleAuth({
            credentials:{
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                client_id: process.env.GOOGLE_CLIENT_ID,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            },
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets',
            ]
        });

        const sheets = google.sheets({
            auth,
            version:'v4'
        });

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range:'Sheet1!A2:D',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[name,phone,email,message]]
            }
        })
        res.status(201).json({message: "Data succesfully Entered"})
    }
    res.status(200).json({message: 'Hey!'});   
   
}

export default handler;
