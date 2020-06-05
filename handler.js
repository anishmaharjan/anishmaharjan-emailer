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
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.sendMail = async event => {
  // https://github.com/sendgrid/sendgrid-nodejs

  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'gara.knoe@gmail.com',
    from: 'anish@anishmaharjan.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg).then(r => ({
    statusCode: 200,
    body: JSON.stringify(
        {
          message: 'Send mail',
          response: r,
          input: event,
        },
        null,
        2
    ),
  }));

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
