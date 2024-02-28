import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import chuncksToJson from "../lib/utilitys/chuncksToJson";
import getUserFromSessionid from "../lib/utilitys/getUserFromSessionid";
import checkoutItem_t from "../lib/types/checkoutItem_t";
import makeCheckoutItems from "../lib/utilitys/makeCheckoutItems";
import stripe from "../stripe";
import writeLogs from "../writeLogs";
import dollarsToCents from "../lib/utilitys/dollarsToCents";

export default async function createCheckoutSessionShop(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  console.log("test");
  useCors(req, res, (req, res) => {
    const chunks = [];

    req
      .on("data", (c) => {
        chunks.push(c);
      })
      .on("end", async () => {
        try {
          if (req.method !== "POST") {
            res.writeHead(405, "wrong method");
            res.end();
            return;
          }

          const sessionid = req.headers["x-sessionid"] as string;

          if (!sessionid) {
            res.writeHead(403, "unauthorized");
            res.end();
            return;
          }

          const data = chuncksToJson(chunks);

          const checkoutItems: checkoutItem_t[] = await makeCheckoutItems(
            data.itemsToSend
          );

          const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: checkoutItems.map((val) => ({
              quantity: val.quantity,
              price_data: {
                currency: "usd",
                product_data: {
                  name: val.itemObj.name,
                },
                unit_amount: dollarsToCents(val.itemObj.price),
              },
            })),
            //eventually add some pages saying
            success_url: `${process.env.APPURL}/home/shop/checkout-success`,
            cancel_url: `${process.env.APPURL}/home/shop`,
          });

          if (checkoutSession) {
            res.writeHead(200, "success");
            res.write(JSON.stringify({ paymentUrl: checkoutSession.url }));
            res.end();
          } else {
            res.writeHead(500, "stripe error");
            res.end();
          }
        } catch (e) {
          writeLogs(e.message);
          res.writeHead(500, "internal server error");
          res.end();
        }
      });
  });
}
