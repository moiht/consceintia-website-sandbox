import React, { useState } from "react";
import styles from "./styles/DashboardEventAdmin.module.css";
import { CldUploadButton } from "next-cloudinary";
import toast from "react-hot-toast";

function DashboardEventAdmin() {
  const [isSolo, setisSolo] = useState(false);
  const [rules, setRules] = useState(1);
  const [links, setLinks] = useState(1);
  const [organiser, setOrganisers] = useState(1);
  const [uisSolo, setuisSolo] = useState(false);
  const [urules, setuRules] = useState(1);
  const [ulinks, setuLinks] = useState(1);
  const [uorganiser, setuOrganisers] = useState(1);
  const [createEvent, setCreateEvent] = useState(false);
  const [updateEvent, setUpdateEvent] = useState(false);
  const [eventData, setEventData] = useState({});

  const [eventPoster, setEventPoster] = useState("trial");
  const [ueventPoster, setuEventPoster] = useState("trial");

  const updatebtn = async () => {
    let id = document.getElementById("updateId").value;
    console.log(id);
    let ld = toast.loading("Fetching Event Details");
    let res = await fetch(`/api/events/getEventbyId`, {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    let resData = await res.json();
    console.log(resData);
    if (res.status === 200) {
      toast.success("Event Details Fetched Successfully");
      toast.dismiss(ld);
      setEventData(resData.data);

      document.getElementsByName("ueventCat").forEach((e) => {
        if (resData.data.eventCategory.includes(e.value)) {
          e.checked = true;
        }
      });

      if (resData.data.eventType == "solo") {
        document.getElementById("usoloR").checked = true;
        setuisSolo(true);
      } else {
        document.getElementById("uteamR").checked = true;
        setuisSolo(false);
      }
      let startDate = new Date(resData.data.eventStartDate);
      let endDate = new Date(resData.data.eventEndDate);
      setuRules(resData.data.eventRules.length);
      setuLinks(resData.data.associatedLinks.length);
      setuOrganisers(resData.data.eventOrganizers.length);
      document.getElementById("ustartDate").value = startDate
        .toISOString()
        .split("T")[0];
      document.getElementById("ustartTime").value = startDate
        .toISOString()
        .split("T")[1]
        .split(".")[0];
      document.getElementById("uendDate").value = endDate
        .toISOString()
        .split("T")[0];
      document.getElementById("uendTime").value = endDate
        .toISOString()
        .split("T")[1]
        .split(".")[0];
      document.getElementById("uregLastDate").value = new Date(
        resData.data.eventRegistrationLastDate
      )
        .toISOString()
        .split("T")[0];
      setuEventPoster(resData.data.eventPoster);
      setUpdateEvent(true);
    } else {
      toast.dismiss(ld);
      toast.error(resData.msg);
    }
  };

  const addEvent = async () => {
    let eventName = document.getElementById("eventName").value;
    let eventCat = [];
    document.getElementsByName("eventCat").forEach((el) => {
      if (el.checked) {
        eventCat.push(el.value);
      }
    });
    let eventPrize = document.getElementById("eventPrize").value;
    let eventType = document.querySelector('input[name="eventType"]:checked');
    let eventDescription = document.getElementById("eventDescription").value;
    let teamMin = document.getElementById("teamMin").value;
    let teamMax = document.getElementById("teamMax").value;
    let startDate = document.getElementById("startDate").value;
    let startTime = document.getElementById("startTime").value;
    let endDate = document.getElementById("endDate").value;
    let endTime = document.getElementById("endTime").value;
    let eventRegistrationFee = document.getElementById(
      "eventRegistrationFee"
    ).value;
    let eventVenue = document.getElementById("eventVenue").value;
    let regLastDate = document.getElementById("regLastDate").value;
    let eventRules = [];
    let eventLinks = [];
    let eventOrganisers = [];
    for (let i = 0; i < rules; i++) {
      if (document.getElementsByName("eventRules")[i].value === "") {
        toast.error("Please fill all the required fields");
        return;
      }
      eventRules.push(document.getElementsByName("eventRules")[i].value);
    }
    for (let i = 0; i < links; i++) {
      if (
        document.getElementsByName("eventLinksName")[i].value === "" ||
        document.getElementsByName("eventLinksUrl")[i].value === ""
      ) {
        toast.error("Please fill all the required fields");
        return;
      }
      eventLinks.push({
        name: document.getElementsByName("eventLinksName")[i].value,
        url: document.getElementsByName("eventLinksUrl")[i].value,
      });
    }
    for (let i = 0; i < organiser; i++) {
      if (
        document.getElementsByName("eventOrganiserTitle")[i].value === "" ||
        document.getElementsByName("eventOrganiserUsername")[i].value === ""
      ) {
        toast.error("Please fill all the required fields");
        return;
      }
      eventOrganisers.push({
        title: document.getElementsByName("eventOrganiserTitle")[i].value,
        username: document.getElementsByName("eventOrganiserUsername")[i].value,
      });
    }
    if (eventCat.length == 0 || eventType === null) {
      toast.error("Please select category and type");
      return;
    }
    if (!isSolo && (teamMin === "" || teamMax === "")) {
      toast.error("Please fill all the required fields");
      return;
    } else if (isSolo) {
      teamMin = 1;
      teamMax = 1;
    } else {
      teamMin = document.getElementById("teamMin").value;
      teamMax = document.getElementById("teamMax").value;
      if (parseInt(teamMin) > parseInt(teamMax)) {
        toast.error("Min players should be less than max players");
        return;
      }
    }
    if (
      eventName === "" ||
      eventPrize === "" ||
      eventDescription === "" ||
      startDate === "" ||
      startTime === "" ||
      endDate === "" ||
      endTime === "" ||
      eventRegistrationFee === "" ||
      eventVenue === "" ||
      regLastDate === ""
    ) {
      toast.error("Please fill all the required fields");
      return;
    }
    if (eventPoster === "") {
      toast.error("Please upload event poster");
      return;
    }

    let data = {
      eventName,
      eventCat: eventCat,
      eventPrize,
      eventType: eventType.value,
      eventDescription,
      teamMin,
      teamMax,
      startDate,
      startTime,
      endDate,
      endTime,
      eventRegistrationFee,
      eventVenue,
      regLastDate,
      eventRules,
      eventLinks,
      eventOrganisers,
      eventPoster,
    };
    let tid = toast.loading("Adding Event");
    let res = await fetch("/api/events/addEvent", {
      method: "POST",
      body: JSON.stringify(data),
    });
    let resData = await res.json();
    console.log(resData);
    toast.dismiss(tid);
    if (resData.status === 200) {
      toast.success("Event Added Successfully");
      setCreateEvent(false);
    } else {
      toast.error(resData.body.msg);
    }
  };

  const updateEventData = async () => {
    let updateEventId = eventData.eventId;
    let eventName = document.getElementById("ueventName").value;
    let eventCat = [];
    document.getElementsByName("ueventCat").forEach((el) => {
      if (el.checked) {
        eventCat.push(el.value);
      }
    });
    let eventPrize = document.getElementById("ueventPrize").value;
    let eventType = document.querySelector('input[name="ueventType"]:checked');
    let eventDescription = document.getElementById("ueventDescription").value;
    let teamMin = document.getElementById("uteamMin").value;
    let teamMax = document.getElementById("uteamMax").value;
    let startDate = document.getElementById("ustartDate").value;
    let startTime = document.getElementById("ustartTime").value;
    let endDate = document.getElementById("uendDate").value;
    let endTime = document.getElementById("uendTime").value;
    let eventRegistrationFee = document.getElementById(
      "ueventRegistrationFee"
    ).value;
    let eventVenue = document.getElementById("ueventVenue").value;
    let regLastDate = document.getElementById("uregLastDate").value;
    let eventRules = [];
    let eventLinks = [];
    let eventOrganisers = [];
    for (let i = 0; i < urules; i++) {
      if (document.getElementsByName("ueventRules")[i].value === "") {
        toast.error("Please fill all the required fields");
        return;
      }
      eventRules.push(document.getElementsByName("ueventRules")[i].value);
    }
    for (let i = 0; i < ulinks; i++) {
      if (
        document.getElementsByName("ueventLinksName")[i].value === "" ||
        document.getElementsByName("ueventLinksUrl")[i].value === ""
      ) {
        toast.error("Please fill all the required fields");
        return;
      }
      eventLinks.push({
        name: document.getElementsByName("ueventLinksName")[i].value,
        url: document.getElementsByName("ueventLinksUrl")[i].value,
      });
    }
    for (let i = 0; i < uorganiser; i++) {
      if (
        document.getElementsByName("ueventOrganiserTitle")[i].value === "" ||
        document.getElementsByName("ueventOrganiserUsername")[i].value === ""
      ) {
        toast.error("Please fill all the required fields");
        return;
      }
      eventOrganisers.push({
        title: document.getElementsByName("ueventOrganiserTitle")[i].value,
        username: document.getElementsByName("ueventOrganiserUsername")[i]
          .value,
      });
    }
    if (eventCat.length == 0 || eventType === null) {
      toast.error("Please select category and type");
      return;
    }
    if (!uisSolo && (teamMin === "" || teamMax === "")) {
      toast.error("Please fill all the required fields");
      return;
    } else if (uisSolo) {
      teamMin = 1;
      teamMax = 1;
    } else {
      teamMin = document.getElementById("uteamMin").value;
      teamMax = document.getElementById("uteamMax").value;
      if (parseInt(teamMin) > parseInt(teamMax)) {
        toast.error("Min players should be less than max players");
        return;
      }
    }
    if (
      eventName === "" ||
      eventPrize === "" ||
      eventDescription === "" ||
      startDate === "" ||
      startTime === "" ||
      endDate === "" ||
      endTime === "" ||
      eventRegistrationFee === "" ||
      eventVenue === "" ||
      regLastDate === ""
    ) {
      toast.error("Please fill all the required fields");
      return;
    }
    if (ueventPoster === "") {
      toast.error("Please upload event poster");
      return;
    }

    let data = {
      eventId: updateEventId,
      eventName,
      eventCat,
      eventPrize,
      eventType: eventType.value,
      eventDescription,
      teamMin,
      teamMax,
      startDate,
      startTime,
      endDate,
      endTime,
      eventRegistrationFee,
      eventVenue,
      regLastDate,
      eventRules,
      eventLinks,
      eventOrganisers,
      eventPoster: ueventPoster,
    };
    let tid = toast.loading("Updating Event");
    let res = await fetch("/api/events/updateEvent", {
      method: "POST",
      body: JSON.stringify(data),
    });
    let resData = await res.json();
    console.log(resData);
    toast.dismiss(tid);
    if (resData.status === 200) {
      toast.success("Event Updated Successfully");
      setUpdateEvent(false);
      setCreateEvent(false);
    } else {
      toast.error(resData.body.msg);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div
        className={`justify-center items-center flex-col ${
          !updateEvent && !createEvent ? "flex" : "hidden"
        }`}
      >
        <button
          className={styles.addbtn}
          onClick={() => setCreateEvent(!createEvent)}
        >
          ADD NEW EVENT
        </button>
        <div className="max-md:flex max-md:items-center max-md:justify-center max-md:flex-col max-md:gap-6">
          <input
            className={styles.updateBox}
            placeholder="EVENT ID"
            type="text"
            id="updateId"
          ></input>
          <button className={styles.addbtn} onClick={updatebtn}>
            UPDATE EVENT
          </button>
        </div>
      </div>
      <div className={`${createEvent ? "block" : "hidden"}`}>
        <div className=" bg-gray-800 md:ml-10 md:mr-10 border border-slate-200 md:grid lg:grid-cols-2 grid-cols-1 gap-x-2 gap-y-4 rounded-xl md:p-5 ml-2 mr-2 p-3 text-sm mb-3 *:max-md:mb-4">
          <h1 className="text-center text-slate-200 text-xl font-bold lg:col-span-2 mb-4">
            Add Event
          </h1>
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white lg:col-span-2 rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
            id="eventName"
            name="eventName"
            placeholder="Enter Event Name"
            type="text"
          />
          <div
            className={`lg:col-span-2 flex flex-row justify-center items-center`}
          >
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"major"}
                className={styles["cyberpunk-checkbox"]}
              />
              Major
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"robotics"}
                className={styles["cyberpunk-checkbox"]}
              />
              Robotics
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"coding"}
                className={styles["cyberpunk-checkbox"]}
              />
              Coding
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"quiz"}
                className={styles["cyberpunk-checkbox"]}
              />
              Quiz
            </label>
          </div>
          <div
            className={`col-span-2 flex flex-row justify-center items-center`}
          >
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"mysterious"}
                className={styles["cyberpunk-checkbox"]}
              />
              Mysterious
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"aero"}
                className={styles["cyberpunk-checkbox"]}
              />
              Aero
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"fun"}
                className={styles["cyberpunk-checkbox"]}
              />
              Fun
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"online"}
                className={styles["cyberpunk-checkbox"]}
              />
              Online
            </label>
          </div>
          <div
            className={`col-span-2 flex flex-row justify-center items-center`}
          >
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"bot"}
                className={styles["cyberpunk-checkbox"]}
              />
              Bot
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"business"}
                className={styles["cyberpunk-checkbox"]}
              />
              Business
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"sports"}
                className={styles["cyberpunk-checkbox"]}
              />
              Sports
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"hackathon"}
                className={styles["cyberpunk-checkbox"]}
              />
              Hackathon
            </label>
          </div>
          <div
            className={`col-span-2 flex flex-row justify-center items-center`}
          >
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"maths"}
                className={styles["cyberpunk-checkbox"]}
              />
              Mathematics
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"physics"}
                className={styles["cyberpunk-checkbox"]}
              />
              Physics
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"photography"}
                className={styles["cyberpunk-checkbox"]}
              />
              Photography
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"editing"}
                className={styles["cyberpunk-checkbox"]}
              />
              Editing
            </label>
          </div>
          <div
            className={`col-span-2 flex flex-row justify-center items-center`}
          >
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"trading"}
                className={styles["cyberpunk-checkbox"]}
              />
              Trading
            </label>
          </div>

          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
            name="eventPrize"
            id="eventPrize"
            placeholder="Enter Prize"
            type="number"
            min={0}
          />
          <div className={styles.radioInput}>
            <span className="flex items-center h-full mr-4 ml-2">Type: </span>
            <input
              value="solo"
              name="eventType"
              id="soloR"
              type="radio"
              onClick={() => setisSolo(true)}
            />
            <label for="soloR">Solo</label>
            <input
              value="team"
              name="eventType"
              id="teamR"
              type="radio"
              onClick={() => setisSolo(false)}
            />
            <label for="teamR">Team</label>
          </div>
          <textarea
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid lg:col-span-2 focus:border-[#596A95] border-[#2B3040]"
            name="eventDescription"
            id="eventDescription"
            placeholder="Enter Full Description"
            type="text"
          />
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="teamMin"
            placeholder="Min no of Players in Team"
            type="number"
            id="teamMin"
            min={1}
            disabled={isSolo}
          />
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="teamMax"
            placeholder="Max no of Players in Team"
            type="number"
            id="teamMax"
            min={1}
            disabled={isSolo}
          />
          <span className="font-medium text-center w-full col-span-2">
            Start Date & Time
          </span>
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="eventStartDate"
            placeholder="Start Date"
            type="date"
            id="startDate"
          />
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="eventStartTime"
            placeholder="Start Time"
            type="time"
            id="startTime"
          />
          <span className="font-medium text-center w-full col-span-2">
            End Date & Time
          </span>
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="eventEndDate"
            placeholder="End Date"
            type="date"
            id="endDate"
          />
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="eventEndTime"
            placeholder="End Time"
            type="time"
            id="endTime"
          />
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="eventRegistrationFee"
            placeholder="Registration Fee"
            type="number"
            min={0}
            id="eventRegistrationFee"
          />
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="eventVenue"
            placeholder="Event Venue"
            type="text"
            id="eventVenue"
          />
          <span className="col-span-2 flex items-center justify-center">
            RULES
          </span>

          {[...Array(rules)].map((_, i) => (
            <input
              key={i}
              className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] col-span-2 border-[#2B3040] disabled:opacity-50"
              name="eventRules"
              placeholder={"Rule " + (i + 1)}
              type="text"
            />
          ))}
          <button
            onClick={() => setRules(rules + 1)}
            className={styles.btnRule}
          >
            Add Rule
          </button>
          <button
            onClick={() => setRules(rules > 1 ? rules - 1 : 1)}
            className={styles.btnRule}
          >
            Remove Rule
          </button>
          <span className="mt-3 col-span-2 flex items-center justify-center">
            Related Links
          </span>

          {[...Array(links)].map((_, i) => (
            <div className="flex col-span-2" key={i}>
              <input
                className="bg-[#222630] px-4 py-3 outline-none w-1/3 text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50 mr-2"
                name="eventLinksName"
                placeholder={"Name"}
                type="text"
              />
              <input
                className="bg-[#222630] px-4 py-3 outline-none w-2/3 text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
                name="eventLinksUrl"
                placeholder={"URL"}
                type="text"
              />
            </div>
          ))}
          <button
            onClick={() => setLinks(links + 1)}
            className={styles.btnRule}
          >
            Add Link
          </button>
          <button
            onClick={() => setLinks(links > 1 ? links - 1 : 1)}
            className={styles.btnRule}
          >
            Remove Link
          </button>

          <span className="mt-3 col-span-2 flex items-center justify-center">
            Organisers
          </span>
          {[...Array(organiser)].map((_, i) => (
            <div className="flex col-span-2" key={i}>
              <input
                className="bg-[#222630] px-4 py-3 outline-none w-1/3 text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50 mr-2"
                name="eventOrganiserTitle"
                placeholder={"Title"}
                type="text"
              />
              <input
                className="bg-[#222630] px-4 py-3 outline-none w-2/3 text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
                name="eventOrganiserUsername"
                placeholder={"Username"}
                type="text"
              />
            </div>
          ))}
          <button
            onClick={() => setOrganisers(organiser + 1)}
            className={styles.btnRule}
          >
            Add Organiser
          </button>
          <button
            onClick={() => setOrganisers(organiser > 1 ? organiser - 1 : 1)}
            className={styles.btnRule}
          >
            Remove Organiser
          </button>
          <div className="w-full flex">
            <span className="font-medium text-center flex items-center w-1/2 justify-center">
              Registration Last Date
            </span>
            <input
              className="bg-[#222630] px-4 py-3 outline-none w-1/2 text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
              name="eventRegLastDate"
              placeholder="Registration Last Date"
              type="date"
              id="regLastDate"
            />
          </div>
          <CldUploadButton
            uploadPreset="gja3z3kr"
            onSuccess={(res) => {
              setEventPoster(res.info.secure_url);
            }}
          >
            <button className={styles.uploadbtn}>
              <span>Upload Event Poster</span>
            </button>
          </CldUploadButton>
          <div></div>
          <button className={styles.submitBtn} onClick={addEvent}>
            Add Event
          </button>
        </div>
      </div>
      <div className={updateEvent ? "block" : "hidden"}>
        <div className=" bg-gray-800 md:ml-10 md:mr-10 border border-slate-200 md:grid lg:grid-cols-2 grid-cols-1 gap-x-2 gap-y-4 rounded-xl md:p-5 ml-2 mr-2 p-3 text-sm *:max-md:mb-4">
          <h1 className="text-center text-slate-200 text-xl font-bold lg:col-span-2 mb-4">
            Update Event - {eventData.eventId}
          </h1>
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white lg:col-span-2 rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
            name="ueventName"
            id="ueventName"
            placeholder="Enter Event Name"
            type="text"
            defaultValue={eventData.eventName}
          />
          <div
            className={`lg:col-span-2 flex flex-row justify-center items-center`}
          >
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"major"}
                className={styles["cyberpunk-checkbox"]}
              />
              Major
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"robotics"}
                className={styles["cyberpunk-checkbox"]}
              />
              Robotics
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"coding"}
                className={styles["cyberpunk-checkbox"]}
              />
              Coding
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"quiz"}
                className={styles["cyberpunk-checkbox"]}
              />
              Quiz
            </label>
          </div>
          <div
            className={`col-span-2 flex flex-row justify-center items-center`}
          >
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"mysterious"}
                className={styles["cyberpunk-checkbox"]}
              />
              Mysterious
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"aero"}
                className={styles["cyberpunk-checkbox"]}
              />
              Aero
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"fun"}
                className={styles["cyberpunk-checkbox"]}
              />
              Fun
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"online"}
                className={styles["cyberpunk-checkbox"]}
              />
              Online
            </label>
          </div>
          <div
            className={`col-span-2 flex flex-row justify-center items-center`}
          >
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"bot"}
                className={styles["cyberpunk-checkbox"]}
              />
              Bot
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="eventCat"
                type="checkbox"
                value={"business"}
                className={styles["cyberpunk-checkbox"]}
              />
              Business
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"sports"}
                className={styles["cyberpunk-checkbox"]}
              />
              Sports
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"hackathon"}
                className={styles["cyberpunk-checkbox"]}
              />
              Hackathon
            </label>
          </div>
          <div
            className={`col-span-2 flex flex-row justify-center items-center`}
          >
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"maths"}
                className={styles["cyberpunk-checkbox"]}
              />
              Mathematics
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"physics"}
                className={styles["cyberpunk-checkbox"]}
              />
              Physics
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"photography"}
                className={styles["cyberpunk-checkbox"]}
              />
              Photography
            </label>
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"editing"}
                className={styles["cyberpunk-checkbox"]}
              />
              Editing
            </label>
          </div>
          <div
            className={`col-span-2 flex flex-row justify-center items-center`}
          >
            <label className={styles["cyberpunk-checkbox-label"]}>
              <input
                name="ueventCat"
                type="checkbox"
                value={"trading"}
                className={styles["cyberpunk-checkbox"]}
              />
              Trading
            </label>
          </div>
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
            name="ueventPrize"
            id="ueventPrize"
            placeholder="Enter Prize"
            type="number"
            min={0}
            defaultValue={eventData.eventPrize}
          />
          <div className={styles.radioInput}>
            <span className="flex items-center h-full mr-4 ml-2">Type: </span>
            <input
              value="solo"
              name="ueventType"
              id="usoloR"
              type="radio"
              onClick={() => setuisSolo(true)}
            />
            <label for="usoloR">Solo</label>
            <input
              value="team"
              name="ueventType"
              id="uteamR"
              type="radio"
              onClick={() => setuisSolo(false)}
            />
            <label for="uteamR">Team</label>
          </div>
          <textarea
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid lg:col-span-2 focus:border-[#596A95] border-[#2B3040]"
            name="ueventDescription"
            id="ueventDescription"
            placeholder="Enter Full Description"
            type="text"
            defaultValue={eventData.eventDescription}
          />
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="uteamMin"
            placeholder="Min no of Players in Team"
            type="number"
            id="uteamMin"
            min={1}
            disabled={uisSolo}
            defaultValue={eventData.eventMinTeam}
          />
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="uteamMax"
            placeholder="Max no of Players in Team"
            type="number"
            id="uteamMax"
            min={1}
            disabled={uisSolo}
            defaultValue={eventData.eventMaxTeam}
          />
          <span className="font-medium text-center w-full col-span-2">
            Start Date & Time
          </span>
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="ueventStartDate"
            placeholder="Start Date"
            type="date"
            id="ustartDate"
          />
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="ueventStartTime"
            placeholder="Start Time"
            type="time"
            id="ustartTime"
          />
          <span className="font-medium text-center w-full col-span-2">
            End Date & Time
          </span>
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="ueventEndDate"
            placeholder="End Date"
            type="date"
            id="uendDate"
          />
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="ueventEndTime"
            placeholder="End Time"
            type="time"
            id="uendTime"
          />
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="ueventRegistrationFee"
            placeholder="Registration Fee"
            type="number"
            min={0}
            id="ueventRegistrationFee"
            defaultValue={eventData.eventRegistrationFee}
          />
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
            name="ueventVenue"
            placeholder="Event Venue"
            type="text"
            id="ueventVenue"
            defaultValue={eventData.eventVenue}
          />
          <span className="col-span-2 flex items-center justify-center">
            RULES
          </span>

          {[...Array(urules)].map((_, i) => (
            <input
              key={i}
              className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] col-span-2 border-[#2B3040] disabled:opacity-50"
              name="ueventRules"
              placeholder={"Rule " + (i + 1)}
              type="text"
              defaultValue={eventData.eventRules && eventData.eventRules[i]}
            />
          ))}
          <button
            onClick={() => setuRules(urules + 1)}
            className={styles.btnRule}
          >
            Add Rule
          </button>
          <button
            onClick={() => setuRules(urules > 1 ? urules - 1 : 1)}
            className={styles.btnRule}
          >
            Remove Rule
          </button>
          <span className="mt-3 col-span-2 flex items-center justify-center">
            Related Links
          </span>

          {[...Array(ulinks)].map((_, i) => (
            <div className="flex col-span-2" key={i}>
              <input
                className="bg-[#222630] px-4 py-3 outline-none w-1/3 text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50 mr-2"
                name="ueventLinksName"
                placeholder={"Name"}
                type="text"
                defaultValue={
                  eventData.associatedLinks && eventData.associatedLinks[i].name
                }
              />
              <input
                className="bg-[#222630] px-4 py-3 outline-none w-2/3 text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
                name="ueventLinksUrl"
                placeholder={"URL"}
                type="text"
                defaultValue={
                  eventData.associatedLinks && eventData.associatedLinks[i].url
                }
              />
            </div>
          ))}
          <button
            onClick={() => setuLinks(ulinks + 1)}
            className={styles.btnRule}
          >
            Add Link
          </button>
          <button
            onClick={() => setuLinks(ulinks > 1 ? ulinks - 1 : 1)}
            className={styles.btnRule}
          >
            Remove Link
          </button>

          <span className="mt-3 col-span-2 flex items-center justify-center">
            Organisers
          </span>
          {[...Array(uorganiser)].map((_, i) => (
            <div className="flex col-span-2" key={i}>
              <input
                className="bg-[#222630] px-4 py-3 outline-none w-1/3 text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50 mr-2"
                name="ueventOrganiserTitle"
                placeholder={"Title"}
                type="text"
                defaultValue={
                  eventData.eventOrganizers &&
                  eventData.eventOrganizers[i].title
                }
              />
              <input
                className="bg-[#222630] px-4 py-3 outline-none w-2/3 text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
                name="ueventOrganiserUsername"
                placeholder={"Username"}
                type="text"
                defaultValue={
                  eventData.eventOrganizers &&
                  eventData.eventOrganizers[i].username
                }
              />
            </div>
          ))}
          <button
            onClick={() => setuOrganisers(uorganiser + 1)}
            className={styles.btnRule}
          >
            Add Organiser
          </button>
          <button
            onClick={() => setuOrganisers(uorganiser > 1 ? uorganiser - 1 : 1)}
            className={styles.btnRule}
          >
            Remove Organiser
          </button>
          <div className="w-full flex">
            <label
              htmlFor="eventRegLastDate"
              className="font-medium text-center flex items-center w-1/2 justify-center"
            >
              Registration Last Date:
            </label>
            <input
              className="bg-[#222630] px-4 py-3 outline-none w-1/2 text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] disabled:opacity-50"
              name="ueventRegLastDate"
              placeholder="Registration Last Date"
              type="date"
              id="uregLastDate"
            />
          </div>
          <CldUploadButton
            uploadPreset="gja3z3kr"
            onSuccess={(res) => {
              setuEventPoster(res.info.secure_url);
            }}
          >
            <button className={styles.uploadbtn}>
              <span>Upload Event Poster</span>
            </button>
          </CldUploadButton>
          <div></div>
          <button className={styles.submitBtn} onClick={updateEventData}>
            Update Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardEventAdmin;
