# CUBlood backend

```
$ fork
$ cd CUBlood-backend
$ npm install
$ node .
```

---

* [API Explorer ไว้สำหรับลองเล่น API, ใช้เป็น guildline ในการเขียนเชื่อมต่อ API ของ frontend](http://localhost:3000)

---

* [Built in model api](https://loopback.io/doc/en/lb2/Built-in-models-REST-API.html)
* [User authorization](https://loopback.io/doc/en/lb2/Introduction-to-User-model-authentication.html)

---

แก้ code เกี่ยวกับ user model ใน
* [Chomtana/cublood-loopback](https://github.com/Chomtana/cublood-loopback) -> common/models/user.json
* [Chomtana/cublood-loopback](https://github.com/Chomtana/cublood-loopback) -> common/models/user.js
* **ไม่ใช่ repository นี้**

---

ตอน frontend ทำหน้า login จะยากหน่อย **แต่เขียนให้เสร็จแล้ว 555**
* **อยู่ใน [localhost:3000](http://localhost:3000), client/index.html, ใช้ Vue เขียน**
* ให้เก็บ access token กับ user id ไว้ใน sessionStorage (ถ้าไม่ remember me) หรือ local storage (ถ้า remember me)
* ตอน logout ส่ง ajax ไปที่ logout พอ logout เสร็จ ลบ access token กับ user id ออกจาก sessionStorage / local storage

