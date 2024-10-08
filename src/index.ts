import express from "express";
import z from 'zod';
import { prismaClient } from "./db";

export const app = express();

app.use(express.json());

const sumInput = z.object({
    a: z.number(),
    b: z.number()
});

console.log(prismaClient.sum);

app.post('/sum', async (req, res) => {

    const parsedInput = sumInput.safeParse(req.body);

    if(!parsedInput.success){
        return res.status(411).json({
            msg:"Wrong Input types"
        })
    }

    const a = parsedInput.data.a;
    console.log(a);
    const b = parsedInput.data.b;
    console.log(b);
    const answer = a + b;
    console.log("Answer::->  ",answer)

    await prismaClient.sum.create({
        data:{
            a: parsedInput.data.a,
            b: parsedInput.data.b,
            result: answer
        }
    })

    res.status(200).json({
        a,
        b,
        sum: answer
    });
});

app.post('/multiply', async (req, res) => {

    const parsedInput = sumInput.safeParse(req.body);

    if(!parsedInput.success){
        return res.status(411).json({
            msg:"Wrong Input types"
        })
    }

    const a = parsedInput.data.a;
    console.log(a);
    const b = parsedInput.data.b;
    console.log(b);
    const answer = a * b;
    console.log("Answer::->  ",answer)

    const request = await prismaClient.sum.create({
        data:{
            a: parsedInput.data.a,
            b: parsedInput.data.b,
            result: answer
        }
    })

    res.status(200).json({
        a,
        b,
        answer,
        id: request.id
    });
});

app.post('/divide', async (req, res) => {

    const parsedInput = sumInput.safeParse(req.body);

    if(!parsedInput.success){
        return res.status(411).json({
            msg:"Wrong Input types"
        })
    };

    const a = parsedInput.data.a;
    console.log(a);
    const b = parsedInput.data.b;
    console.log(b);

    if(a > 1000000 || b >1000000){
        return res.status(422).json({
            msg:"Wrong Input types"
        });
    }

    const answer = a / b;
    console.log("Answer::->  ",answer)

    const request = await prismaClient.sum.create({
        data:{
            a: parsedInput.data.a,
            b: parsedInput.data.b,
            result: answer
        }
    })

    res.status(200).json({
        a,
        b,
        answer,
        id: request.id
    });
});

app.post('/remainder', async (req, res) => {

    const parsedInput = sumInput.safeParse(req.body);

    console.log(parsedInput)

    if(!parsedInput.success){
        return res.status(411).json({
            msg:"Wrong Input types"
        })
    };

    const a = parsedInput.data.a;
    console.log(a);
    const b = parsedInput.data.b;
    console.log(b);

    if(a > 1000000 || b >1000000){
        return res.status(422).json({
            msg:"Wrong Input types"
        });
    }

    const answer = a % b;
    console.log("Answer::->  ",answer)

    const request = await prismaClient.sum.create({
        data:{
            a: parsedInput.data.a,
            b: parsedInput.data.b,
            result: answer
        }
    })

    res.status(200).json({
        a,
        b,
        answer,
        id: request.id
    });
});

app.get('/sum', async (req, res) => {
    const parsedInput = sumInput.safeParse({
        a: Number(req.headers['a']),
        b: Number(req.headers['b'])
    });

    if(!parsedInput.success){
        return res.status(411).json({
            msg:"Incorrect Input"
        });
    }

    const answer = parsedInput.data.a + parsedInput.data.b;

    res.json({
        answer
    });
})
// app.listen(3000, () => {
//     console.log('backend running on port 3000');
// });