import React, { useState } from "react";
import _ from "lodash";

const Row = (props) => {
  const product = props.item[1];
  const batches = ["All"];
  const [isBatchSelected, setIsBatchSelected] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState("All");

  for (const temp of product) {
    if (!batches.includes(temp['batch'])) {
      batches.push(temp["batch"]);
    }
  }
  const dropdownHandler = (event) => {
    setIsBatchSelected(true);
    setSelectedBatch(event.target.value);
  }

  var requiredFreeByDeal = 100;
  let free = 0;
  let deal = 0;
  for (const fbd of product) {
    if (fbd['free'] / fbd['deal'] < requiredFreeByDeal) {
      requiredFreeByDeal = fbd['free'] / fbd['deal'];
      free = fbd['free'];
      deal = fbd['deal'];
    }
  }

  if (selectedBatch === "All") {
    return (
      <tr>
        <td style={{ "width": "30%" }}>{props.item[0]}</td>
        <td style={{ "width": "20%" }}>
          <select
            className="btn btn-primary dropdown-toggle"
            onChange={dropdownHandler} 
            value="All" 
            style={{ "min-width": "60%", "max-width": "60%", "height": "50%" }}>
            {batches.map((batchId) => <option key={Math.random().toString()}>{batchId}</option>)}
          </select>
        </td>
        <td style={{ "width": "10%" }}>{_.sumBy(product, "stock")}</td>
        <td style={{ "width": "10%" }}>{deal}</td>
        <td style={{ "width": "10%" }}>{free}</td>
        <td style={{ "width": "10%" }}>{_.maxBy(product, "mrp").mrp}</td>
        <td style={{ "width": "10%" }}>{_.minBy(product, "rate").rate}</td>
        <td style={{ "width": "10%" }}>{_.maxBy(product, "exp").exp}</td>
      </tr>
    );
  }
  else {
    const requiredRow = product.filter((object) => {
      return object.batch == selectedBatch
    })
    console.log(requiredRow);
    console.log(_.sumBy(requiredRow, 'deal'));
    return <tr>
      <td>{props.item[0]}</td>
      <td>
        <select className="btn btn-primary dropdown-toggle" onChange={dropdownHandler} value={selectedBatch} style={{ "min-width": "60%", "max-width": "60%", "height": "50%", "background-color": "#3d5ddb" }}>
          {batches.map((batchId) => <option key={Math.random().toString()}>{batchId}</option>)}
        </select>
      </td>
      <td>{_.sumBy(requiredRow, "stock")}</td>
      <td>{_.sumBy(requiredRow, "deal")}</td>
      <td>{_.sumBy(requiredRow, "free")}</td>
      <td>{_.maxBy(requiredRow, "mrp").mrp}</td>
      <td>{_.maxBy(requiredRow, "rate").rate}</td>
      <td>{_.maxBy(requiredRow, "exp").exp}</td>
    </tr>
  }
};

export default Row;
