import { Container } from 'react-bootstrap';
import InputForm from './components/InputForm';
function App() {
  return (
    <Container
      className="bg-light"
      style={{
        fontFamily: 'Quicksand',
        fontSize: '1.5rem',
        color: '#3b2121',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Tax Calculator</h1>
      <h4>Find out how much you have to pay in taxes</h4>
      <InputForm />
    </Container>
  );
}

export default App;
