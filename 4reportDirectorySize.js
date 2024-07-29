import path from 'path';
import fs from 'fs';

async function reportDirectorySize() {
    try {
        // ไดเร็กทอรีที่ไฟล์คำศัพท์ถูกเก็บไว้
        const baseDir = path.join('dic_X100');

        function getDirectorySize(dirPath) {
            const files = fs.readdirSync(dirPath);
            let totalSize = 0;

            files.forEach(file => {
                const filePath = path.join(dirPath, file);
                const filesList = fs.readdirSync(filePath);
                // console.log('filesList:',filesList);
                filesList.forEach(fileList => {
                    const filePathList = path.join(filePath, fileList);
                    const statsList = fs.statSync(filePathList);
                    totalSize += statsList.size;
                });
            });

            return totalSize / 1024; // แปลงเป็น KB
        }

        // รายงานขนาดของไดเร็กทอรีระดับบน
        fs.readdirSync(baseDir).forEach(dir => {
            const dirPath = path.join(baseDir, dir);
            if (fs.statSync(dirPath).isDirectory()) {
                const size = getDirectorySize(dirPath);
                console.log(`Directory: ${dir} - Size: ${size.toFixed(2)} KB`);
            }
        });
        console.log('5. ทำ report ของ folder size ว่ามีขนาดเท่าไหร่เป็น Kbyte และมีลิสต์ของแต่ละไฟล์ด้วย');
        console.log('===================================== ข้อ (5) สำเร็จ =====================================');
    } catch (error) {
        console.error(`Error : ${error}`);
        console.log('===================================== ข้อ (5) ไม่สำเร็จ =====================================');
    }
}

export default reportDirectorySize;
