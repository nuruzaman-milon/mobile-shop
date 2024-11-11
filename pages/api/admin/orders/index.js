import { createRouter } from "next-connect";
import Order from "@/models/Order";
// import { dbConnect, dbDisconnect } from "@/utils/db";
import { onError } from "@/utils/error";
import { isAdmin, isAuth } from "@/utils/auth";
import { dbConnect, dbDisconnect } from "@/utils/db";

const router = createRouter({ onError });

router.use(isAuth, isAdmin);

// ! previous data fetch without pagination
// router.get(async (req, res) => {
//   await dbConnect();
//   // get all orders from db in descending order
//   const orders = await Order.find({}).sort({ createdAt: -1 }).limit(10);
//   await dbDisconnect();
//   res.send(orders);
// });

router.get(async (req, res) => {
  try {
    await dbConnect();
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;

    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments();
    await dbDisconnect();
    res.status(200).json({
      orders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching orders for orders:", error);
    // res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router.handler();
