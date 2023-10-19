const axios = require('axios')
module.exports={
Add: async (req,res)=>{
     const url ="http://developers.flouci.com/api/generate_payment"
    const payload={
    "app_token": "49247b78-fb73-4c2c-b44d-8884065cded1", 
    "app_secret": env("FLOUCI_SECRET"),
    "amount": req.body.amount,
    "accept_card": "true",
    "session_timeout_secs": 1200,
    "success_link": "http://localhost:5000/success",
    "fail_link": "http://localhost:5000/fail",
    "developer_tracking_id": "18705216-b00a-4cd8-b377-be118583dd5b"
    }
await axios.post(url,payload).then((result) => response.send(result.data)).catch((error) =>console.error(err) )

},
 verifyPayment: async (req, res) => {
    const payment_ID = req.params.id;
    const verificationURL = `https://developers.flouci.com/api/verify_payment/${payment_ID}`;
    try {
      const verfResult = await axios.get(verificationURL, {
        headers: {
          "Content-Type": "application/json",
          apppublic: "49247b78-fb73-4c2c-b44d-8884065cded1",
          appsecret: process.env.FLOUCI_SECRET,
        },
      });
      res.send(verfResult.data);
    } catch (error) {
      throw error;
    }
  }

}

