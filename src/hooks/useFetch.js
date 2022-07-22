import axios from 'axios';
import {useState} from 'react'

const useFetch = () => {
  const [askin, setAskin] = useState([]);
  const [loading, setLoading] = useState(false)

  const getData = async(url) => {
    setLoading(true)
    const {data} = await axios.get(url)
    setAskin(data.response.holidays)
    setLoading(false)
  }

  return [askin, loading, getData]
}

export default useFetch