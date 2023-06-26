import "./list.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import useFetch from "../../hooks/useFetch";
import SearchItem from "../../components/searchItem/SearchItem";



function fistLetterUpperCase(word){
  const firstLetter = word.charAt(0)
  const firstLetterCap = firstLetter.toUpperCase()
  const remainingLetters = word.slice(1)
  return firstLetterCap + remainingLetters
}

function List() {

const location =useLocation()

  
  

  // const destination = useSelector((state) => state.searchHotel.destination)
  // const date = useSelector((state) => state.searchHotel.date)
  // const options = useSelector((state) => state.searchHotel.options)


  const [destination, setDestination] = useState(fistLetterUpperCase(location.state.destination));

  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { data, loading, error,reFetch } = useFetch(`/hotel?city=${destination}&min=${min || 0}&max=${max || 10000}`);



  const handleClick = ()=>{
    reFetch()
  }
  
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input onChange={e=>setDestination(fistLetterUpperCase(e.target.value))} type="text" placeholder={destination} />
            </div>
            <div className="lsItem">
              <label>Chek-in Date</label>
              <span onClick={()=>{
                setOpenDate(!openDate)
              }} >{`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOption">

              <div className="lsOptionItem">
                <span className="lsOptionText">Min Price <small>per night</small></span>
                <input type="number" min={0} onChange={e=>setMin(e.target.value)} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Max Price <small>per night</small></span>
                <input type="number"  min={0} onChange={e=>setMax(e.target.value)} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText" placeholder={options.adult} >Adult</span>
                <input type="number"  min={1} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText"  placeholder={options.children}>Children </span>
                <input type="number" min={0} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText"  placeholder={options.room}>Room </span>
                <input type="number" min={1} className="lsOptionInput" />
              </div>
              </div>

            </div>
            <button onClick={handleClick}>Search</button>
            
          </div>
          {openDate && <DateRange 
            className="datePicker"
              onChange={(item)=>setDate([item.selection] ) }
              minDate={new Date()}
              ranges={date}

              />}
          <div className="listResult">
            {loading ? "Loading":(
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}           
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
