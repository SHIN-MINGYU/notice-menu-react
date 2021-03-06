const express = require('express');
const app = express();
const { sequelize } = require('./models');
const sympathyGroup = require('./models/sympathygroup');
const Comment = require('./models/comment');
const Login_Info = require('./models/login_info');
const NoticeRouter = require('./routers/NoticeRouter');
const cors = require('cors')

app.use(cors())
app.use('/notice', NoticeRouter);

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });
const port = 3001;

app.get('/sym', async (req, res) => {
    const sym = await sympathyGroup.findAll();
    res.json(sym);
})
app.get('/com', async (req, res) => {
    const com = await Comment.findAll();
    res.json(com);
})
app.get('/user_info', async (req, res) => {
    const info = await Login_Info.findAll();
    res.json(info)
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})