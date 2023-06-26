import React from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css";

function Featured() {
  const { data, loading, error } = useFetch(
    `/hotel/countbycity?cities=Cpy,Paris,Kerala`
  );
  
  return (
    <div className="featured">
      {loading ? "Loading...":
        <>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/79894022.jpg?k=bbf72ac449b28d87aaa15e09338984f25204a2cec3de3e5665b873d91c739f4f&o=&hp=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Cpy</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/157984627.jpg?k=6ca60029cf1a88067164a9103cd7ce4f7b1eae71cd879cc0599961b7c4e55059&o=&hp=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Paris</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/113086068.jpg?k=c2c88fc456c273eb63aea290a91c1e3999070ea713eb29e126d59e1a550b5f0c&o=&hp=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Kerala</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default Featured;
