import express from "express";

export const app = express();

app.use(express.json());

app.post('/sum', async (req, res) => {
    const a = parseInt(req.body.a);
    console.log(a);
    const b = parseInt(req.body.b);
    console.log(b);
    const answer = a + b;
    console.log("Answer::->  ",answer)

    res.status(200).json({
        a,
        b,
        sum: answer
    });
});

// app.listen(3000, () => {
//     console.log('backend running on port 3000');
// });