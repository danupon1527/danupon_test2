import { generate } from 'random-words';
import fs from 'fs/promises';
import path from 'path';
import fsCheck from 'fs';

async function randomWords() {
  const checkFile = path.join('dictionary.txt');
  if (!fsCheck.existsSync(checkFile)) {
    // console.log('(1)ไม่มี file');
    // จำนวนคำที่ต้องการสร้าง
    const numberOfWords = 21000;

    // สร้างคำสุ่ม
    // const words = generate(numberOfWords);

    // สร้างประโยคสุ่ม
    const sentence = generate({ exactly: numberOfWords, join: ',' });

    // เขียนคำลงในไฟล์
    const writeToFile = async (filename, data) => {
      try {
        await fs.writeFile(filename, data);
        console.log('1. สร้างไฟล์ dictionary อังกฤษ >20,000 คำ');
        console.log(`Data written to ${filename}`);
        console.log('===================================== ข้อ (1) สำเร็จ =====================================');
      } catch (error) {
        console.error(`Error : ${error}`);
        console.log('===================================== ข้อ (1) ไม่สำเร็จ =====================================');
      }
    };

    // เขียนคำที่สุ่มลงในไฟล์
    await writeToFile('dictionary.txt', sentence);
  }else{
    // console.log('(1)มี file');
    console.log('===================================== ข้อ (1) สำเร็จ =====================================');
  }
}

export default randomWords;


