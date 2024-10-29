import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import VCLoader from "./VCLoader";
import useCookie from "react-use-cookie";


const VoucherCard = () => {
  const [userToken, setUserToken] = useCookie("my_token");
  const fetcher = (...args) => fetch(...args,{
    headers: {
      "Authorization": `Bearer ${userToken}`
    }
  }).then((res) => res.json());

  const { id } = useParams();
  console.log(id)
  
  const { data, error, isLoading } = useSWR(
    import.meta.env.VITE_API_URL + "/vouchers/" + id,
    fetcher
  );
  // if (isLoading) return <p>Loading...</p>;

  // console.log(data);
  return (
    <>
      {isLoading ? (
        <VCLoader />
      ) : (
        <div className=" flex gap-5">
          <div
            id="printArea"
            className="w-[14.8cm] bg-[#f3f0f0] p-5 shadow-lg rounded mt-3 "
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
                <p className="text-xl">{data.data.voucher_id}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">Invoice to</p>
                <p>{data.data.customer_name}</p>
                <p>Date: {data.data.sale_date}</p>
              </div>
            </div>

            <table className="w-full mb-8">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2 text-sm">No</th>
                  <th className="text-left py-2 text-sm">Description</th>
                  <th className="text-right py-2 text-sm">Qty</th>
                  <th className="text-right py-2 text-sm">Price</th>
                  <th className="text-right py-2 text-sm">Total</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.records.map((record, index) => (
                  <tr key={record.id} className="border-b border-gray-200">
                    <td className="py-2 text-sm">{index + 1}</td>
                    <td className="py-2 text-sm">
                      {record.product.product_name}
                    </td>
                    <td className="text-right py-2 text-sm">
                      {record.quantity}
                    </td>
                    <td className="text-right py-2 text-sm">
                      {record.product.price}
                    </td>
                    <td className="text-right py-2 text-sm">{record.cost}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-right text-sm" colSpan={4}>
                    Total
                  </td>
                  <td className="py-2 text-right text-sm">
                    {parseFloat(data.data.total).toFixed(2)}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-right text-sm" colSpan={4}>
                    Tax
                  </td>
                  <td className="py-2 text-right text-sm">
                    {parseFloat(data.data.tax).toFixed(2)}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-right text-sm" colSpan={4}>
                    Net Total
                  </td>
                  <td className="py-2 text-right text-sm">
                    {parseFloat(data.data.net_total).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="text-xs flex justify-between mb-8">
              <div className=" items-center">
                <h2 className="font-bold mb-2">Payment Transfer to</h2>
                <p>Kpay,Wave - 09250152018</p>
                <p>KBZ Bank - 02730102705025601</p>
                <p>AYA Bank - 20003674121</p>
              </div>
              <div className=" items-center justify-between">
                <h2 className="font-bold text-xl">MMS IT</h2>
                <p>48, 1st Floor, Shan Kone St.</p>
                <p>+959-250-152-018</p>
                <p>enquiry@mms-it.com</p>
              </div>
            </div>

            <div className="border-t-2 border-gray-300 pt-4">
              <p className="mt-4 text-center text-sm">Thanks to You</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoucherCard;
