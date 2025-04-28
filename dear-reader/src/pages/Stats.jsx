import ProfileTabs from "../components/ProfileTabs";
import { useEffect, useState, useRef } from "react";
import { getReadJournal, fetchBookByISBN } from "../api/api";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts";

function Stats({ currentUser }) {
  const thisYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [userJournal, setUserJournal] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [readThisYear, setReadThisYear] = useState(0);
  const [booksReadByMonth, setBooksReadByMonth] = useState({});
  const [readLogLoading, setReadLogLoading] = useState(false);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const [authorLoading, setAuthorLoading] = useState(false);
  const [topAuthor, setTopAuthor] = useState("");
  const [topSubject, setTopSubject] = useState("");

  useEffect(() => {
    setReadLogLoading(true);
    let count = 0;
    let monthCount = {};
    let isbnList = [];

    getReadJournal(currentUser.username).then((journalData) => {
      journalData.forEach((entry) => {
        const date = new Date(entry.date_read);
        const year = date.getFullYear();
        const month = date.getMonth();

        if (year === thisYear) {
          count += 1;
          if (monthCount[month]) {
            monthCount[month] += 1;
          } else {
            monthCount[month] = 1;
          }
        }
        isbnList.push(entry.isbn);
      });

      setReadThisYear(count);
      setBooksReadByMonth(monthCount);
      setUserJournal(journalData);
    });

    setReadLogLoading(false);
  }, [currentUser.id, thisYear]);

  useEffect(() => {
    setSubjectsLoading(true);
    const subjectCount = {};
    let allSubjects = [];
    userJournal.forEach((entry) => {
      fetchBookByISBN(entry.isbn).then((book) => {
        if (book) {
          allSubjects = allSubjects.concat(book.subjects || []);

          allSubjects.forEach(({ name }) => {
            if (
              name &&
              name[0] !== name[0].toLowerCase() &&
              !name.toLowerCase().includes("fiction") &&
              !name.toLowerCase().includes("new york times")
            ) {
              subjectCount[name] = (subjectCount[name] || 0) + 1;
            }
          });

          const sortedSubjects = Object.entries(subjectCount)
            .map(([title, count]) => ({ title, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);

          setSubjects(sortedSubjects);
          setTopSubject(sortedSubjects[0].title);
          setSubjectsLoading(false);
        }
      });
    });
  }, [currentUser.id]);

  useEffect(() => {
    setAuthorLoading(true);
    const authorsCount = {};
    let allAuthors = [];

    userJournal.forEach((entry) => {
      fetchBookByISBN(entry.isbn).then((book) => {
        if (book) {
          allAuthors = allAuthors.concat(book.authors || []);

          allAuthors.forEach(({ name }) => {
            if (name) {
              authorsCount[name] = (authorsCount[name] || 0) + 1;
            }
          });
          const sortedAuthors = Object.entries(authorsCount)
            .map(([author, count]) => ({ author, count }))
            .sort((a, b) => b.count - a.count);
          setTopAuthor(sortedAuthors[0].author);
          setAuthorLoading(false);
        }
      });
    });
  }, [currentUser.id]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredMonths = months.slice(0, currentMonth + 1);
  const monthsData = filteredMonths;
  const booksRead1 = filteredMonths.map((month, index) => {
    const monthIndex = months.indexOf(month);
    return booksReadByMonth[monthIndex] || 0;
  });

  const subjectsData = subjects.map((subject) => subject.title);
  const booksRead2 = subjects.map((subject) => subject.count);

  const pieData = subjectsData.map((subject, index) => ({
    label: subject,
    value: booksRead2[index] || 0, // Use booksRead2 values for pie chart sections
  }));

  return (
    <div className="mb-20">
      <ProfileTabs page="stats" currentUser={currentUser} />

      <div className="bar rounded-lg shadow-lg mb-5 mt-3">
        <p className="text-center pt-2">
          You have read {readThisYear} books so far this year!
        </p>
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: monthsData,
              colorMap: {
                type: "ordinal",
                colors: [
                  "#ccebc5",
                  "#a8ddb5",
                  "#7bccc4",
                  "#4eb3d3",
                  "#2b8cbe",
                  "#08589e",
                ],
              },
            },
          ]}
          series={[{ data: booksRead1 }]}
          height={200}
          loading={readLogLoading}
        />
      </div>
      {authorLoading ? (
        <></>
      ) : (
        <div className="bar rounded-lg shadow-lg mb-5 mt-4">
          <p className="text-center">Your most read author is {topAuthor}!</p>
        </div>
      )}

      <div className="bar rounded-lg shadow-lg mb-5">
        {subjectsLoading ? (
          <></>
        ) : (
          <p className="text-center pt-2 mb-2">
            Your top genre is {topSubject}!
          </p>
        )}

        <PieChart
          sx={{ stroke: "#617891" }}
          colors={[
            "#ccebc5",
            "#a8ddb5",
            "#7bccc4",
            "#4eb3d3",
            "#2b8cbe",
            "#08589e",
            "#f4a261",
            "#e76f51",
            "#2a9d8f",
            "#264653",
          ]}
          series={[
            {
              data: pieData,
            },
          ]}
          width={200}
          height={200}
          loading={subjectsLoading}
        />
      </div>
    </div>
  );
}

export default Stats;
