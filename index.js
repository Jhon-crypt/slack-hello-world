require('dotenv').config();

const { App } = require('@slack/bolt');
const express = require('express');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  customRoutes: [
    {
      path: '/slack/events',
      method: ['POST'],
      handler: (req, res) => {
        // Handle URL verification challenge
        if (req.body.type === 'url_verification') {
          return res.send({ challenge: req.body.challenge });
        }
      },
    },
  ],
});

// Handle app_home_opened event
app.event('app_home_opened', async ({ event, say }) => {  
    await say(`Hello world, <@${event.user}>!`);
});

// Start the app
(async () => {
  // Start the app with the port provided by the environment or default to 3000
  const port = process.env.PORT || 4040;
  await app.start(port);
  console.log('⚡️ Bolt app is running!');
  console.log(`Listening for events at /slack/events on port ${port}`);
})();

