import React, { useEffect, useState } from "react";
import FacultyCard from "../FacultyCard";
import { useLocation } from "react-router-dom";
import {
  facultyDetails,
  StaffDetails,
  StudentDetails,
} from "../../utils/faculty.config";

const Faculty = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState();

  const { pathname } = useLocation();

  const facultyType = pathname.split("/")[2];

  useEffect(() => {
    const loadData = async () => {
      let d;
      if (facultyType === "staff") {
        d = await fetch(
          "https://omprakash1.pythonanywhere.com/api/staff/"
        ).then((res) => res.json());
      } else if (facultyType === "faculty") {
        d = await fetch(
          "https://omprakash1.pythonanywhere.com/api/faculty/"
        ).then((res) => res.json());
      } else {
        if (pathname.split("/")[3] === "ug") {
          d = await fetch(
            "https://omprakash1.pythonanywhere.com/api/faculty/"
          ).then((res) => res.json());
        } else {
          d = await fetch(
            "https://omprakash1.pythonanywhere.com/api/staff/"
          ).then((res) => res.json());
        }
      }
      setData(d);
      setLoader(true);
    };
    loadData();
  } , [pathname]);

  return loader ? (
    <div className="flex flex-wrap gap-2 items-center justify-start">
      {data.map((d) => {
        return (
          <FacultyCard
            key={d.id}
            name={d.name}
            designation={d.post}
            image={d.image}
            contact={{ email: d.email, phone: d.phoneno }}
            expertise={[d.interest_area_1, d.interest_area_2]}
            joinYear={d.joined_year}
          />
        );
      })}
    </div>
  ) : null;
};

export default Faculty;
