const express = require("express");
const path = require("path");
const cors = require("cors");
const port = 8001;
const mysql = require("mysql2");

const app = express();

app.use(express.json());

const connection = mysql.createConnection({
  host: "nodejs-012.cafe24.com",
  user: "haruo135",
  password: "gkfpa13579@",
  database: "haruo135",
  port: "3306",
});

app.use(
  cors({
    origin: "*", // 모든 출처 허용 옵션. true 를 써도 된다.
  })
);

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

app.post("/items/countchange", (req, res) => {
  const { counts, mainid } = req.body;

  connection.query(
    `update items set counts = ? where item_id = ?`,
    [counts, mainid],
    (err, reqs) => {
      if (err) throw err;
      res.json(reqs);
    }
  );
});

app.post("/items/init", (req, res) => {
  const { itemid } = req.body;
  connection.query(
    `update items set counts = 1 where item_id = ?`,
    [itemid],
    (err, qu) => {
      if (err) throw err;
      res.json(qu);
    }
  );
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
    `insert into members (uid,upwd,uname,uem) values (?,?,?,?)`,
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

app.post("/carter", (req, res) => {
  connection.query("select * from cart", (err, real) => {
    if (err) throw err;
    const dater = [];
    real.map((real, num) =>
      dater.push({
        checked: true,
        checkedIndex: num,
        carter: real,
      })
    );
    res.json(dater);
  });
});

app.post("/carter/insert", async (req, res) => {
  const { cart_img, cart_name, cart_count, cart_price, cart_before } = req.body;

  try {
    // 이미 카트에 존재하는지 확인
    const [rows] = await connection
      .promise()
      .query("SELECT COUNT(*) AS isin FROM cart WHERE prd_name = ?", [
        cart_name,
      ]);

    if (rows[0].isin > 0) {
      // 이미 존재하면 업데이트
      await connection.promise().query(
        `UPDATE cart 
         SET prd_counts = prd_counts + ?, prd_price = prd_price + ?, prd_before = prd_before + ? 
         WHERE prd_name = ?`,
        [cart_count, cart_price, cart_before, cart_name]
      );
      res.json({ message: "Cart updated successfully" });
    } else {
      // 존재하지 않으면 새 항목 추가
      await connection
        .promise()
        .query(
          "INSERT INTO cart (prd_img, prd_name, prd_counts, prd_price, prd_before) VALUES (?, ?, ?, ?, ?)",
          [cart_img, cart_name, cart_count, cart_price, cart_before]
        );
      res.json({ message: "Cart inserted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.post("/slider", (req, res) => {
  connection.query(`Select * from slider`, (err, sls) => {
    if (err) throw err;
    res.json(sls);
  });
});

app.post("/notice", (req, res) => {
  connection.query("select * from Notice", (err, not) => {
    if (err) throw err;
    res.json(not);
  });
});

app.post("/notice/submit", (req, res) => {
  const { contents, notice_subject } = req.body;
  connection.query(
    `insert into Notice (notice_author,notice_subject,notice_contents,notice_date,notice_isNotice,) values('admin',?,?,'2020.05.20','1')`,
    [notice_subject, contents],
    (err, notire) => {
      if (err) throw err;
      res.json(notire);
    }
  );
});

app.listen(port, () => {
  console.log(`localhost:${port} 서버정상구동`);
});
