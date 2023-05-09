import db from "./db.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

//////  chat  GET - POST /////////////

app.get("/chat/:idsala", async (req, resp) => {
  try {

    let idsala = await db.tb_sala.findOne({where: {nm_sala: req.params.idsala}});
    if (idsala == null)
    return resp.send({erro: 'Sala não existe'})



    let chat = await db.tb_chat.findAll({
      where: {
        id_sala: idsala.id_sala,
      
      },
      order: [["id_chat", "desc"]],
      include: ["tb_sala", "tb_usuario"]
    });

    resp.send(chat);
  } catch (e) {
    resp.send(e.toString());
  }
});

app.post("/chat", async (req, resp) => {
  try {
    let chat = req.body;

    let salaParams = await db.tb_sala.findOne({
      where: { nm_sala: chat.sala.nome},
    });
    let usuaParams = await db.tb_usuario.findOne({
      where: { nm_nick: chat.usuario.nome },
    });

    if (usuaParams == null) return resp.send({ error: "usuario não existi" });

    if (salaParams == null) return resp.send({ error: "sala não existi" });

    if (!chat.mensagem || chat.mensagem.replace(/\n/g, "") == "")
      return resp.send({ error: "Mensagem obrigatória" });

    let x = {
      id_sala: salaParams.id_sala,
      id_usuario: usuaParams.id_usuario,
      ds_mensagem: chat.mensagem
    };

    let r = await db.tb_chat.create(x);
    resp.send(r);
  } catch (e) {
    resp.send(e.toString(e));
  }
});

//////  sala  GET - POST /////////////

app.get("/sala", async (req, resp) => {
  try {
    let salas = await db.tb_sala.findAll({});
    resp.send(salas);
  } catch (e) {
    resp.send(e.toString(e));
  }
});

app.post("/sala", async (req, resp) => {
  try {
    let salaParams = req.body;

    let s = await db.tb_sala.findOne({ where: { nm_sala: salaParams.sala} });
    if (s != null) return resp.send({ erro: "Sala já existe!" });

    let r = await db.tb_sala.create({
      nm_sala: salaParams.sala
    });
    resp.send(r);
  } catch (e) {
    resp.send(e.toString(e));
  }
});

///// login GET - POST ////////////////////


app.post("/cadastro", async (req, resp) => {
  try {
    let LoginParams = req.body;

    let s = await db.tb_usuario.findOne({ where: { nm_email: LoginParams.email } });
    if (s != null) return resp.send({ erro: "email já existe!" });

    let r = await db.tb_usuario.create({
      nm_email: LoginParams.email,
      nm_senha: LoginParams.senha,
      nm_nick:  LoginParams.nick
    });
    resp.send(r);
  } catch (e) {
    resp.send(e.toString(e));
  }
});






app.post("/login", async (req, resp) => {
  const login = req.body.login;
  const senha = req.body.senha;

  let l = await db.tb_usuario.findOne({
    where: {
      nm_email: login,
      nm_senha: senha
    },
    raw: true,
  });

  if (l == null) return resp.send({ erro: "Email ou Senha inválidos !" });

  delete l.nm_senha;
  resp.send(l);
});

//////  usuario  GET - POST /////////////

app.get("/usuario", async (req, resp) => {
  try {
    let usuarios = await db.tb_usuario.findAll({});
    resp.send(usuarios);
  } catch (e) {
    resp.send(e.toString(e));
  }
});





app.listen(
  process.env.PORT,

  (x) => console.log(`Servidor subiu na porta ${process.env.PORT}`)
);
