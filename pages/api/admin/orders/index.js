import { createRouter } from "next-connect";
import Order from "@/models/Order";
// import { dbConnect, dbDisconnect } from "@/utils/db";
import { onError } from "@/utils/error";
import { isAdmin, isAuth } from "@/utils/auth";
import { dbConnect, dbDisconnect } from "@/utils/db";

const router = createRouter({ onError });

router.use(isAuth, isAdmin);

// router.get(async (req, res) => {
//   try {
//     await dbConnect();
//     const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
//     const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
//     const skip = (page - 1) * limit;

//     const orders = await Order.find({})
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const totalOrders = await Order.countDocuments();
//     await dbDisconnect();
//     res.status(200).json({
//       orders,
//       totalPages: Math.ceil(totalOrders / limit),
//       currentPage: page,
//     });
//   } catch (error) {
//     console.error("Error fetching orders for orders:", error);
//   }
// });

// Update your backend API (api/admin/orders)
router.get(async (req, res) => {
  try {
    await dbConnect();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.search;

    let query = {};

    if (searchQuery) {
      query = {
        $or: [
          { identity: { $regex: searchQuery, $options: "i" } },
          { phone: { $regex: searchQuery, $options: "i" } },
          { nationality: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments(query);
    await dbDisconnect();
    res.status(200).json({
      orders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

export default router.handler();
