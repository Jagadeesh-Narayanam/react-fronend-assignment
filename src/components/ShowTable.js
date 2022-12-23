import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import Row from "./Row";
import Rows from "./Rows";


const ShowTable = (props) => {
  const groups = _.groupBy(props.data, 'name');
  // console.log(groups);
  const groupsList = Object.entries(groups);

  const [searchWord, setSearchWord] = useState("");
  const [groupsToDisplay, setGroupsToDisplay] = useState(groupsList);


  const searchHandler = (event) => {
    setSearchWord(event.target.value.toLowerCase());
    setSearchWord(event.target.value.toLowerCase())
    console.log(searchWord);
  }

  useEffect(() => {
    
    if (searchWord) {
      const temp = groupsList.filter((item) => item[0].toLowerCase().includes(searchWord))
      // console.log(temp);
      setGroupsToDisplay(temp);
    }
  }, [searchWord])


  return (<div className="total-table">
    {props.data.length!==0 && <div className="search">
      <input className="form-control rounded" type="text" onChange={searchHandler} placeholder="Search for Products" style={{ "width": "30%" ,"margin":"8px auto"}} />
    </div>}


    {searchWord && <div className='show-table' >
      <table className="table table-striped mb-0" style = {{"width":"85%","margin":"auto","borderRadius":"20px","border":"1px solid grey"}}>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Stock</th>
            <th>Deal</th>
            <th>Free</th>
            <th>Mrp</th>
            <th>Rate</th>
            <th>Expiry</th>
          </tr>
          {groupsToDisplay.map((group) => (
            <Row key={group[0]} item={group} />))}
        </tbody>
      </table>
    </div>
    }
    {searchWord && groupsToDisplay.length === 0 && <div><tr></tr><h2 style={{"display":"flex","justify-content":"center","margin-top":"20px"}}>No products Found</h2></div>}

    {!searchWord && <Rows groupsList={groupsList} />}

  </div>

  );
 
}

export default ShowTable;
