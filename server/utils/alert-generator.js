const resolvers = require('../schemas/resolvers');
const sendNotification = require('./email-notification')

const alertGenerator = async () => {
  let alerts = await resolvers.Query.getActiveAlerts(Date.now());

  for (let i = 0; i < alerts.length; i++) {
    const buyerName = `${alerts[i].buyer.firstName} ${alerts[i].buyer.lastName}`;
    const sellerName = `${alerts[i].seller.firstName} ${alerts[i].seller.lastName}`;
    const subject = `EMERGENCY:  may need help!`;
    const emailBody = `
      Hello ${alerts[i].name},

      ${buyerName} has listed you as an emergency contact. They met a seller they found at GarageSale and have not checked in that they are safe.

      Please reach out to ${buyerName} to make sure they are ok.

      Seller details:
      ${sellerName}
      ${alerts[i].seller.email}
      ${alerts[i].address}

      -- GarageSale safety team
    `;

    // Send the notification
    sendNotification(alerts[i].phonenumber,
      alerts[i].email,
      subject,
      emailBody,
      alerts[i].buyer.email,
      ''
    );

    // Cancel the alert
    const meetingId = { _id: alerts[i]._id };
    resolvers.Mutation.cancelAlert('', meetingId, '');
  }

}

module.exports = alertGenerator;