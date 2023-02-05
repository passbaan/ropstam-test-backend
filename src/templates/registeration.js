// here we have email templates which will be used in services->emailProvider
module.exports = (firstName, lastName, pwd) => `<!DOCTYPE html>
    <html>
      <head>
        <title>Page Title</title>
      </head>
      <body>
        <h1>Hello ${firstName} ${lastName}</h1>
        <p>Thank you for registering with us. Your password is ${pwd}</p>
      </body>
    </html>`;
