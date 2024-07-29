import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import mysql from 'mysql2';

// เชื่อมต่อฐานข้อมูล MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'db'
});

async function exportToPDF() {
    try {
        const checkDir = path.join('dictionary.pdf');
        if (!fs.existsSync(checkDir)) {
            // console.log('(8)ไม่มี file');

            const outputPath = path.join('dictionary.pdf');

            function exportToPDF() {
                return new Promise((resolve, reject) => {
                    const doc = new PDFDocument();
                    doc.pipe(fs.createWriteStream(outputPath));

                    connection.query('SELECT * FROM dictionary ORDER BY idDictionary ASC', (err, results) => {
                        if (err) return reject(err);

                        results.forEach(row => {
                            doc.text(row.word);
                        });

                        doc.end();
                        console.log(`Exported words to ${outputPath}`);
                        resolve();
                    });
                });
            }

            async function main() {
                connection.connect();

                try {
                    await exportToPDF();
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    connection.end();
                }
            }

            main();
        }else{
            // console.log('(8)มี file');
        }
        console.log('8. Export คำใน database ทั้งหมดออกมาเป็น pdf file เรียงบรรทัดละคำ (ขนาดใช้เป็น A4)');
        console.log('===================================== ข้อ (8) สำเร็จ =====================================');
    } catch (error) {
        console.error(`Error : ${error}`);
        console.log('===================================== ข้อ (8) ไม่สำเร็จ =====================================');
    }
}

export default exportToPDF;
