import axios from "axios";
import {useState, useEffect} from "react";
import {useInput} from "./useInput";

function useData () {
    const [inputs, setInputs] = useInput({year: "", country: ""})
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `https://calendarific.com/api/v2/holidays?&api_key=47bbad09ac6713178e45e53a49b019fceaac2750&country=${inputs.country}&year=${inputs.year}&type=national`
            );
            setData(response.data)
        }
        fetchData();
    }, []);


    const refetch = () => {
        const response = axios.get(
            `https://calendarific.com/api/v2/holidays?&api_key=47bbad09ac6713178e45e53a49b019fceaac2750&country=${inputs.country}&year=${inputs.year}&type=national`
        );
        setData(response.data)
    }
    return[data, inputs, setInputs, refetch]
}

export default useData;
















































// import { useEffect, useState } from "react";
// import axios from "axios";

// function useFetch(url) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(url)
//       .then(response => setData(response.data))
//       .catch((err) => {
//         setError(err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const refetch = () => {
//     setLoading(true);
//     axios
//       .get(url)
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((err) => {
//         setError(err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return [data, loading, error, refetch];
// }

// export default useFetch;