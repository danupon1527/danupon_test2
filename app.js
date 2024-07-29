const express = require('express'); //เรียกใช้ express ผ่าน require
const myApp = express(); //สร้างตัวแปร myApp เพื่อใช้งาน express 
const port = 3000; //พอร์ตของ Server ที่ใช้ในการเปิด Localhost 


myApp.get('/', (req, res) => {
  res.send('Hello World!');
}); 

myApp.listen(port, () => {
  console.log(`Server running at <http://localhost>:${port}/`);
});
