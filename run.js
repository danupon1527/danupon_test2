import randomWords from './1randomWords.js';
import createWordFiles from './2createWordFiles.js';
import organizeDirectories from './3organizeDirectories.js';
import reportDirectorySize from './4reportDirectorySize.js';
import zipDirectories from './5zipDirectories.js';
import loadDatabase from './6loadDatabase.js';
import exportToPDF from './7exportToPDF.js';

async function run() {
    const start = Date.now();
    await randomWords();
    await createWordFiles();
    await organizeDirectories();
    await reportDirectorySize();
    await zipDirectories();
    await loadDatabase();
    await exportToPDF();
    const end = Date.now();
    const elapsedTime = end - start;
    const elapsedTimeSec = elapsedTime / 1000;
    console.log('เวลาที่ใช้: ',elapsedTimeSec, 'วินาที');
}

run();



// async function randomWords() {}

// try {
   
//     console.log('2. เอามาสร้างไฟล์ text โดยให้ชื่อไฟล์เป็นชื่อคำศัพท์');
//     console.log('===================================== ข้อ (2) สำเร็จ =====================================');
// } catch (error) {
//     console.error(`Error : ${error}`);
//     console.log('===================================== ข้อ (2) ไม่สำเร็จ =====================================');
// }