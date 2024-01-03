"use client";

import React, {useEffect, useState} from "react";

export default function Home(){

  // Variables to hold user inputted information
  const [totalAmnt, setTotalAmnt] = useState(0);
  const [percentAmnt, setPercentAmnt] = useState(0);
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);
  const [ratePriceChange, setRatePriceChange] = useState(0);

  // State to hold previously calculated scenarios. An array of obj
  const [allPredicts, setAllPredicts] = useState([]);

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
    // User inputted percent of asset to sell
    let userPercent = (percentAmnt/100);
    // Starting sell price
    let currentPrice = startPrice;
    // Remaining amount of asset, starts at the total asset amount the user entered
    let remainingAsset = totalAmnt;
    // Starting asset amount to be sold. Will be updated in the while loop
    let sellAmnt = totalAmnt * userPercent;
    // Running total of gross profits
    let grossProfits = 0;

    if(totalAmnt <= 0){
      return;
    }

    // run loop to calculate total profit
    while(currentPrice <= endPrice){
      // Calculate running total
      grossProfits = (grossProfits) + (sellAmnt * currentPrice);

      // Calculate remaining asset amount
      remainingAsset = remainingAsset - sellAmnt;

      // Calculate new sell amount
      sellAmnt = remainingAsset * userPercent;

      // Increment priceChange
      currentPrice += ratePriceChange;

      console.log("Sell Amnt: ", sellAmnt);
      console.log("Sell Price: ", currentPrice);
      console.log("Remaining Balance: ", remainingAsset);
      console.log("Gross Profit Per Round: ", grossProfits);
    }

    // Update state array to store calculated results
    setAllPredicts((prevCalc) => [...prevCalc, {
      totalAmnt: totalAmnt, // Starting total asset amount
      remainingAmnt: remainingAsset.toFixed(2), // Remaining asset amount
      percentAmnt: percentAmnt, // percent of asset to be sold at each price level
      ratePriceChange: ratePriceChange.toFixed(2),
      startPrice: startPrice.toFixed(2), // Starting price level
      endPrice: endPrice.toFixed(2), // Ending price level
      grossProfit: grossProfits.toFixed(2), // Gross profits
    }]);
  };

  const handleReloadButtonClick = () => {
    window.location.reload();
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
              <button type="submit" onClick={handleReloadButtonClick}>
                Clear Page
              </button>
            </div>
          </div> {/* End of form */}
          <div className="spacer"></div>
        </div>
        <div className="container">
          <div className="spacer"></div>
          <h1>Results Spreadsheet</h1>
          <div className="spacer"></div>
        </div>
        <div className="container">
          <div className="spacer"></div>
          <div className="spreadsheet">
            {/* Display calculated information in a spreadsheet */}
            <table>
              <thead>
              <tr>
                <th>Starting Asset Balance</th>
                <th>Remaining Asset Balance</th>
                <th>Percent To Sell</th>
                <th>Price Increment</th>
                <th>Starting Sell Price</th>
                <th>Ending Sale Price</th>
                <th>Gross Profits</th>
              </tr>
              </thead>
              <tbody>
              {allPredicts.map((result, index) => (
                  <tr key={index}>
                    <td>{result.totalAmnt}</td>
                    <td>{result.remainingAmnt}</td>
                    <td>%{result.percentAmnt}</td>
                    <td>${result.ratePriceChange}</td>
                    <td>${result.startPrice}</td>
                    <td>${result.endPrice}</td>
                    <td>${result.grossProfit}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="spacer"></div>
        </div>
      </div>
  );
}