# Checkin system
一般使用者有按鈕可以打卡- 出缺勤僅計算工作日（根據台灣行事曆）
- 上下班打卡機制 :早上上班打卡一次，晚上下班打卡一次，未滿 8 小時為缺勤

## 功能列表
* 使用者登入
* 使用者登出
* 使用者打卡
* 使用者修改密碼
* 管理者頁面，修改考勤


## 安裝
 1.打開你的 terminal，Clone 此專案至本機電腦
      
    git clone https://github.com/KeYunTinG/checkin_system
 2.開啟終端機(Terminal)，進入存放此專案的資料夾
 
    cd checkin_system
 3.安裝 nodemon
 
    npm install -g nodemon
 4.npm install所需要的套件
 
    npm install  
 5.建立 MySQL Table，在終端機輸入：

    npx sequelize db:migrate 

 6.建立種子資料，在終端機輸入：

    npx sequelize db:seed:all 

 7.執行專案，在終端機輸入：

    npm run dev

 8.使用
    如果連線成功，終端機出現下列訊息 "Example app listening on port 3000!"
    則可開啟瀏覽器輸入 http://localhost:3000 使用

 9.提供預設使用者 Seed User
| 帳號 | 密碼 |
| :------------- | :------------- |
| root  | 12345678 |
| user1 | acuser |

# 開發工具
- bcrypt-nodejs: 0.0.3
- bcryptjs: 2.4.3
- body-parser: 1.18.3
- chai: 4.2.0
- connect-flash: 0.1.1
- cross-env: 7.0.3
- dotenv: 8.2.0
- express: 4.16.4
- express-handlebars: 3.0.0
- express-session: 1.15.6
- faker: 4.1.0
- jsonwebtoken: 8.5.1
- method-override: 3.0.0
- mocha: 6.0.2
- moment: 2.29.4
- mysql2: 1.6.4
- passport: 0.4.0
- passport-jwt: 4.0.0
- passport-local: 1.0.0
- sequelize: 6.18.0
- sequelize-cli: 5.5.0
- sinon: 10.0.0
- sinon-chai: 3.3.0

## 開發人員
Quinn
