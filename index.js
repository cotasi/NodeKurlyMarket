const express = require("express");
const path = require("path");
const cors = require("cors");
const port = 8001;
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

// JSON 파싱을 위한 body-parser 미들웨어 설정
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "83248324",
  database: "haruka",
  port: "3306",
});

connection.connect((err) => {
  if (err) {
    console.log("this is error...!");
    return;
  }
  console.log("connected!");
});

app.use(express.static(path.join(__dirname, "./front/build")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./front/build/index.html"));
});

const menu_query = `
    select * from categories left join categories_sub on categories.main_id = categories_sub.main_id
`;

app.get("/api", (req, res) => {
  connection.query(menu_query, (err, rows) => {
    if (err) throw err;
    const data = rows.reduce((acc, row) => {
      let category = acc.find((cat) => cat.main_id === row.main_id);
      if (!category) {
        category = {
          main_id: row.main_id,
          category: row.category,
          category_name: row.category_name,
          icon_path: row.icon_path,
          categories_sub: [],
        };
        acc.push(category);
      }
      if (row.main_id) {
        category.categories_sub.push({
          sub_id: row.sub_id,
          sub_category: row.sub_category,
          sub_name: row.sub_name,
        });
      }
      return acc;
    }, []);

    res.json(data);
  });
});

const itemquery = `select * from categories left join items on categories.main_id = items.main_id`;

app.get("/items", (req, res) => {
  connection.query(itemquery, (err, rower) => {
    if (err) throw err;
    const datas = rower.reduce((accept, rowing) => {
      let items = accept.find((itm) => itm.main_id === rowing.main_id);
      if (!items) {
        items = {
          main_id: rowing.main_id,
          itemes: [],
        };
        accept.push(items);
      }
      if (rowing.main_id) {
        items.itemes.push({
          item_id: rowing.item_id,
          img_path: rowing.img_path,
          names: rowing.names,
          delivery: rowing.delivery,
          real_price: rowing.real_price,
          sale_price: rowing.sale_price,
          types: rowing.types,
          descs: rowing.descs,
          origin: rowing.origin,
          deltype: rowing.deltype,
          grams: rowing.grams,
          counts: rowing.counts,
        });
      }
      return accept;
    }, []);

    res.json(datas);
  });
});

app.post("/member/idcheck", (req, res) => {
  connection.query("select * from members", (err, re) => {
    if (err) throw err;
    res.json(re);
  });
});

app.post("/member/emailcheck", (req, res) => {
  connection.query("select * from members", (err, resul) => {
    if (err) throw err;
    res.json(resul);
  });
});

app.post("/member/pwcheck", (req, res) => {
  connection.query("select * from members", (err, r) => {
    if (err) throw err;
    res.json(r);
  });
});

app.post("/member/submit", (req, res) => {
  const { uid, upwd, uname, uem } = req.body;
  console.log(uid);
  connection.query(
    `insert into members (uid,upwd,uname,uem,levels) values (?,?,?,?,3)`,
    [uid, upwd, uname, uem],
    (err, relts) => {
      if (err) throw err;
      res.json("성공적으로 전송됨");
    }
  );
});

app.post("/login/:id/:pw", (req, res) => {
  const params = req.params;
  console.log(params);
  connection.query(
    `select * from members where uid=${params.id} and upwd=${params.pw}`,
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.post("/users", (req, res) => {
  connection.query(`select * from members`, (err, rst) => {
    if (err) throw err;
    res.json(rst);
  });
});

app.post("/users/del", (req, res) => {
  const { mainid } = req.body;
  connection.query(
    `delete from members where main_id = ?`,
    [mainid],
    (err, what) => {
      if (err) throw err;
      res.json(what);
    }
  );
});

app.listen(port, () => {
  console.log(`localhost:${port} 서버정상구동`);
});
