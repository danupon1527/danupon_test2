import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
// import mysql from 'mysql2';

// USER_NAME="root"
// PORT=3306
// PASSWORD="password123"
// HOST="localhost"
// DB="db"

// เชื่อมต่อฐานข้อมูล MySQL
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'db'
});

// async function loadDatabase() {
//     try {
//         // // เชื่อมต่อฐานข้อมูล MySQL
//         // const connection = mysql.createConnection({
//         //     host: 'localhost',
//         //     user: 'root',
//         //     password: 'password123',
//         //     database: 'db'
//         // });

//         // สร้างตารางหากยังไม่มี
//         const createTable = `
//         CREATE TABLE IF NOT EXISTS dictionary (
//             idDictionary INT AUTO_INCREMENT PRIMARY KEY,
//             word VARCHAR(255)
//         )
//         `;

//         // const createTable = `
//         //     CREATE TABLE IF NOT EXISTS dictionary (
//         //         word VARCHAR(255) PRIMARY KEY
//         //     )
//         // `;

//         const insertWords = `
//         INSERT INTO dictionary (word) VALUES ?
//         `;

//         const countLongWords = `
//         SELECT COUNT(*) AS count FROM dictionary WHERE LENGTH(word) > 5
//         `;

//         const countRepeatedChars = `
//         SELECT COUNT(*) AS count FROM dictionary WHERE word REGEXP "[a-z].*\\1"
//         `;

//         const countSameStartEnd = `
//         SELECT COUNT(*) AS count FROM dictionary WHERE LEFT(word, 1) = RIGHT(word, 1)
//         `;

//         const updateWords = `
//         UPDATE dictionary SET word = CONCAT(UPPER(LEFT(word, 1)), SUBSTRING(word FROM 2))
//         `;

//         function getDictionaryWords() {
//             const dictionaryFile = path.join('dictionary.txt');
//             return fs.readFileSync(dictionaryFile, 'utf8').split(',').map(word => [word.toLowerCase()]);
//         }

//         async function main() {
//             connection.connect();

//             // สร้างตาราง
//             connection.query(createTable, (err) => {
//                 if (err) throw err;
//                 console.log('Table created or exists.');

//                 // โหลดคำศัพท์
//                 const words = getDictionaryWords();
//                 connection.query(insertWords, [words], (err) => {
//                     if (err) throw err;
//                     console.log('Words inserted.');

//                     // รันคำสั่ง query
//                     connection.query(countLongWords, (err, results) => {
//                         if (err) throw err;
//                         console.log(`Number of words with length > 5: ${results[0].count}`);

//                         connection.query(countRepeatedChars, (err, results) => {
//                             if (err) throw err;
//                             console.log(`Number of words with repeated characters: ${results[0].count}`);

//                             connection.query(countSameStartEnd, (err, results) => {
//                                 if (err) throw err;
//                                 console.log(`Number of words that start and end with the same letter: ${results[0].count}`);

//                                 // อัปเดตคำศัพท์
//                                 connection.query(updateWords, (err) => {
//                                     if (err) throw err;
//                                     console.log('Updated all words to have the first letter capitalized.');
//                                     connection.end();
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         }

//         main();
//         console.log('7. เอา dictionary ลงใน Database');
//         console.log('===================================== ข้อ (7) สำเร็จ =====================================');
//     } catch (error) {
//         console.error(`Error : ${error}`);
//         console.log('===================================== ข้อ (7) ไม่สำเร็จ =====================================');
//     }
// }

async function loadDatabase() {
    try {
        // Create table if it doesn't exist
        const createTable = `
            CREATE TABLE IF NOT EXISTS dictionary (
                idDictionary INT AUTO_INCREMENT PRIMARY KEY,
                word VARCHAR(255)
            )
        `;
        await connection.query(createTable);
        console.log('Table created or exists.');
        const checkData = `
            SELECT * FROM dictionary WHERE idDictionary = '1';
        `;
        const [check] = await connection.query(checkData);
        console.log('check: ',check[0]);
        if(check.length==0){
            // Create table if it doesn't exist
            // const createTable = `
            //     CREATE TABLE IF NOT EXISTS dictionary (
            //         idDictionary INT AUTO_INCREMENT PRIMARY KEY,
            //         word VARCHAR(255)
            //     )
            // `;

            // const createTable = `
            //     CREATE TABLE IF NOT EXISTS dictionary (
            //         word VARCHAR(255) PRIMARY KEY
            //     )
            // `;

            const insertWords = `
                INSERT INTO dictionary (word) VALUES ?
            `;

            function getDictionaryWords() {
                const dictionaryFile = path.join('dictionary.txt');
                return fs.readFileSync(dictionaryFile, 'utf8').split(',').map(word => [word.toLowerCase()]);
            }
    
            // await connection.query(createTable);
            // console.log('Table created or exists.');
    
            const words = getDictionaryWords();
            await connection.query(insertWords, [words]);
            console.log('Words inserted.');
        }
        // เชื่อมต่อฐานข้อมูล MySQL
        // const connection = await mysql.createConnection({
        //     host: 'localhost',
        //     user: 'root',
        //     password: 'password123',
        //     database: 'db'
        // });


        const countLongWords = `
            SELECT COUNT(*) AS count FROM dictionary WHERE LENGTH(word) > 5
        `;

        const countRepeatedChars = `
            SELECT COUNT(*) AS count FROM dictionary WHERE word REGEXP "[a-z].*\\1"
        `;

        const countSameStartEnd = `
            SELECT COUNT(*) AS count FROM dictionary WHERE LEFT(word, 1) = RIGHT(word, 1)
        `;

        const updateWords = `
            UPDATE dictionary SET word = CONCAT(UPPER(LEFT(word, 1)), SUBSTRING(word FROM 2))
        `;

        const [longWordsResults] = await connection.query(countLongWords);
        console.log(`Number of words with length > 5: ${longWordsResults[0].count}`);

        const [repeatedCharsResults] = await connection.query(countRepeatedChars);
        console.log(`Number of words with repeated characters: ${repeatedCharsResults[0].count}`);

        const [sameStartEndResults] = await connection.query(countSameStartEnd);
        console.log(`Number of words that start and end with the same letter: ${sameStartEndResults[0].count}`);

        await connection.query(updateWords);
        console.log('Updated all words to have the first letter capitalized.');

        // await connection.end();

        console.log('7. เอา dictionary ลงใน Database');
        console.log('===================================== ข้อ (7) สำเร็จ =====================================');
    } catch (error) {
        if(error != `Error: ENOENT: no such file or directory, open 'dictionary.txt'`){
            console.error(`Error: ${error}`);
            console.log('===================================== ข้อ (7) ไม่สำเร็จ =====================================');
        }
    }
}

// // Execute the function
// await loadDatabase();

export default loadDatabase;
