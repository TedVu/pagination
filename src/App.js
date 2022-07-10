import "./App.css";
import { useState } from "react";
import fetcher from "./fetcher";
import useSWR from "swr";

function App() {
  const [pageIndex, setPageIndex] = useState(0);

  const { data, error } = useSWR(
    `https://api.instantwebtools.net/v1/passenger?page=${pageIndex}&size=10`,
    fetcher
  );

  if (error) {
    return <div>Error loading data...</div>;
  }

  if (!data) {
    return <div> Loading...</div>;
  }

  const handlePreviousClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
      console.log(pageIndex);
    }
  };

  const handleNextClick = () => {
    setPageIndex(pageIndex + 1);
  };

  return (
    <div>
      <ul>
        {data.data.map((passenger) => {
          return <li>{passenger.name}</li>;
        })}
      </ul>
      <button onClick={handlePreviousClick}>Previous</button>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}

export default App;
