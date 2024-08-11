import { createContext, useState, useEffect } from "react";
import axios from "axios";

const ListingContext = createContext();

const ListingProvider = ({ children }) => {
  const [listings, setListings] = useState([]);

  const fetchData = () => {
    const binId = "668b2864ad19ca34f884581b";
    const secretKey =
      "$2a$10$4wrB9OCGsgFtmqSKZewRu.bLuVWlUsWpFT2JAofJQuRhiIOayxACu";

    axios
      .get(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: { "X-Master-Key": secretKey },
      })
      .then((res) => {
        setListings(res.data.record);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ListingContext.Provider value={{ listings }}>
      {children}
    </ListingContext.Provider>
  );
};

export default ListingProvider;
export { ListingContext };
