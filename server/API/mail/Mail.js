import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import sendSMS from "../sms/SMS.js";
import config from "../../config.js";

let transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./API/mail/templates/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./API/mail/templates/"),
};

transporter.use("compile", hbs(handlebarOptions));

function registerOTP(user, OTP) {
  var mailOptions = {
    from: "CastMyVote <r.k2962002@gmail.com>",
    to: user.email,
    subject: "OTP to verify your Account on CastMyVote",
    template: "registerOTP",
    context: {
      name: user.name,
      email: user.email,
      otp: OTP,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function welcomeMail(name, email) {
  var mailOptions = {
    from: "CastMyVote <r.k2962002@gmail.com>",
    to: email,
    subject: "Welcome to CastMyVote",
    template: "welcome",
    context: {
      name: name,
      email: email,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function loginOTP(user, OTP) {
  var mailOptions = {
    from: "CastMyVote <r.k2962002@gmail.com>",
    to: user.email,
    subject: "OTP to Login into your Account on CastMyVote",
    template: "loginOTP",
    context: {
      email: user.email,
      otp: OTP,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function resetOTP(user, OTP) {
  var mailOptions = {
    from: "CastMyVote <r.k2962002@gmail.com>",
    to: user.email,
    subject: "OTP to Reset Password on CastMyVote",
    template: "resetOTP",
    context: {
      email: user.email,
      otp: OTP,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function sendSubscriptionMail(mail) {
  var mailOptions = {
    from: "CastMyVote <r.k2962002@gmail.com>",
    to: mail,
    subject: "Thanks for Subscribing Us | CastMyVote",
    template: "subscribe",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function thanksmail(user, OTP) {
  var mailOptions = {
    from: "CastMyVote <r.k2962002@gmail.com>",
    to: user.email,
    subject: "Thanks for your Vote on CastMyVote",
    template: "thanks",
    context: {
      name: user.name,
      election: user.election,
      email: user.email,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function sendQueryMail(user) {
  var mailOptions = {
    from: "CastMyVote <r.k2962002@gmail.com>",
    to: user.email,
    subject: "Thanks for Contacting Us | CastMyVote",
    template: "query",
    context: {
      name: user.name,
      email: user.email,
      timestamp: user.timestamp,
      id: user.id,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function sendApplication(data) {
  var mailOptions = {
    from: "CastMyVote <r.k2962002@gmail.com>",
    to: data.email,
    subject: `Application No. ${data.application_no} has been submitted Successfully | CastMyVote`,
    template: "application",
    context: {
      name: data.name,
      email: data.email,
      application_no: data.application_no,
      application_date: data.timestamp,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function sendVoterID(data) {
  var mailOptions = {
    from: "CastMyVote <r.k2962002@gmail.com>",
    to: data.email,
    subject:
      "Application No." +
      data.application_no +
      " has been approved Successfully | CastMyVote",
    template: "voterid",
    context: {
      name: data.name,
      email: data.email,
      application_no: data.application_no,
      id_no: data.id_no,
      id_date: data.id_date,
    },
    attachments: [
      {
        filename: data.id_no + ".pdf",
        path: data.id_doc,
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function sendCandidateMail(election, candidate) {
  var mailOptions = {
    from: "CastMyVote <r.k2962002@gmail.com>",
    to: candidate.candidate_email,
    subject: `Regarding Appointment of Contestant for ${election.name}  | CastMyVote`,
    template: "candidate",
    context: {
      email: candidate.candidate_email,
      candidateName: candidate.candidate_name,
      electionName: election.name,
      electionCode: election.code,
      electionId: election.election_id,
      candidateId: candidate.candidate_id,
      start: election.start_date,
      end: election.end_date,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export {
  registerOTP,
  welcomeMail,
  loginOTP,
  resetOTP,
  sendVoterID,
  sendApplication,
  sendQueryMail,
  sendCandidateMail,
  sendSubscriptionMail,
  thanksmail,
};
