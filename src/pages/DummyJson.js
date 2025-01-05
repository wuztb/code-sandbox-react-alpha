import { useState, useEffect } from "react";

export default function FoodOrder() {
  const [data, setData] = useState();

  async function loadData() {
    // https://dummyjson.com/docs#intro-test
    const response = await fetch("https://dummyjson.com/todos/random/10");
    //console.log(response);
    const jsonData = await response.json();
    //console.log(data);
    setData(jsonData);
  }

  useEffect(() => {
    loadData();
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}
