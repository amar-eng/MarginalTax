import { useState, useEffect } from 'react';
// import axios from 'axios';
const BreakDown = ({ salary }) => {
  const APIURL = 'http://localhost:5001/tax-calculator/brackets/2019';

  // logic to calculate marginal tax
  const [tax, setTax] = useState(0);
  const [effectiveTax, setEffectiveTax] = useState(0);

  // fetch tax brackets
  const [brackets, setBrackets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBrackets = async () => {
      fetch(APIURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Could not fetch the data for that resource');
          }
          return response.json();
        })
        .then((data) => {
          setBrackets(data.tax_brackets);
          setLoading(true);
        }),
        (error) => {
          setError(error);
          setLoading(true);
        };
    };
    fetchBrackets();
  }, [APIURL]);

  useEffect(() => {
    let tax = 0;
    let remainingSalary = salary;
    for (let i = 0; i < brackets.length; i++) {
      if (remainingSalary > brackets[i].max) {
        tax += (brackets[i].max - brackets[i].min) * brackets[i].rate;
        remainingSalary -= brackets[i].max - brackets[i].min;
      } else {
        tax += remainingSalary * brackets[i].rate;
        remainingSalary = 0;
      }
    }
    setTax(tax);
    setEffectiveTax((tax / salary) * 100);
  }, [salary, brackets, setEffectiveTax]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!salary && !loading) {
    return <div>Loading please wait ...</div>;
  }
  return (
    <div className="breakdown">
      <h1>Breakdown</h1>
      {salary > 0 && (
        <>
          <p>Your marginal tax rate is {effectiveTax.toFixed(2)}%.</p>
          <p>You will pay ${tax.toFixed(2)} in taxes.</p>
        </>
      )}
    </div>
  );
};

export default BreakDown;
