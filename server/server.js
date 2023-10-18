require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;
const cors = require('cors');
const db = require ('./db');

const {encrypt, decrypt} = require(`./EncryptionHandler`)

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })


// app.post(`/addPassword`, (req, res, next) => {
//     try{
//     	const {password, account} = req.body

//         db.query(
//             "INSERT INTO passwords (password, account) VALUES (?, ?)", 
//             [password, account], 
//             (err, result) => {
//                 if (err){
//                     console.log(err);
//                     next(err);
//                 } else{
//                     res.send("Success");
//                 }
//             }
//         );
//     } catch(err){
//         console.log(err.response.data);
//         next(err)
//     }
// });

// app.post(`/addPassword`, async (req, res) => {
//     console.log('hi');
//     try{
//         const {password, account} = req.body
//         await db.query(
//             "INSERT INTO passwords (password, account) VALUES (?, ?)", 
//             [password, account,], 
//             (err, result) => {
//                 if (err){
//                     console.log(err);
//                 } else{
//                     res.send("Success");
//                 }
//             }
//         );
//     } catch(err){
//         console.log(err);
//     }
// });

app.post(`/addPassword`, async (req, res) => {
    console.log(req.body);
    const encryptedPassword = encrypt(req.body.password);

    try{
        const results = await db.query(
            "INSERT INTO passwords (password, account, iv) VALUES ($1, $2, $3) returning *",
            [encryptedPassword.password, req.body.account, encryptedPassword.iv]);
        res.status(201).json({
            status: "Success",
            data:{
                password: results.rows[0],
            }
        });
    } catch(err){
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`)
});