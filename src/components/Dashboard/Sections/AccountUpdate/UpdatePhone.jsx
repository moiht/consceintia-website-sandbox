import { setUpdateIndex } from "@/lib/features/dashboard/dashboardSlice";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/lib/features/auth/authSlice";

function UpdatePhone() {
  const { currUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const sendUpdateRequest = async () => {
    toast.loading("Updating Mobile");
    let res = await fetch("/api/updateUser/updateOther", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: document.getElementById("Number").value,
      }),
    });

    if (res.status == 200) {
      toast.dismiss();
      let data = await res.json();
      dispatch(setUser(data));
    } else {
      toast.dismiss();
      toast.error("Mobile not updated");
    }
  };

  return (
    <div className="w-80 bg-slate-900 rounded-2xl bg-">
      <div className="flex flex-col gap-2 p-8">
        <p className="text-center text-xl text-gray-300 mb-4">Update Phone</p>
        <input
          className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
          placeholder="Number"
          id="Number"
          defaultValue={currUser.mobile}
        />
        <button
          className="inline-block mt-3 cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
          onClick={() => {
            sendUpdateRequest();
            dispatch(setUpdateIndex(0));
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default UpdatePhone;
