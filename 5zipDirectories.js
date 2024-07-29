import path from 'path';
import fs from 'fs';
import archiver from 'archiver';
// const archiver = require('archiver');

// async function zipDirectories() {
//     try {
//         // ไดเร็กทอรีที่ไฟล์คำศัพท์ถูกเก็บไว้
//         const baseDir = path.join('dic_X100');

//         function zipDirectory(sourceDir, outPath) {
//             const output = fs.createWriteStream(outPath);
//             const archive = archiver('zip', { zlib: { level: 9 } });

//             output.on('close', () => {
//                 const originalSize = getDirectorySize(sourceDir);
//                 const compressedSize = fs.statSync(outPath).size / 1024;
//                 const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;
//                 console.log(`Directory: ${sourceDir} - Original Size: ${originalSize.toFixed(2)} KB - Compressed Size: ${compressedSize.toFixed(2)} KB - Compression Ratio: ${compressionRatio.toFixed(2)}%`);
//             });

//             archive.pipe(output);
//             archive.directory(sourceDir, false);
//             archive.finalize();
//         }

//         function getDirectorySize(dirPath) {
//             const files = fs.readdirSync(dirPath);
//             let totalSize = 0;

//             files.forEach(file => {
//                 const filePath = path.join(dirPath, file);
//                 const stats = fs.statSync(filePath);
//                 totalSize += stats.size;
//             });

//             return totalSize / 1024; // แปลงเป็น KB
//         }

//         // บีบอัดไดเร็กทอรีระดับบน
//         fs.readdirSync(baseDir).forEach(dir => {
//             const dirPath = path.join(baseDir, dir);
//             if (fs.statSync(dirPath).isDirectory()) {
//                 const zipPath = path.join(baseDir, `${dir}.zip`);
//                 zipDirectory(dirPath, zipPath);
//             }
//         });
//         console.log('6. zip ไฟล์ทีละไดเรคทอรี เป็น a.zip, b.zip,... แล้วทำ report เปรียบเทียบว่า ขนาดก่อน zip กับหลัง zip ต่างกันเป็นกี่ %');
//         console.log('===================================== ข้อ (6) สำเร็จ =====================================');
//     } catch (error) {
//         console.error(`Error : ${error}`);
//         console.log('===================================== ข้อ (6) ไม่สำเร็จ =====================================');
//     }
// }

async function zipDirectory(sourceDir, outPath) {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', async () => {
            try {
                const originalSize = await getDirectorySize(sourceDir);
                // const originalSize = fs.statSync(sourceDir).size / 1024;
                const compressedSize = fs.statSync(outPath).size / 1024;
                const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;
                console.log(`Directory: ${sourceDir} - Original Size: ${originalSize.toFixed(2)} KB - Compressed Size: ${compressedSize.toFixed(2)} KB - Compression Ratio: ${compressionRatio.toFixed(2)}%`);
                resolve();
            } catch (err) {
                reject(err);
            }
        });

        archive.on('error', (err) => reject(err));

        archive.pipe(output);
        archive.directory(sourceDir, false);
        archive.finalize();
    });
}

async function noZipDirectory(sourceDir, outPath) {
    // const originalSize = await getDirectorySize(sourceDir);
    // // const originalSize = fs.statSync(sourceDir).size / 1024;
    // const compressedSize = fs.statSync(outPath).size / 1024;
    // const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;
    // console.log(`Directory: ${sourceDir} - Original Size: ${originalSize.toFixed(2)} KB - Compressed Size: ${compressedSize.toFixed(2)} KB - Compression Ratio: ${compressionRatio.toFixed(2)}%`);
    try {
        const originalSize = await getDirectorySize(sourceDir);
        // const originalSize = fs.statSync(sourceDir).size / 1024;
        const compressedSize = fs.statSync(outPath).size / 1024;
        const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;
        console.log(`Directory: ${sourceDir} - Original Size: ${originalSize.toFixed(2)} KB - Compressed Size: ${compressedSize.toFixed(2)} KB - Compression Ratio: ${compressionRatio.toFixed(2)}%`);
        // resolve();
    } catch (err) {
        // reject(err);
    }
}

async function getDirectorySize(dirPath) {
    const files = await fs.promises.readdir(dirPath);
    let totalSize = 0;

    // for (const file of files) {
    //     const filePath = path.join(dirPath, file);
    //     const stats = await fs.promises.stat(filePath);
    //     totalSize += stats.size;
    // }
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

    return totalSize / 1024; // Convert to KB
}

async function zipDirectories() {
    try {
        const checkDir = path.join('dic_X100/a.zip');
        const baseDir = path.join('dic_X100');
        const dirs = await fs.promises.readdir(baseDir);
        if (!fs.existsSync(checkDir)) {
            // console.log('(6)ไม่มี file');
            // Directory where the vocabulary files are stored
            // const baseDir = path.join('dic_X100');
            // const dirs = await fs.promises.readdir(baseDir);

            for (const dir of dirs) {
                const dirPath = path.join(baseDir, dir);
                const stat = await fs.promises.stat(dirPath);
                if (stat.isDirectory()) {
                    const zipPath = path.join(baseDir, `${dir}.zip`);
                    await zipDirectory(dirPath, zipPath);
                }
            }
        }else{
            // console.log('(6)มี file');
            for (const dir of dirs) {
                const dirPath = path.join(baseDir, dir);
                const zipPath = path.join(baseDir, `${dir}.zip`);
                await noZipDirectory(dirPath, zipPath);
            }
        }

        console.log('6. zip ไฟล์ทีละไดเรคทอรี เป็น a.zip, b.zip,... แล้วทำ report เปรียบเทียบว่า ขนาดก่อน zip กับหลัง zip ต่างกันเป็นกี่ %');
        console.log('===================================== ข้อ (6) สำเร็จ =====================================');
    } catch (error) {
        if(error != `Error: ENOENT: no such file or directory, scandir 'dic_X100'`){
            console.error(`Error: ${error}`);
            console.log('===================================== ข้อ (6) ไม่สำเร็จ =====================================');
        }
    }
}

// Execute the function
// await zipDirectories();

export default zipDirectories;
