const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

// Inicializar Firebase Admin
admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "apridigitals@gmail.com",  // Tu correo de Gmail
    pass: "ejch guga idkz kbfo", // Contraseña generada de la app
  },
});

exports.sendContactEmail = onRequest(async (req, res) => {
  cors(req, res, async ()=> {
    const { name, email, message } = req.body.data;

    const mailOptions = {
      from: "apridigitals@gmail.com",
      replyTo: email, 
      to: "apridigitals@gmail.com",
      subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`
    };

    try {      
      await transporter.sendMail(mailOptions);
      return res.status(200).send({ data: { success: true } });
    } catch (error) {
      console.error("Error al enviar el correo: ", error);
      return res.status(500).send({ data: { success: false, error: error.toString() } });
    }
  })
});