import { Button, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useState, useEffect} from 'react';
import NameSearchField from './components/NameSearchField';
import RatingSetField from './components/RatingSetField';
import PriceSelectField from './components/PriceSelectField';
import Map from './components/Map';
import { useNavigate } from "react-router-dom";

export default function Search() {
    // to render the data I get
    
    // const [data, setData] = useState([{}])
    const navigate = useNavigate()
    const [query, setQuery] = useState("")
    const [name, setName] = useState([false, "name", ""])
    const [rating, setRating] = useState([false, "rating", 0]);
    const [price, setPrice] = useState([false, "price_type", ""]);
    const [lat, setLat] = useState([false, "latitude", 0.0]);
    const [lon, setLon] = useState([false, "longtitude", 0.0]);
    
    const handleClick = () => {
      const quelist = [name, rating, price, lat, lon];
      let query_str= "/search?"
        quelist.forEach(el => {
          if (el[0] !== false) {
            query_str = query_str + el[1] + "=" + el[2] + "&";
          }
        });
        
      setQuery(query_str);
    }

    useEffect(() => {
      if(query !== ""){
          console.log(query);
          fetch(query).then(
            res => res.json()
            ).then(
              response => {
                // setData(response)
                navigate("/result", { state: response })
                console.log(response)
              }
              )
        }
      }, [query])

    const BlueButton =  styled(Button)(({theme})=>({
      backgroundColor: theme.palette.primary,
      color: "white",
      margin:5,
      "&:hover":{
        backgroundColor: "primary",
      },
      "&:disabled":{
        backgroundColor: "gray",
        color:'white'
      }
    }))

  return (
    <div style={{display:'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>

        <NameSearchField setName = {setName}/>
        <RatingSetField setRating = {setRating}/>
        <PriceSelectField setPrice = {setPrice}/>
        <Map setLat = {setLat} setLon = {setLon} />
        <br/> 
        <BlueButton 
          variant="contained"
          startIcon={<SearchIcon />}
          onClick = {handleClick}
          sx = {{
            margin: 5,
          }}
        >
        </BlueButton>
    </div>
  );
}