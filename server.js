import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/recover', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'El correo electrónico es requerido.' });
  }

  try {
    // Configurar Ethereal (cuenta de prueba gratuita)
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // Configurar y enviar correo
    let info = await transporter.sendMail({
      from: '"JumpUp Idiomas 🎓" <no-reply@jumpupidiomas.com>', // sender address
      to: email, // list of receivers
      subject: "Recuperación de Contraseña - JumpUp Idiomas", // Subject line
      text: "Para recuperar tu contraseña, haz clic en el siguiente enlace o ingresa el código 123456.", // plain text body
      html: `
        <div style="font-family: sans-serif; text-align: center; padding: 20px;">
          <h2>Recuperación de Contraseña</h2>
          <p>Has solicitado restablecer tu contraseña para la cuenta <b>${email}</b>.</p>
          <p>Utiliza el siguiente código para continuar con la recuperación:</p>
          <h1 style="background: #2563eb; color: white; display: inline-block; padding: 10px 20px; border-radius: 8px;">123456</h1>
          <p>Si no fuiste tú, puedes ignorar este mensaje.</p>
        </div>
      `, // html body
    });

    console.log("=========================================");
    console.log("¡CORREO DE RECUPERACIÓN ENVIADO!");
    console.log("Para: %s", email);
    console.log("Message sent: %s", info.messageId);
    
    // Obtener la URL de prueba donde se puede ver el correo en el navegador
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log("MIRA EL CORREO EN ESTE ENLACE: %s", previewUrl);
    console.log("=========================================");

    res.status(200).json({ 
      success: true, 
      message: 'Correo enviado.',
      previewUrl: previewUrl // Esto lo mandamos para que el usuario pueda ver el enlace en los logs o alert
    });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ error: 'Error interno del servidor al enviar el correo.' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor de prueba iniciado en http://localhost:${PORT}`);
  console.log(`Listo para enviar correos simulados de recuperación a través de Ethereal.`);
});
