import path from 'path';
import fs from 'fs';

async function organizeDirectories() {
    try {
        const checkDir = path.join('dic_X100/a');
        if (!fs.existsSync(checkDir)) {
            // console.log('(4)ไม่มี file');
            // ไดเร็กทอรีที่ไฟล์คำศัพท์ถูกเก็บไว้
            const inputDir = path.join('dic_X100');

            // จัดไฟล์ลงในไดเร็กทอรี
            fs.readdirSync(inputDir).forEach(file => {
                const fileName = path.basename(file, '.txt');
                const firstLetter = fileName[0].toLowerCase();
                const secondLetter = fileName[1]?.toLowerCase() || '_';
                
                const targetDir = path.join(inputDir, firstLetter, secondLetter);
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }
                
                const oldPath = path.join(inputDir, file);
                const newPath = path.join(targetDir, file);
                
                fs.renameSync(oldPath, newPath);
                // console.log(`Moved ${file} to ${newPath}`);
            });   
        }else{
            // console.log('(4)มี file');
        }
        console.log('4. ไฟล์เหล่านี้ให้เก็บไว้ใน directory ตามตัวอักษร 2 level');
        console.log('===================================== ข้อ (4) สำเร็จ =====================================');
    } catch (error) {
        console.error(`Error : ${error}`);
        console.log('===================================== ข้อ (4) ไม่สำเร็จ =====================================');
    }
}

export default organizeDirectories;
