import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve frontend static assets
const frontendDistPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDistPath));

// Configure Email Transporter
const createMailTransporter = () => {
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

    if (!smtpUser || !smtpPass) {
        console.log("ℹ️ [AVISO]: Correo SMTP no configurado (falta SMTP_USER y SMTP_PASS en variables de entorno). Los correos se simularán en la consola.");
        return null;
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.resend.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);

    if (smtpHost === 'smtp.gmail.com' || process.env.SMTP_SERVICE === 'gmail') {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });
    }

    return nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
    });
};

const transporter = createMailTransporter();

// Helper to send Welcome Email
const sendWelcomeEmail = async ({ firstName, lastName, companyName, email, plan, acceptedTerms = true }) => {
    const dateFormatted = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const emailHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido a 2GetherRewards</title>
        <style>
            body { margin: 0; padding: 0; background-color: #F4F4F4; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2F2F2F; }
            .wrapper { width: 100%; table-layout: fixed; background-color: #F4F4F4; padding: 30px 0; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.06); border: 1px solid #EAEAEA; }
            .header { background: #2F2F2F; padding: 32px 30px; text-align: center; color: #ffffff; border-bottom: 3px solid #69BFA1; }
            .header-logo-table { margin: 0 auto 12px auto; }
            .brand-title { font-size: 22px; font-weight: 900; letter-spacing: 0.5px; color: #ffffff; margin: 0; font-family: 'Outfit', sans-serif; }
            .brand-title-accent { color: #69BFA1; }
            .header p { margin: 6px 0 0 0; color: #A0AEC0; font-size: 13px; font-weight: 500; letter-spacing: 0.2px; }
            .body-content { padding: 36px 32px; }
            .greeting { font-size: 19px; font-weight: 800; color: #2F2F2F; margin-bottom: 14px; font-family: 'Outfit', sans-serif; }
            .text { font-size: 14.5px; line-height: 1.65; color: #4A5568; margin-bottom: 18px; }
            .demo-badge { background-color: #F0FDF4; border: 1px solid #BBF7D0; border-left: 4px solid #69BFA1; border-radius: 12px; padding: 14px 18px; margin: 20px 0; font-size: 13px; color: #166534; line-height: 1.55; }
            .card { background-color: #FAFAFA; border: 1px solid #EEEEEE; border-radius: 14px; padding: 20px; margin: 24px 0; }
            .card-title { font-size: 12px; font-weight: 800; color: #69BFA1; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
            .card-item { font-size: 13.5px; color: #2F2F2F; margin: 6px 0; display: flex; justify-content: space-between; }
            .card-item strong { color: #4A5568; font-weight: 600; }
            .btn-wrapper { text-align: center; margin: 28px 0; }
            .btn { display: inline-block; background-color: #69BFA1; color: #ffffff !important; text-decoration: none; font-weight: 800; font-size: 14px; padding: 14px 32px; border-radius: 12px; box-shadow: 0 4px 14px rgba(105, 191, 161, 0.4); letter-spacing: 0.3px; }
            .divider { height: 1px; background-color: #EDF2F7; margin: 28px 0 20px 0; }
            .fine-print-box { background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 14px 16px; margin-top: 20px; text-align: left; }
            .fine-print-title { font-size: 11px; font-weight: 800; color: #718096; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px; }
            .fine-print-text { font-size: 10.5px; color: #718096; line-height: 1.5; margin: 0; }
            .footer { padding: 22px 30px; text-align: center; font-size: 11.5px; color: #A0AEC0; background-color: #FAFAFA; border-top: 1px solid #EEEEEE; line-height: 1.6; }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="container">
                <!-- Header con Logo Oficial y Colores de Marca -->
                <div class="header">
                    <table class="header-logo-table" role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="vertical-align: middle; padding-right: 10px;">
                                <img src="https://www.2getherrewards.com/logo-handshake-white.png" alt="2GetherRewards" width="34" height="34" style="display: block; border: 0;" />
                            </td>
                            <td style="vertical-align: middle;">
                                <h1 class="brand-title">2GETHER<span class="brand-title-accent">REWARDS</span></h1>
                            </td>
                        </tr>
                    </table>
                    <p>Fidelización Digital para Apple Wallet & Google Wallet</p>
                </div>

                <!-- Body Content -->
                <div class="body-content">
                    <div class="greeting">¡Hola ${firstName} ${lastName ? lastName : ''}! 👋</div>
                    <p class="text">
                        Te damos la bienvenida a <strong>2GetherRewards</strong>. Tu cuenta de acceso para <strong>${companyName || 'tu negocio'}</strong> ha sido creada correctamente.
                    </p>

                    <!-- Aclaración de la Prueba de Exploración de 14 Días -->
                    <div class="demo-badge">
                        <strong>Acceso de Exploración y Demostración (14 días):</strong><br>
                        Esta prueba gratuita te permite ingresar al panel para <strong>conocer la plataforma por dentro</strong>, explorar cómo diseñar tarjetas para Apple & Google Wallet, probar el escáner y revisar los módulos de fidelización. 
                        <div style="margin-top: 6px; font-size: 12px; color: #15803d;">
                            <em>Nota: La emisión real y operativa de tarjetas activas para tus clientes finales se activará en cuanto decidas contratar y suscribirte formalmente a tu plan.</em>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-title">Detalles de tu registro</div>
                        <div class="card-item"><strong>Empresa / Comercio:</strong> <span>${companyName || 'No especificada'}</span></div>
                        <div class="card-item"><strong>Plan de interés:</strong> <span>${plan || 'Plan START - $49/mes'}</span></div>
                        <div class="card-item"><strong>Correo registrado:</strong> <span>${email}</span></div>
                        <div class="card-item"><strong>Modalidad:</strong> <span>Demostración guiada (14 días)</span></div>
                    </div>

                    <div class="btn-wrapper">
                        <a href="https://www.2getherrewards.com" class="btn">Explorar mi Panel de Control</a>
                    </div>

                    <div class="divider"></div>

                    <!-- Apartado con letras pequeñas: Aceptación de Términos y Condiciones -->
                    <div class="fine-print-box">
                        <div class="fine-print-title">Información Legal & Términos Aceptados</div>
                        <p class="fine-print-text">
                            Al registrarte en 2GetherRewards, has confirmado y aceptado expresamente nuestros <strong>Términos y Condiciones del Servicio para Comercios Afiliados</strong> y nuestra <strong>Política de Privacidad y Tratamiento de Datos</strong>.
                        </p>
                        <p class="fine-print-text" style="margin-top: 6px;">
                            • <strong>Fecha de consentimiento:</strong> ${dateFormatted}<br>
                            • <strong>Identificador de cuenta:</strong> ${email}<br>
                            • <strong>Aceptación electrónica:</strong> ${acceptedTerms ? 'Registrada y confirmada en formulario de alta' : 'Confirmada'}.
                        </p>
                        <p class="fine-print-text" style="margin-top: 6px;">
                            Este correo sirve como confirmación de tu registro de prueba. Para consultas o soporte comercial, puedes escribirnos directamente a <a href="mailto:soporte@2getherrewards.com" style="color: #69BFA1; font-weight: bold; text-decoration: underline;">soporte@2getherrewards.com</a>.
                        </p>
                    </div>
                </div>

                <!-- Footer -->
                <div class="footer">
                    © ${new Date().getFullYear()} 2GetherRewards Inc. Todos los derechos reservados.<br>
                    Plataforma inteligente de fidelización de clientes.
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    const fromAddress = process.env.SMTP_FROM || `"2GetherRewards" <${process.env.SMTP_USER || 'onboarding@2getherrewards.com'}>`;
    const emailSubject = `¡Bienvenido a 2GetherRewards! Confirmación de registro para ${companyName || firstName}`;
    const resendKey = (process.env.RESEND_API_KEY || process.env.SMTP_PASS || '').trim();

    // 1. Try Resend Direct REST API if key starts with re_
    if (resendKey && resendKey.startsWith('re_')) {
        try {
            const formattedFrom = fromAddress.includes('<') ? fromAddress : `2GetherRewards <${fromAddress}>`;
            const apiRes = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${resendKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: formattedFrom,
                    to: [email],
                    subject: emailSubject,
                    html: emailHtml,
                }),
            });

            const apiData = await apiRes.json();
            if (apiRes.ok) {
                console.log(`✅ Correo de bienvenida enviado a ${email} vía Resend API. ID: ${apiData.id}`);
                return { sent: true, provider: 'resend-api', id: apiData.id };
            } else {
                console.error(`⚠️ Error devuelto por Resend API al enviar a ${email}:`, apiData);
            }
        } catch (apiErr) {
            console.error(`⚠️ Error de conexión con Resend API:`, apiErr.message);
        }
    }

    // 2. Try SMTP Transporter
    const currentTransporter = transporter || createMailTransporter();
    if (currentTransporter) {
        try {
            const info = await currentTransporter.sendMail({
                from: fromAddress,
                to: email,
                subject: emailSubject,
                html: emailHtml,
            });
            console.log(`✅ Correo de bienvenida enviado a ${email} vía SMTP. MessageId: ${info.messageId}`);
            return { sent: true, provider: 'smtp', messageId: info.messageId };
        } catch (error) {
            console.error(`⚠️ Error al enviar correo vía SMTP a ${email}:`, error.message);
            return { sent: false, error: error.message };
        }
    }

    // 3. Fallback simulation
    console.log(`📧 [SIMULACIÓN DE CORREO] Para: ${email} | Asunto: ${emailSubject}`);
    console.log(`📝 [LETRAS PEQUEÑAS]: Usuario ${firstName} ${lastName} (${email}) aceptó Términos y Condiciones en fecha: ${dateFormatted}`);
    return { sent: false, simulated: true };
};

// Initialize MySQL connection pool if MYSQL_URL (or PGDATABASE style fallback) is available
let pool = null;
const dbUrl = process.env.MYSQL_URL || process.env.MYSQL_PUBLIC_URL || process.env.DATABASE_URL;

if (dbUrl) {
    console.log("Database connection variable detected. Connecting to MySQL database...");
    try {
        pool = mysql.createPool(dbUrl);

        // Create leads table if not exists (MySQL syntax)
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS leads (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(100),
                last_name VARCHAR(100),
                company_name VARCHAR(150),
                email VARCHAR(150) UNIQUE,
                phone VARCHAR(50),
                plan VARCHAR(100),
                password VARCHAR(255),
                accepted_terms BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        pool.query(createTableQuery)
            .then(() => {
                console.log("Database table 'leads' is ready in MySQL.");
                // Safe migration: add password column if migrating existing table on Railway
                return pool.query("ALTER TABLE leads ADD COLUMN password VARCHAR(255) AFTER plan;");
            })
            .then(() => console.log("MySQL column 'password' verified/added."))
            .catch(err => {
                if (err.errno === 1060 || err.code === 'ER_DUP_FIELDNAME') {
                    // Ignore duplicate fieldname error
                } else {
                    console.error("Error verifying password column:", err);
                }
            })
            .then(() => {
                // Safe migration: add accepted_terms column if migrating existing table
                return pool.query("ALTER TABLE leads ADD COLUMN accepted_terms BOOLEAN DEFAULT TRUE AFTER password;");
            })
            .then(() => console.log("MySQL column 'accepted_terms' verified/added."))
            .catch(err => {
                if (err.errno === 1060 || err.code === 'ER_DUP_FIELDNAME') {
                    // Ignore duplicate fieldname error
                } else {
                    console.error("Error verifying accepted_terms column:", err);
                }
            });
    } catch (err) {
        console.error("Error creating MySQL pool:", err);
    }
} else {
    console.log("No database environment variable detected. Running with in-memory fallback database.");
}

// In-memory fallback database list
const memoryLeads = [];

// API Status endpoint
app.get('/api/status', (req, res) => {
    const resendKey = (process.env.RESEND_API_KEY || process.env.SMTP_PASS || '').trim();
    const isConfigured = Boolean(resendKey || transporter);
    res.json({
        status: 'online',
        message: '2GetherRewards Backend API connected',
        databaseConnected: pool !== null,
        databaseType: 'mysql',
        emailConfigured: isConfigured,
        emailProvider: (resendKey && resendKey.startsWith('re_')) ? 'resend-api' : (transporter ? 'smtp' : 'none')
    });
});

// Endpoint to store registration lead data
app.post('/api/register', async (req, res) => {
    const { firstName, lastName, companyName, email, phone, plan, password, acceptedTerms } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'El correo electrónico es requerido.' });
    }

    if (acceptedTerms === false) {
        return res.status(400).json({ error: 'Debe aceptar los términos y condiciones para registrarse.' });
    }
    
    try {
        let savedLead = null;

        if (pool) {
            const insertQuery = `
                INSERT INTO leads (first_name, last_name, company_name, email, phone, plan, password, accepted_terms)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    first_name = VALUES(first_name),
                    last_name = VALUES(last_name),
                    company_name = VALUES(company_name),
                    phone = VALUES(phone),
                    plan = VALUES(plan),
                    password = VALUES(password),
                    accepted_terms = VALUES(accepted_terms),
                    created_at = CURRENT_TIMESTAMP;
            `;
            await pool.query(insertQuery, [firstName, lastName, companyName, email, phone, plan, password, acceptedTerms !== false]);
            
            // Retrieve the record to confirm details
            const [rows] = await pool.query("SELECT * FROM leads WHERE email = ? LIMIT 1;", [email]);
            savedLead = rows[0];
        } else {
            // Fallback to memory
            const existingIndex = memoryLeads.findIndex(l => l.email === email);
            const lead = { 
                firstName, 
                lastName, 
                companyName, 
                email, 
                phone, 
                plan, 
                password, 
                acceptedTerms: acceptedTerms !== false,
                createdAt: new Date() 
            };
            if (existingIndex > -1) {
                memoryLeads[existingIndex] = lead;
            } else {
                memoryLeads.push(lead);
            }
            console.log("In-memory database updated lead:", email);
            savedLead = lead;
        }

        // Send Welcome Email asynchronously with Terms confirmation fine print
        sendWelcomeEmail({
            firstName: firstName || 'Cliente',
            lastName: lastName || '',
            companyName: companyName || '',
            email,
            plan: plan || 'Plan START',
            acceptedTerms: acceptedTerms !== false
        }).catch(mailErr => {
            console.error("Error no bloqueante en envío de correo:", mailErr);
        });

        return res.status(201).json({ 
            success: true, 
            message: 'Registro completado y correo de bienvenida enviado con confirmación de Términos.',
            lead: savedLead 
        });
    } catch (err) {
        console.error("Error processing registration:", err);
        return res.status(500).json({ error: 'Error interno en la base de datos.' });
    }
});

// Endpoint to retrieve registration lead list
app.get('/api/leads', async (req, res) => {
    try {
        if (pool) {
            const [rows] = await pool.query("SELECT * FROM leads ORDER BY created_at DESC;");
            return res.json(rows);
        } else {
            return res.json(memoryLeads);
        }
    } catch (err) {
        console.error("Error fetching leads:", err);
        return res.status(500).json({ error: 'Error al recuperar registros de la base de datos.' });
    }
});

// Fallback all other routes to frontend SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});

