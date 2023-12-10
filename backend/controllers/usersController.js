const asyncHandler = require("express-async-handler");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");

const User = require("../models/user.model");
require("dotenv").config();

exports.userRegister = asyncHandler(async (req, res) => {
  try {
    const userCheck = await User.findOne({ username: req.body.username });
    if (userCheck) {
      return res.json({ error: "user already exists" });
    }

    const emailCheck = await User.findOne({ email: req.body.email });
    if (emailCheck) {
      return res.json({ error: "email already exists" });
    }

    // encrypt password usyng bcrypt
    req.body.password = bcrypt.hashSync(req.body.password, 12);

    const user = await User.create(req.body);

    verifyEmail(user);
    res.json(user);
  } catch (error) {
    res.json({ error: error });
  }
});

exports.userLogin = asyncHandler(async (req, res) => {
  // Check if user exists
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.json({ error: "Wrong username/password" });
  }

  const eq = bcrypt.compareSync(req.body.password, user.password);

  if (!eq) {
    return res.json({ error: "Wrong username/password" });
  }

  const token = createToken(user);

  if (user.role === process.env.ADMIN_TOKEN) {
    res.json({
      succes: "Succesfull Login",
      token: token,
      user: false,
      id: user._id,
    });
  } else {
    res.json({
      succes: "Succesfull Login",
      user: true,
      id: user._id,
    });
  }
});

exports.verifyToken = asyncHandler(async (req, res) => {
  const { token, UID } = req.params;

  // Verifying the JWT token
  jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (error, decoded) => {
    if (error) {
      res.json({
        error: "Email verification failed",
      });
    } else {
      const user = await User.findByIdAndUpdate(
        UID,
        { verified: true },
        { new: true }
      );
      res.json(user);
    }
  });
});

function verifyEmail(user) {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const token = jwt.sign(
    {
      data: "Token Data",
    },
    process.env.JWT_SECRET_TOKEN,
    { expiresIn: "10m" }
  );

  const mailConfigurations = {
    // It should be a string of sender/server email
    from: process.env.EMAIL_USERNAME,

    to: `${user.email}`,

    // Subject of Email
    subject: "Verificaión de correo electronico chosu",

    // This would be the text of email body
    html: `<p>Hola, gracias por unirte al sitio de venta de artículos ligeramente usados, chosu.</p>
    <p>Por favor, verifica tu correo haciendo clic en el siguiente botón:</p>
    <a href="https://chosu.netlify.app/users/verify/${token}/${user._id}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; font-size: 16px; cursor: pointer; border-radius: 5px;">Verificar Correo</a>`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      res.json({ error: error.message });
    } else {
      res.json(info);
    }
  });
}

function createToken(user) {
  const payload = {
    user_id: user._id,
    username: user.username,
  };

  return jwt.sign(payload, process.env.JWT_SECRET_TOKEN);
}
