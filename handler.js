'use strict';

/*
*
  GET - https://0cli622ocj.execute-api.ap-southeast-2.amazonaws.com/dev/
  POST - https://0cli622ocj.execute-api.ap-southeast-2.amazonaws.com/dev/sendmail

*
* */

module.exports.home = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
        {
          message: 'Go Serverless v1.0! Your function executed successfully!',
          input: event,
        },
        null,
        2,
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.sendMail = async event => {
  const nodemailer = require('nodemailer');

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const body = JSON.parse(event.body);
  const {to, subject, content} = body;

  let info = await transporter.sendMail({
    from: 'Little India Groceries <limarket99@gmail.com>',
    to: to,
    subject: subject,
    text: content.text,
    // html: '<b>Hello world?</b>'
  }, (er, d) => {
    return (er) ? {
      statusCode: 500,
    }: {
      statusCode: 200,
    }
  });

  return {};

};
