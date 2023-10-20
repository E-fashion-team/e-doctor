const axios = require('axios')
module.exports={
Add: async (req,res)=>{
    const url ="http://developers.flouci.com/api/generate_payment"
    const payload={
    "app_token": "8db3f7ed-28c7-40a2-b0e8-653d8e000ea8", 
    "app_secret": "a5b6d830-928c-4efb-8d94-40c2d8390dc4",
    "amount": req.params.amount,
    "accept_card": "true",
    "session_timeout_secs": 1200,
    "success_link": "http://localhost:3000/payment/success",
    "fail_link": "http://localhost:3000/payment/fail",
    "developer_tracking_id": "18705216-b00a-4cd8-b377-be118583dd5b"
    }
await axios.post(url,payload)
.then((result) => res.send(result.data))
.catch((error) =>console.log(error))

},
 verifyPayment: async (req, res) => {
    const payment_ID = req.params.id;
    const verificationURL = `https://developers.flouci.com/api/verify_payment/${payment_ID}`;
    try {
      const verfResult = await axios.get(verificationURL, {
        headers: {
          "Content-Type": "application/json",
          apppublic: "8db3f7ed-28c7-40a2-b0e8-653d8e000ea8",
          appsecret: process.env.FLOUCI_SECRET,
        },
      });
      res.send(verfResult.data);
    } catch (error) {
      throw error;
    }
  }

}

