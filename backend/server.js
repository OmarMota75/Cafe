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
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

    if (!smtpUser || !smtpPass) {
        console.log("ℹ️ Correo SMTP no configurado completamente (SMTP_USER/SMTP_PASS). Los correos se registrarán en la consola.");
        return null;
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
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido a 2GetherRewards</title>
        <style>
            body { margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2d3748; }
            .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
            .header { background: linear-gradient(135deg, #FF6F00 0%, #E65100 100%); padding: 36px 30px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0 0 8px 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
            .header p { margin: 0; opacity: 0.92; font-size: 15px; }
            .body-content { padding: 32px 30px; }
            .greeting { font-size: 18px; font-weight: 700; color: #1a202c; margin-bottom: 16px; }
            .text { font-size: 15px; line-height: 1.6; color: #4a5568; margin-bottom: 20px; }
            .card { background-color: #f8fafc; border-left: 4px solid #FF6F00; border-radius: 8px; padding: 18px 20px; margin: 24px 0; }
            .card-title { font-size: 14px; font-weight: 700; color: #2d3748; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
            .card-item { font-size: 14px; color: #4a5568; margin: 4px 0; }
            .btn { display: inline-block; background-color: #FF6F00; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 10px; margin: 20px 0; }
            .divider { height: 1px; background-color: #e2e8f0; margin: 30px 0 20px 0; }
            .fine-print-box { background-color: #f7fafc; border: 1px solid #edf2f7; border-radius: 8px; padding: 14px 16px; margin-top: 20px; }
            .fine-print-title { font-size: 11px; font-weight: 700; color: #718096; text-transform: uppercase; margin-bottom: 6px; }
            .fine-print-text { font-size: 10.5px; color: #718096; line-height: 1.5; margin: 0; }
            .footer { padding: 20px 30px; text-align: center; font-size: 12px; color: #a0aec0; background-color: #f8fafc; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>2GetherRewards</h1>
                <p>Plataforma de Fidelización & Marketing Inteligente</p>
            </div>
            <div class="body-content">
                <div class="greeting">¡Hola ${firstName} ${lastName}! 👋</div>
                <p class="text">
                    Te damos la más cordial bienvenida a <strong>2GetherRewards</strong>. Tu cuenta para <strong>${companyName || 'tu negocio'}</strong> ha sido registrada con éxito y ya puedes disfrutar de tu <strong>prueba gratuita de 14 días</strong> sin compromiso.
                </p>
                
                <div class="card">
                    <div class="card-title">Resumen de tu cuenta</div>
                    <div class="card-item"><strong>Empresa / Negocio:</strong> ${companyName || 'No especificada'}</div>
                    <div class="card-item"><strong>Plan seleccionado:</strong> ${plan || 'Plan START'}</div>
                    <div class="card-item"><strong>Correo registrado:</strong> ${email}</div>
                    <div class="card-item"><strong>Estado:</strong> Prueba activa de 14 días</div>
                </div>

                <p class="text">
                    Comienza a digitalizar tus programas de sellos, tarjetas de regalo, cupones y membresías de Wallet hoy mismo.
                </p>

                <div style="text-align: center;">
                    <a href="https://2getherrewards.com" class="btn">Ir a mi Panel de Control</a>
                </div>

                <div class="divider"></div>

                <!-- Apartado con letras pequeñas: Aceptación de Términos y Condiciones -->
                <div class="fine-print-box">
                    <div class="fine-print-title">Información Legal & Términos Aceptados</div>
                    <p class="fine-print-text">
                        Al completar tu registro en 2GetherRewards, has confirmado y aceptado expresamente nuestros <strong>Términos y Condiciones de Servicio</strong>, las <strong>Políticas de Uso Aceptable</strong> y la <strong>Política de Privacidad y Protección de Datos</strong>.
                    </p>
                    <p class="fine-print-text" style="margin-top: 6px;">
                        • <strong>Consentimiento registrado:</strong> ${dateFormatted}<br>
                        • <strong>Identificador de cuenta:</strong> ${email}<br>
                        • <strong>Aceptación expresa:</strong> ${acceptedTerms ? 'Sí, aceptado de forma electrónica en el formulario de alta' : 'Sí'}.
                    </p>
                    <p class="fine-print-text" style="margin-top: 6px;">
                        Este correo electrónico sirve como acuse de recibo y comprobante de tu consentimiento. Si no has realizado este registro o deseas ejercer tus derechos de acceso, rectificación, supresión o limitación de datos (RGPD/LOPD), puedes comunicarte con nuestro equipo legal y de soporte en <a href="mailto:soporte@2getherrewards.com" style="color: #718096; text-decoration: underline;">soporte@2getherrewards.com</a>.
                    </p>
                </div>
            </div>
            <div class="footer">
                © ${new Date().getFullYear()} 2GetherRewards Inc. Todos los derechos reservados.<br>
                Este es un mensaje automático generado por la plataforma.
            </div>
        </div>
    </body>
    </html>
    `;

    const mailOptions = {
        from: process.env.SMTP_FROM || `"2GetherRewards" <${process.env.SMTP_USER || 'no-reply@2getherrewards.com'}>`,
        to: email,
        subject: `¡Bienvenido a 2GetherRewards! Confirmación de registro para ${companyName || firstName}`,
        html: emailHtml,
    };

    if (transporter) {
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log(`✅ Correo de bienvenida enviado a ${email}. MessageId: ${info.messageId}`);
            return { sent: true, messageId: info.messageId };
        } catch (error) {
            console.error(`⚠️ Error al enviar correo de bienvenida a ${email}:`, error.message);
            return { sent: false, error: error.message };
        }
    } else {
        console.log(`📧 [SIMULACIÓN DE CORREO] Para: ${email} | Asunto: ${mailOptions.subject}`);
        console.log(`📝 [LETRAS PEQUEÑAS]: Usuario ${firstName} ${lastName} (${email}) aceptó Términos y Condiciones en fecha: ${dateFormatted}`);
        return { sent: false, simulated: true };
    }
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
    res.json({
        status: 'online',
        message: '2GetherRewards Backend API connected',
        databaseConnected: pool !== null,
        databaseType: 'mysql',
        smtpConfigured: transporter !== null
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

