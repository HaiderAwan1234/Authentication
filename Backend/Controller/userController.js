import { User } from "./../models/userModel.js";
import bcrypt from "bcrypt";
import nodemailer, { createTransport } from "nodemailer";

// ......FUNCTIONS//////////

const otpGenerator = () => {
  let random = Math.random() * 900000;
  let floor = Math.floor(random + 100000);

  return floor;
};

const sendMail = (f_name, m_mail, newUser) => {
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: "haiderharoon1234512345@gmail.com",
      pass: "nttrngaexldqrxxt",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = {
    from: "haiderharoon1234512345@gmail.com",
    to: m_mail,
    subject: "OTP Verification",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facebook Verification Code</title>
    <style>
        body {
            font-family: Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #1c1e21;
            background-color: #f0f2f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            padding: 24px;
            text-align: center;
            border-bottom: 1px solid #dddfe2;
        }
        .logo-circle {
            display: inline-block;
            width: 40px;
            height: 40px;
            background-color: #1877f2;
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            color: white;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 16px;
        }
        .content {
            padding: 24px;
        }
        .title {
            color: #1c1e21;
            font-size: 20px;
            margin-top: 7px;
            margin-bottom: 6px;
            text-align: center;
        }
        .otp-box {
            background-color: #f0f2f5;
            border-radius: 6px;
            padding: 16px;
            text-align: center;
            margin: 24px 0;
        }
        .otp-code {
            font-size: 32px;
            letter-spacing: 5px;
            color: #1877f2;
            font-weight: bold;
            margin: 10px 0;
        }
        .footer {
            padding: 16px;
            text-align: center;
            font-size: 12px;
            color: #65676b;
            border-top: 1px solid #dddfe2;
            background-color: #f0f2f5;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #1877f2;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 16px 0;
        }
        .small-text {
            font-size: 12px;
            color: #65676b;
        }
        .divider {
            border-top: 1px solid #dddfe2;
            margin: 24px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class=""><img width="48%" src="https://img.freepik.com/premium-vector/art-illustration_929495-41.jpg" /></div>
            <div class="title">Confirm your email address</div>
        </div>
        
        <div class="content">
            <p>Hi ${f_name},</p>
            
            <p>You're creating a new Facebook account with this email address. To confirm this is you, enter the following verification code in your browser:</p>
            
            <div class="otp-box">
                <div class="otp-code">${newUser.otp}</div>
                <div class="small-text">This code expires in 10 minutes</div>
            </div>
            
            <div class="divider"></div>
            
            <p class="small-text">This message was sent to ${m_mail}. If you didn't request this code, you can ignore this email or <a href="#" style="color: #1877f2; text-decoration: none;">let us know</a>.</p>
            
            <p class="small-text">For your security, please don't forward this email to anyone.</p>
        </div>
        
        <div class="footer">
            <p>Meta Platforms, Inc., 1601 Willow Road, Menlo Park, CA 94025</p>
            <p>
                <a href="https://www.facebook.com/policies" style="color: #65676b; text-decoration: none;">Privacy Policy</a> | 
                <a href="https://www.facebook.com/help" style="color: #65676b; text-decoration: none;">Help Center</a>
            </p>
            <p class="small-text">© ${new Date().getFullYear()} Meta</p>
        </div>
    </div>
</body>
</html>`,
  };

  const sendMail = transport.sendMail(options, (error, info) => {
    if (error) {
      res.status(400);
      throw new Error(error.message);
    } else {
      console.log("mail sent");
    }
  });
};

export const signup = async (req, res) => {
  const { f_name, l_name, m_mail, password, date, month, year, gender } =
    req.body;

  if (
    !f_name ||
    !l_name ||
    !m_mail ||
    !password ||
    !date ||
    !month ||
    !year ||
    !gender
  ) {
    res.status(400);

    throw new Error("Please enter all inputs !!!");
  }

  const checkMail = await User.findOne({ m_mail });

  if (checkMail) {
    res.status(401);

    throw new Error("Email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    f_name,
    l_name,
    m_mail,
    password: hashPassword,
    date,
    month,
    year,
    gender,
    otp: otpGenerator(),
  });

  sendMail(f_name, m_mail, newUser);

  res.send(newUser);
};

export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const { user_id } = req.params;

  if (!otp) {
    res.status(400);
    throw new Error("Please enter OTP !!");
  }

  const checkUser = await User.findById(user_id);

  if (!checkUser) {
    res.status(404);
    throw new Error("User not found !!");
  }

  if (checkUser.otp == otp) {
    checkUser.otp = null;
    await checkUser.save();
    res.send(checkUser);
  } else {
    res.status(401);
    throw new Error("Invalid Otp code !!!");
  }
};

export const login = async (req, res) => {
  const { m_mail, password } = req.body;

  if (!m_mail) {
    res.status(400);
    throw new Error("Please enter email adress !!");
  }

  if (!password) {
    res.status(400);
    throw new Error("Please enter password");
  }

  const checkMail = await User.findOne({ m_mail });

  if (!checkMail) {
    res.status(401);
    throw new Error("Invalid Email !!");
  }

  const dcrypt = await bcrypt.compare(password, checkMail.password);

  if (!dcrypt) {
    res.status(401);
    throw new Error("Invalid Password");
  }

  res.send(checkMail);
};
