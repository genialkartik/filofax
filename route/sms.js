const express = require("express");
const router = express();
// const { Twilio } = require("twilio");
const client = require("twilio")(
  "AC928098c587fb3bf2e546f06b09002219",
  "57bd83f0c0afdfe51f07351f45670447"
);

router.post("/code", async (req, res) => {
  console.log(req.body);

  // const client = context.getTwilioClient();
  // const service = context.VERIFY_SERVICE_SID;
  const service = "VA8f40281811c9267071b295ad1c591099";

  client.verify
    .services(service)
    .verifications.create({
      to: req.body.to,
      channel: req.body.channel,
      locale: req.body.locale,
    })
    .then((verification) => {
      console.log(`Sent verification: '${verification.sid}'`);
      res.json({
        success: false,
        respMessage: verification,
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        success: false,
        respMessage: error.toString(),
      });
    });
});

router.post("/verify", async (req, res) => {
  console.log(req.body);

  // const client = context.getTwilioClient();
  // const service = context.VERIFY_SERVICE_SID;
  const service = "VA8f40281811c9267071b295ad1c591099";

  client.verify
    .services(service)
    .verificationChecks.create({
      to: req.body.to,
      code: req.body.code,
    })
    .then((check) => {
      console.log(check);
      if (check.status === "approved") {
        res.json({
          success: true,
          respMessage: check,
        });
      } else {
        res.json({
          success: false,
          respMessage: "Incorrect token.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({
        success: false,
        respMessage: error,
      });
    });
});

module.exports = router;
