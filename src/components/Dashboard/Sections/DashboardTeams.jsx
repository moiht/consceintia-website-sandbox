import React from "react";
import styles from "@/components/Dashboard/Sections/styles/DashboardTeams.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IoIosRemoveCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { setUser } from "@/lib/features/auth/authSlice";

function DashboardTeams() {
  const { currUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const addtoteam = async () => {
    let a = toast.loading("Adding to team");
    const username = document.getElementById("username").value;
    console.log(username);
    let res = await fetch("/api/dashboard/addtoteam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendId: username }),
    });
    let data = await res.json();
    if (res.status === 200) {
      if (data.user) {
        dispatch(setUser(data.user));
      }
      toast.dismiss(a);
      toast.success(data.msg);
    } else if (res.status == 404) {
      toast.dismiss(a);
      toast.error(data.msg);
    }
  };
  const removeteam = (username) => async () => {
    let a = toast.loading("Removing from team");
    let res = await fetch("/api/dashboard/removeteam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendId: username }),
    });
    let data = await res.json();
    if (res.status === 200) {
      if (data.user) {
        dispatch(setUser(data.user));
      }
      toast.dismiss(a);
      toast.success(data.msg);
    } else if (res.status == 404) {
      toast.dismiss(a);
      toast.error(data.msg);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-2 lg:pl-40 lg:pr-40 dark:text-white w-full items-center bg-white dark:bg-neutral-900 p-5 rounded-md mt-8 shadow-md">
        <div className={styles.inputContainer}>
          <input
            className={styles.inputbx}
            type="text"
            id="username"
            placeholder="Username"
          />
          <button onClick={addtoteam} className={styles.inputbtn}>
            Add to Team
          </button>
        </div>
        <div className="mt-10 w-72 md:w-80 lg:w-96">
          {currUser &&
            currUser.myTeam &&
            currUser.myTeam.map((user) => {
              return (
                <div key={user.userId} className={styles["cardCollection"]}>
                  <div className={styles["cardCollectionimg"]}>
                    <img className="rounded-[20px]" src={user.profile} alt="" />
                  </div>
                  <div className={styles["cardCollectiontextBox"]}>
                    <div className={styles["cardCollectiontextContent"]}>
                      <p className={styles["cardCollectionh1"]}>
                        {user.firstName} {user.lastName}
                      </p>
                      <div
                        className="cursor-pointer"
                        onClick={removeteam(user.username)}
                      >
                        <IoIosRemoveCircle />
                      </div>
                    </div>
                    <p className={styles["cardCollectionp"]}>{user.username}</p>
                    <div></div>
                  </div>
                </div>
              );
            })}
          {/* <div className={styles["cardCollection"]}>
            <div className={styles["cardCollectionimg"]}>
              <img className="rounded-[20px]" src={currUser.profile} alt="" />
            </div>
            <div className={styles["cardCollectiontextBox"]}>
              <div className={styles["cardCollectiontextContent"]}>
                <p className={styles["cardCollectionh1"]}>Aaditya Raj Anand</p>
                <div className="cursor-pointer">
                  <IoIosRemoveCircle />
                </div>
              </div>
              <p className={styles["cardCollectionp"]}>aadityatheperfect1</p>
              <div></div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default DashboardTeams;
