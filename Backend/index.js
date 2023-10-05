const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');
const UserModel = require("./Model/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const UserVerification = require('./Model/UserVerification');
const Razorpay = require("razorpay");
const Transactions = require("./Model/Transactions");
const crypto = require("crypto");
const Course = require('./Model/Course');

require("dotenv").config({ path: "./.env" });

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true });

db();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD
    }
})

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});


transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    }
})

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(decoded);
                resolve(decoded);
            }
        });
    });
};



const sendVerification = async ({ _id, email }, res) => {

    const currentURL = "https://eduvi.up.railway.app/"

    const uniqueString = uuidv4() + _id;
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify Your Email for Eduvi",
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css">
                @media screen {
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
        
                    *{
                        font-family: "Poppins",serif;
                    }
                    body,
                    table,
                    td,
                    a {
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }
        
                    table,
                    /* td {
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                    } */
        
                    img {
                        -ms-interpolation-mode: bicubic;
                    }
        
                    /* RESET STYLES */
                    img {
                        border: 0;
                        height: auto;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                    }
        
                    table {
                        border-collapse: collapse !important;
                    }
        
                    body {
                        height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                    }
        
                    /* iOS BLUE LINKS */
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                    }
        
                    /* MOBILE STYLES */
                    @media screen and (max-width:600px) {
                        h1 {
                            font-size: 32px !important;
                            line-height: 32px !important;
                        }
                    }
        
                    /* ANDROID CENTER FIX */
                    div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                    }}
            </style>
        </head>
        
        <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important; height: 100vh;">
            </head> <!-- HIDDEN PREHEADER TEXT -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%"> <!-- LOGO -->
                <tr>
                    <td bgcolor="#fff" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#fff" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top"
                                    style="padding: 40px 20px 20px 20px; border-radius: 2px 2px 0px 0px; color: #fff; background-color:#0A033C ; font-family: 'Poppins', sans-serif;  font-size: 45px; font-weight: 700; letter-spacing: 2px; line-height: 48px;">
                                    <h1 style="font-size: 40px; font-weight:700; margin: w-50;">Eduvi</h1>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#fff" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center"
                                    style="padding: 20px 30px 40px 30px; color: #000000; font-family: 'Poppins', sans-serif;  font-size: 16px; font-weight:600; line-height: 25px;">
                                    <p>Kindly verify your email to complete your account registration.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 30px;" bgcolor="#0A033C"><a
                                                                href="${currentURL + "user/verify/" + _id + "/" + uniqueString}" target="_blank"
                                                                style="font-size: 20px; font-family: 'Poppins', sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 10px 55px; border-radius: 2px; display: inline-block;">Verify Now
                                                                </a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="center"
                                    style="padding: 0px 30px 20px 30px; color: #000000; font-family:'Montserrat'Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">The link will be valid for the next 6 hours.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="center"
                                    style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #333333; font-family:'Montserrat'Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">
                                    <img src="https://img.icons8.com/ios-glyphs/30/000000/facebook-new.png" /> <img
                                        src="https://img.icons8.com/material-outlined/30/000000/instagram-new.png" /> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4"  align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#f4f4f4"  align="center"
                                    style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;">
                                    <br>
                                    <p style="margin: 10px;"><a href="#" target="_blank" style="color: #111111; font-weight: 700;"
                                            </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>`
    };

    const saltRounds = 10;
    try {
        const hasheduniqueString = await bcrypt.hash(uniqueString, saltRounds);
        const newVerification = new UserVerification({
            userId: _id,
            uniqueString: hasheduniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000,
        });
        await newVerification.save();
        await transporter.sendMail(mailOptions);
        res.send("true");
    } catch (error) {
        console.log(error);
    }
}

app.post("/SignUp", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        UserModel.findOne({ email }).then(result => {
            if (result) {
                if (result.verified === false) {
                    res.send("Check you inbox to verify email");
                } else {
                    res.send("Email is already registered");
                }
            } else {
                bcrypt.hash(password, 10, async function (err, hash) {
                    const newUser = new UserModel({ name, email, password: hash, verified: false, creator: false });

                    err ? console.log(err) : console.log("user logged");
                    await newUser.save().then((result) => {
                        console.log(result);
                        sendVerification(result, res);
                    });
                });
            }
        });

        // const accessToken = jwt.sign({ name: name, email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '4d' });

        // res.send(accessToken);
    }
    catch (err) {
        console.log(err);
    }
})

app.post("/signin", async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log(req.body)
        const credentials = await UserModel.findOne({ email: email });

        if (credentials?.email === email) {
            if (credentials.verified === true) {
                const result = await bcrypt.compare(password, credentials.password);

                if (result === true) {

                    var name = credentials.name;
                    const accessToken = jwt.sign({ name: name, email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '4d' });
                    res.json({ token: accessToken });

                } else {
                    res.send("Password does not match.")
                }
            } else {
                res.send("Check your inbox to verify email")
            }
        } else {
            res.send("Email is not registered.")
        }
    }
    catch (err) {
        console.log(err);
    }
})

app.get("/user/verify/:userId/:uniqueString", (req, res) => {
    let { userId, uniqueString } = req.params;

    UserVerification
        .find({ userId })
        .then((result) => {
            if (result.length > 0) {

                const { expiresAt } = result[0];
                const hasheduniqueString = result[0].uniqueString;

                if (expiresAt < Date.now()) {
                    UserVerification
                        .deleteOne({ userId })
                        .then(result => {
                            UserModel.deleteOne({ _id: userId }).then(() => {
                                res.redirect("http://eduvi-alpha.vercel.app/verified/expired")
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
                else {
                    bcrypt.compare(uniqueString, hasheduniqueString).then(result => {
                        if (result) {
                            //update user data
                            UserModel.updateOne({ _id: userId }, { verified: true }).then(() => {
                                UserVerification.deleteOne({ userId }).then(
                                    //here i can redirect user to particular page
                                    res.redirect("http://eduvi-alpha.vercel.app/verified/success")
                                )
                            })
                        } else {
                            res.redirect("http://eduvi-alpha.vercel.app/verified/error")
                        }
                    }).catch(error => {
                        console.log(error);
                    })
                }
            } else {
                res.redirect("http://eduvi-alpha.vercel.app/verified/error")
            }
        }
        )
        .catch((err) => {
            console.log(err);
        })
})

app.post("/verifyToken", async (req, res) => {
    const { token } = req.body;
    console.log(token);

    try {
        const result = await verifyToken(token).catch(err => {
            console.log(err)
            res.send("false");
        });
        res.send(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get("/getKey", (req, res) => {
    res.send(process.env.RAZORPAY_KEY);
})

app.post("/checkout", async (req, res) => {

    //making some options for razorpay
    const options = {
        amount: Number(req.body.amount * 100),  // converting amount to number and changing to paise
        currency: "INR",
    };

    //creating an order with razorpay method
    const order = await instance.orders.create(options).catch((err) => console.log("checout error", err));

    //sending true status to app and order also
    //to make it access there because request window will be made there
    res.status(200).json({
        success: true,
        order
    })
})

app.post("/paymentverification", async (req, res) => {
    console.log("Hmm here it is");
    //getting payment details
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    //here its making expected signature
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest('hex');

    //if server side expected signature match signatures 
    const isMatched = expectedSignature === razorpay_signature;
    if (isMatched) {

        //fetching payment details from server by payment_id
        await instance.payments.fetch(razorpay_payment_id).then(async (payment) => {

            //destructuring the needed data from payment object
            const { amount, order_id, method, created_at } = payment;

            const { token, id } = req.query

            const { name, email } = await verifyToken(token);

            const course = await Course.findOne({ _id: id });
            const { _id, title, creator, background, content } = course;

            //formatting the date gotten from created_At
            const date = new Date(created_at * 1000); // Multiply by 1000 to convert seconds to milliseconds

            const time = date.toLocaleString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
                timeZone: 'Asia/Kolkata'
            });

            // making order_details object
            const order_details = { _id, title, creator, background, content, amount, order_id, method, time }

            await UserModel.findOneAndUpdate(
                { email: email },
                { $push: { Courses: { $each: [order_details] } } },
                { new: true }
            ).catch(err => {
                console.log(err);
            });

            const newtransaction = new Transactions({ title, creator, name, email, amount, order_id, time });
            await newtransaction.save().catch((err) => console.log(err));

        }).catch((error) => {
            console.log(error);
        });

        //redirecting to success payment page with payment_id
        res.redirect(`http://eduvi-alpha.vercel.app/payment/success/${razorpay_payment_id}`);
    } else {

        //if not matched we will give error
        res.send(`http://eduvi-alpha.vercel.app/payment/error/anerroroccured`)
    }
})

app.post("/userCourses", async (req, res) => {
    const { email } = req.body
    if (email) {
        UserModel.findOne({ email: email })
            .then(result => {
                res.json({
                    courses: result?.Courses
                })
            })
            .catch(err => console.log(err));
    }
})

app.post("/uploadcourse", async (req, res) => {

    const { title, desc, background, price, category, creator, email, certificate, language, content, coursefor, prerequisites, learnthis } = req.body

    // const decode = await verifyToken(token);

    const course = new Course({
        title: title,
        desc: desc,
        background: background,
        createdAt: Date.now(),
        price: price,
        category: category,
        creator,
        email: email,
        certificate: certificate,
        language: language,
        content: content,
        coursefor,
        prerequisites,
        learnthis
    })

    await course.save().then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(404);
    })
})

app.post("/getStats", async (req, res) => {

    const { email } = req.body
    console.log(email)

    const result = [];

    await Transactions.aggregate([

        {
            $group: {
                _id: null, // Group all the documents together
                totalAmount: {
                    $sum: "$amount" // Sum up the amount field from each document
                }
            }
        }
    ]).then(total => {
        result.push((total[0].totalAmount / 100).toString());
    }).catch(error => {
        console.error(error);
    });

    await UserModel.countDocuments().then((count) => {
        result.push(count.toString());
    }).catch(err => {
        console.log(err);
    });

    await Course.countDocuments().then((count) => {
        result.push(count.toString());
    }).catch(err => {
        console.log(err);
    });

    await Transactions.countDocuments().then((count) => {
        result.push(count.toString());
    }).catch(err => {
        console.log(err);
    });

    console.log(result)

    res.json({
        "total earnings": "₹" + result[0],
        "total users": result[1],
        "total courses": result[2],
        "total transactions": result[3]
    });
})

app.get("/getTransactions", async (req, res) => {

    await Transactions.find({}).sort({ time: -1 }).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
    });

})

app.post("/getUserCourse", async (req, res) => {
    const { email, courseId } = req.body;

    await UserModel.findOne(
        { email: email },
        { Courses: { $elemMatch: { _id: courseId } } }
    ).then((result) => {
        res.json(result);
    }).catch(err => console.log(err));
})

app.post("/getCourses", async (req, res) => {
    const { email, skip } = req.body

    try {
        if (email === "") {
            Course.find().skip(skip).limit(9).then(courses => {
                Course.countDocuments().then(total => {
                    // send the courses and the total number
                    console.log(courses);
                    res.json({ courses, total })
                })
            })
        } else {
            await UserModel.findOne({ email: email }).then(result => {
                if (result) {
                    const boughtCourses = result.Courses;
                    Course.find({ _id: { $nin: boughtCourses } }).skip(skip).limit(9).then(courses => {
                        Course.countDocuments({ _id: { $nin: boughtCourses } }).then(total => {
                            // send the courses and the total number
                            console.log(courses);
                            res.json({ courses, total })
                        })
                    })
                }
            });
        }
    } catch {
        console.log("err")
    }


})

app.post("/getCourse", async (req, res) => {

    const { id } = req.body;
    console.log("id is : ", id);
    Course.find({ _id: id }).then(result => {
        console.log("res:", result);
        res.json({
            course: result[0]
        })
    }).catch(err => {
        console.log(err);
    })
})

app.post("/checkAdmin", async (req, res) => {
    const { token } = req.body

    if (!token) {
        res.send("false");
    }

    const verified = await verifyToken(token).catch(err => {
        console.log(err)
        res.send("false");;
    });

    if (verified.email && verified.name) {
        await UserModel.findOne({ email: verified.email }).then(result => {
            if (result.creator === true) {
                res.json({
                    email: verified.email,
                    name: verified.email
                })
            } else {
                res.send("false");
            }
        }).catch(err => {
            console.log(err)
            res.send("false");
        })
    }
})

app.get("/search/:key", async (req, res) => {

    await Course.find({
        "$or": [{ "title": { $regex: req.params.key, $options: 'i' } }, 
        { "desc": { $regex: req.params.key, $options: 'i' } }, 
        { "creator": { $regex: req.params.key, $options: 'i' } },
         { "category": { $regex: req.params.key, $options: 'i' } },]
    }).then(result => {
        res.json(result)
    }).catch(err => { console.log(err) });
})

app.listen(5000, () => {
    console.log("listening at port", 5000);
})
