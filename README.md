# danupon_test2

##วิธีติดตั้งโปรแกรม
1.Clone repository ลงเครื่อง local
2.ทำการเปิด project โดยใช้ vscode
3.New Terminal ขึ้นมา 2 terminal
4.npm install
5.ทำการ setting database เพิื่อเก็บข้อมูล ที่ไฟล์ 6loadDatabase.js และ 7exportToPDF.js
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password123',
        database: 'db'
    });
6.ทำการ clear terminal ที่ run npm install ไว้ โดยใช้คำสั่ง
    -clear
7.run โปรแกรม รอบที่ 1 ที่ terminal ที่ 1
    -node run.js
    -ดูเวลาที่ใช้ทำทั้งหมด
8.run โปรแกรม รอบที่ 2 ที่ terminal ที่ 2
    -node run.js
    -ดูเวลาที่ใช้ทำทั้งหมด และเปรียบเทียบเวลาของรอบที่ 1 และ รอบที่ 2