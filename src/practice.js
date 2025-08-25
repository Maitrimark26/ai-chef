import fs from 'fs';
fs.writeFileSync('./practice.txt',"Hello guys i have 100 subscribers on youtube")
let result=fs.readFileSync('./practice.txt','utf-8')
console.log(result)