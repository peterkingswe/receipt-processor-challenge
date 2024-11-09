import {Router, Request, Response} from "express";
import {validateParams} from "../modules/validators";
import {generateUniqueReceiptId, calcPoints} from "../modules/helpers";

export const routerReceipts: Router = Router();

routerReceipts.post('/receipts/process', (req: Request, res: Response) => {
    // TODO play with this
    const body = req.body;

    // optional not validated only required
    if(!validateParams(req.body)){
        return res.status(400).json({ message: "The receipt is invalid" });
    }
    body.points = calcPoints(body);
    body.uuid = generateUniqueReceiptId();

    // insert into DB make sure to sanitize | check for sql injection
    // return 200 with ID OR return 400 The receipt is invalid
    return res.status(200).json({id:body.uuid});
});

routerReceipts.get('/receipts/:id/points', (req: Request, res: Response) => {
    const { id } = req.params;

    // Validate the ID (ensuring no spaces)
    if (!id || !/^\S+$/.test(id)) {
        return res.status(404).json({ message: "receipt found for that id" });
    }

    // search for ID in DB
    // if none found then return 404

}


// GET /receipts/{id}/points

// requests prop
// PATH PARAMETERS
// id
// required
// string^\S+$
// The ID of the receipt

// responses

// 200The number of points awarded
// RESPONSE SCHEMA: application/json
// points
// integer <int64>

// 404No receipt found for that id