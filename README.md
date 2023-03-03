# Rock Merch online store backend

The server side of the project.
## 💻Technologies
- [Typescript](https://www.typescriptlang.org/ "Typescript") - tooling and minimizing errors
- [Node.js](https://nodejs.org/en/ "Node.js") and [NestJS](https://nestjs.com/ "NestJS") with [Express](https://expressjs.com/ "Express") - build the server
- [TypeORM](https://typeorm.io/ "TypeORM") with [MySQL](https://www.mysql.com/ "MySQL") and [node MySQL2](https://github.com/sidorares/node-mysql2 "node MySQL2") - store data
- [NestJS-Mailer](https://nest-modules.github.io/mailer/ "NestJS-Mailer") - send email with [handlebars](https://handlebarsjs.com/ "handlebars") templates
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js "Bcrypt") - password hashing
- [CryptoJS](https://cryptojs.gitbook.io/docs/ "CryptoJS") - hashing authentication tokens
- [Prettier](https://prettier.io/ "Prettier") - code formatting

## 📌Features
- [x] Auth:  token for reset password, verification email, verification password
- [x] Send an email with Nodemailer and Handlebars
- [x] Full featured shopping cart - add, remove, update
- [x] Full featured wishlist - add, remove
- [x] Products pagination
- [x] User profile with orders, address, login details
- [x] Checkout process - moving cart to an order
- [x] Filter products by category
- [x] Save user's session with express-session

## 📝UML diagram
[![UML diagram](http://www.plantuml.com/plantuml/png/hLTjRzis4FwkNy6vm6033XAd3L04gX3NIJPZIne4QOS11GnQFDk49L8bQJXkalzUlaWoAJkfcit-OF6UuxqyTqVHPr9XeLPv5aM_4PXH1aZXQGPTO3Y7FY9Jyzj3m1HL6zI9fub5uiDfyfN5CyuKalGxV1WSePHdN7oO2xn9kkM--D1e99sjzM89c-vz3ptCA6Ja2Mc3iTruUex5yW-U4M2td2JnxrenYGyjbg1xux0sCciQSHRU3ErdPs-zJmjMETkty-BIVFNE70Z51m9IBeXl8bfG0aWg4C3LfW3f13ce1IVb8gKYpI2A52-GucZAbU8v8bHRKvIpA99BoWeiS8u4Np6YVJ0GwCIJPpfCOnvneGrxW5nWmjUKpT4CPn8yP84PMGkg5B0Iyy0qmrAYXmZfpqUSBkVMySXaXTOBgi0YGo7usWabuBa0O6w79W540tYAT8QsHz18zyuvA4mpsKUfNao8Mw4UmZAKc1XiyH4bg7UAnjTttS6WXxIuB0lwjiAkpJHyDxx-rwYy2pHCgndqo_1szEVmjZiuih3j1-jk7DYEuyk_agHMqEdcUnMUwep-eNAHKQdwQ5q-kLJgrJQDbGGnRgPIFEF8Sp722kPSKB2SLSyLO_Mw1Lzcn7mstlfiwFhheIsTRNwIzbW7N1VIH1yMCf2q2EoPCbNmYb4b9vHDfEBfic6ZTQbk5bnn7MvXVrsWvNER44NgHtXo58Q8CnN09xyMc-6pPDAZy5L5BLtxt4qAGLEhT7un6byD_-wUzD5ne4P0fe8MvjZPbsOrCAsQuvCv1Ehki4T2s1wXwC4BGt65inRXldho7PasWDVCeasjIihFfbMfohmrYpQvuTt5tVZgmjSGy6sbZtyIA0LfBMXHl81ZGWJe4poeOH14Mj9MmSSXN71fIf1o0YzefVgjeCHBTbmbKoxLYuNK0yX2H_xax1wPEyrs2nBKZNvfhJMxVKsWNawASkqAr92rA9JYImZcO73yFb20-u8AN4sBNydMWN-MjfECPjb8xh55U3CgfBfkp7s3V_qUtr5v6wf0hkVFnz-5HyUMnLDKrYPK-9-QRVHVUsr_4pq5rmvttzZUCzhmd7D2zRsFdE-Ps9_NkMFSTD3Zuy41Vq0T_tBJYJhsV7yMjQtWq4UDLhU9S5y3sTu5VBErRCUb_vBUHTsRyHcpJZVgkADl6qrmiEy6suIzB7a5xv67yzjWvz5nf_ynd04Zve_93m00 "UML diagram")](http://www.plantuml.com/plantuml/png/hLTjRzis4FwkNy6vm6033XAd3L04gX3NIJPZIne4QOS11GnQFDk49L8bQJXkalzUlaWoAJkfcit-OF6UuxqyTqVHPr9XeLPv5aM_4PXH1aZXQGPTO3Y7FY9Jyzj3m1HL6zI9fub5uiDfyfN5CyuKalGxV1WSePHdN7oO2xn9kkM--D1e99sjzM89c-vz3ptCA6Ja2Mc3iTruUex5yW-U4M2td2JnxrenYGyjbg1xux0sCciQSHRU3ErdPs-zJmjMETkty-BIVFNE70Z51m9IBeXl8bfG0aWg4C3LfW3f13ce1IVb8gKYpI2A52-GucZAbU8v8bHRKvIpA99BoWeiS8u4Np6YVJ0GwCIJPpfCOnvneGrxW5nWmjUKpT4CPn8yP84PMGkg5B0Iyy0qmrAYXmZfpqUSBkVMySXaXTOBgi0YGo7usWabuBa0O6w79W540tYAT8QsHz18zyuvA4mpsKUfNao8Mw4UmZAKc1XiyH4bg7UAnjTttS6WXxIuB0lwjiAkpJHyDxx-rwYy2pHCgndqo_1szEVmjZiuih3j1-jk7DYEuyk_agHMqEdcUnMUwep-eNAHKQdwQ5q-kLJgrJQDbGGnRgPIFEF8Sp722kPSKB2SLSyLO_Mw1Lzcn7mstlfiwFhheIsTRNwIzbW7N1VIH1yMCf2q2EoPCbNmYb4b9vHDfEBfic6ZTQbk5bnn7MvXVrsWvNER44NgHtXo58Q8CnN09xyMc-6pPDAZy5L5BLtxt4qAGLEhT7un6byD_-wUzD5ne4P0fe8MvjZPbsOrCAsQuvCv1Ehki4T2s1wXwC4BGt65inRXldho7PasWDVCeasjIihFfbMfohmrYpQvuTt5tVZgmjSGy6sbZtyIA0LfBMXHl81ZGWJe4poeOH14Mj9MmSSXN71fIf1o0YzefVgjeCHBTbmbKoxLYuNK0yX2H_xax1wPEyrs2nBKZNvfhJMxVKsWNawASkqAr92rA9JYImZcO73yFb20-u8AN4sBNydMWN-MjfECPjb8xh55U3CgfBfkp7s3V_qUtr5v6wf0hkVFnz-5HyUMnLDKrYPK-9-QRVHVUsr_4pq5rmvttzZUCzhmd7D2zRsFdE-Ps9_NkMFSTD3Zuy41Vq0T_tBJYJhsV7yMjQtWq4UDLhU9S5y3sTu5VBErRCUb_vBUHTsRyHcpJZVgkADl6qrmiEy6suIzB7a5xv67yzjWvz5nf_ynd04Zve_93m00 "UML diagram")
