"use client";

import React, {useState} from "react";

export default function Home(){

  // Variables to hold user inputted information
  const [totalAmnt, setTotalAmnt] = useState(0);
  const [percentAmnt, setPercentAmnt] = useState(0);
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);
  const [ratePriceChange, setRatePriceChange] = useState(0);

  // State to hold previously calculated scenarios. An array of obj
  const [allPredicts, setAllPredicts] = useState([]);

  // State to store all form bodies with their calculations
  const [allFormBodies, setAllFormBodies] = useState([]);

  // Function to handle storing user inputted info in the variables
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'totalAmnt':
        setTotalAmnt(parseFloat(value));
        break;
      case 'percentAmnt':
        setPercentAmnt(parseFloat(value));
        break;
      case 'priceChange':
        setRatePriceChange(parseFloat(value));
        break;
      case 'startPrice':
        setStartPrice(parseFloat(value));
        break;
      case 'endPrice':
        setEndPrice(parseFloat(value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    // Starting sell price
    let currentPrice = startPrice;
    // Remaining amount of asset, starts at the total asset amount the user entered
    let remainingAsset = totalAmnt;
    // Starting asset amount to be sold. Will be updated in the while loop
    let sellAmnt = totalAmnt * percentAmnt;
    // Running total of gross profits
    let grossProfits = 0;
    // Index variable for the newly added calculations
    const index = allPredicts.length;

    // run loop to calculate total profit
    while(currentPrice <= endPrice){
      // Calculate running total
      grossProfits = (grossProfits) + (sellAmnt * currentPrice);

      // Calculate remaining asset amount
      remainingAsset = remainingAsset - sellAmnt;

      // Calculate new sell amount
      sellAmnt = remainingAsset * percentAmnt;

      // Increment priceChange
      currentPrice += ratePriceChange;
    }

    // Obj for results
    const results = {
      totalAmnt: totalAmnt, // Starting total asset amount
      remainingAmnt: remainingAsset.toFixed(2), // Remaining asset amount
      percentAmnt: (percentAmnt * 100).toFixed(2), // percent of asset to be sold at each price level
      ratePriceChange: ratePriceChange.toFixed(2),
      startPrice: startPrice.toFixed(2), // Starting price level
      endPrice: endPrice.toFixed(2), // Ending price level
      grossProfit: grossProfits.toFixed(2), // Gross profits
    };

    // Update state array to store calculated results
    setAllPredicts((prevCalc) => [...prevCalc, {
      totalAmnt: totalAmnt, // Starting total asset amount
      remainingAmnt: remainingAsset, // Remaining asset amount
      percentAmnt: percentAmnt, // percent of asset to be sold at each price level
      ratePriceChange: ratePriceChange.toFixed(2),
      startPrice: startPrice, // Starting price level
      endPrice: endPrice, // Ending price level
      grossProfit: grossProfits, // Gross profits
    }]);

    // Create a new form body with the current calculation
    const newFormBody = (
        <div className="profitOutputBody" key={index}>
          <ul>
            <li>
              <strong>Starting Asset Balance:</strong>
              <input type="text" value={`$${results.totalAmnt}`} disabled />
            </li>
            <li>
              <strong>Remaining Asset Balance:</strong>
              <input type="text" value={`${results.remainingAmnt}`} disabled />
            </li>
            <li>
              <strong>Percent of asset to be sold:</strong>
              <input type="text" value={`${results.percentAmnt}%`} disabled />
            </li>
            <li>
              <strong>Price Increment:</strong>
              <input type="text" value={`$${results.ratePriceChange}`} disabled />
            </li>
            <li>
              <strong>Starting Sell Price:</strong>
              <input type="text" value={`$${results.startPrice}`} disabled />
            </li>
            <li>
              <strong>Ending Sell Price:</strong>
              <input type="text" value={`$${results.endPrice}`} disabled />
            </li>
            <li>
              <strong>Gross Profits:</strong>
              <input type="text" value={`$${results.grossProfit}`} disabled />
            </li>
          </ul>
        </div>
    );

    // Update the use state
    setAllFormBodies((prevFormBodies) => [...prevFormBodies, newFormBody]);

    // Reset inputs to placeholder values
    handleResetValues();
  };

  // Reset back to the default values for the next calculation. Add previous calculation to the array.
  const handleResetValues = () => {

    // Get the input IDs
    let inputTotal = document.getElementById("totalAmnt");
    let inputPercent = document.getElementById("percentAmnt");
    let inputPriceChange = document.getElementById("priceChange");
    let inputStartP = document.getElementById("startPrice");
    let inputEndP = document.getElementById("endPrice");

    // reset the input fields and show their defaults
    inputTotal.value = "";
    inputTotal.placeholder = "Total Asset Amount";

    inputPercent.value = "";
    inputPercent.placeholder = "Percent of asset to be sold";

    inputPriceChange.value = "";
    inputPriceChange.placeholder = "Price increment";

    inputStartP.value = "";
    inputStartP.placeholder = "Price to start selling";

    inputEndP.value = "";
    inputEndP.placeholder = "Ending sell price";
  };

  return(
      <div>
        <div className="formContainer">
          <div className="spacer"></div>
          <div className="formBody"> {/* Start of form */}
            <h1>Gross Profit Calculator</h1>
            <div className="inputForm">
              {/* Total amount to be sold */}
              <input  type="text"
                      id="totalAmnt"
                      placeholder="Total Asset Amount"
                      autoComplete="off"
                      onChange={handleInputChange}
              />
              {/* The % of the total amount to be sold */}
              <input  type="text"
                      id="percentAmnt"
                      placeholder="Percent of asset to be sold"
                      autoComplete="off"
                      onChange={handleInputChange}
              />
              {/* Price increment. Rate at which price will change */}
              <input type="text"
                     id="priceChange"
                     placeholder="Price increment"
                     autoComplete="off"
                     onChange={handleInputChange}
              />
              {/* starting price to be sold at */}
              <input  type="text"
                      id="startPrice"
                      placeholder="Starting sell price"
                      autoComplete="off"
                      onChange={handleInputChange}
              />
              {/* ending price prediction */}
              <input  type="text"
                      id="endPrice"
                      placeholder="Ending sell price"
                      autoComplete="off"
                      onChange={handleInputChange}
              />
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div> {/* End of form */}
          <div className="spacer"></div>
        </div>
        <div className="formContainer">
          {/* Display calculated information */}
          <div className="formBodiesContainer">
            {allFormBodies.map((formBody, index) => (
                <React.Fragment key={index}>{formBody}</React.Fragment>
            ))}
          </div>
        </div>
      </div>
  );
}