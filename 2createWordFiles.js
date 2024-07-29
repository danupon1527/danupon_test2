import path from 'path';
import fs from 'fs';

async function createWordFiles() {
    try {
        // อ่านไฟล์พจนานุกรม
        const dictionary = fs.readFileSync('dictionary.txt', 'utf8').split(',');

        // สร้างไดเร็กทอรี output หากยังไม่มี
        const outputDir = path.join('dic_X100');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
            
            // สร้างไฟล์ข้อความสำหรับแต่ละคำ
            dictionary.forEach(word => {
                const filePath = path.join(outputDir, `${word}.txt`);
                const content = `${word.toLowerCase()}\n`.repeat(100);
                fs.writeFileSync(filePath, content);
                // console.log(`Created ${filePath}`);
            });
        }

        console.log('2. เอามาสร้างไฟล์ text โดยให้ชื่อไฟล์เป็นชื่อคำศัพท์');
        console.log('===================================== ข้อ (2) สำเร็จ =====================================');
        console.log('3. ใช้เป็นตัวอักษรตัวเล็กทั้งหมด');
        console.log('===================================== ข้อ (3) สำเร็จ =====================================');
    } catch (error) {
        console.error(`Error : ${error}`);
        console.log('===================================== ข้อ (2) ไม่สำเร็จ =====================================');
    }
}

export default createWordFiles;
