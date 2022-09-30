import { Table } from 'react-bootstrap';

const TaxBracket = ({ brackets, salary }) => {
  return (
    <>
      <h1>TaxBracket</h1>
      <Table striped bordered hover>
        <thead>
          <th>Tax Bracket</th>
          <th>TaxRate</th>
          <th>Amount Taxable</th>
          <th>Amount Payable</th>
        </thead>
        <tbody>
          {brackets.map((item, index) => {
            return (
              <tr key={index}>
                {!item.max ? (
                  <td>${item.min.toLocaleString()} +</td>
                ) : (
                  <td>
                    ${item.min.toLocaleString()} - ${item.max.toLocaleString()}
                  </td>
                )}
                <td>{Math.floor(item.rate * 100)} % </td>
                <td>
                  {salary > item.max
                    ? `$${Math.floor(item.max - item.min).toLocaleString()}`
                    : salary > item.min
                    ? `$${Math.floor(salary - item.min).toLocaleString()}`
                    : '$0'}
                </td>

                <td style={{ background: '#00D22F' }}>
                  {salary > item.max
                    ? `$${Math.floor(
                        (item.max - item.min) * item.rate
                      ).toLocaleString()}`
                    : salary > item.min
                    ? `$${Math.floor(
                        (salary - item.min) * item.rate
                      ).toLocaleString()}`
                    : '$0'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TaxBracket;
