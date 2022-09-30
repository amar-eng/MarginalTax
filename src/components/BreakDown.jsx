import { useState, useEffect } from 'react';
import TaxBracket from './TaxBracket';

const BreakDown = ({ salary }) => {
  // choose the year 2021 to run the query or change the year to either 2019 or 2020
  const APIURL = 'http://localhost:5001/tax-calculator/brackets/2021';

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
    return <div>Loading tax bracket data please wait ...</div>;
  }

  return (
    <>
      <div className="breakdown">
        {salary > 0 && (
          <>
            <h1>Breakdown</h1>
            <p>
              Your Salary is{' '}
              <span style={{ color: '#00D22F' }}>
                ${salary.toLocaleString()}
              </span>
            </p>
            <p>
              You will pay
              <span style={{ color: 'red' }}>
                ${Math.floor(tax).toLocaleString()}
              </span>
              in taxes which is the total sum of the Amount Payable Column
              (Marginal Tax).
            </p>
            <p>
              Your 2021 effective tax rate is percenatge your Amount payable(
              <span style={{ color: 'red' }}>
                ${Math.floor(tax).toLocaleString()}
              </span>
              ) divided by your pre-tax income (
              <span style={{ color: '#00D22F' }}>
                ${salary.toLocaleString()}
              </span>
              ) which here equals to{' '}
              <span style={{ backgroundColor: 'yellow' }}>
                {effectiveTax.toFixed(2)}%.
              </span>
            </p>
          </>
        )}
      </div>
      {salary > 0 && <TaxBracket salary={salary} brackets={brackets} />}
    </>
  );
};

export default BreakDown;
