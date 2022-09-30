// Imports
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Styles imports
import '../styles/Form.scss';
import BreakDown from './BreakDown';
const InputForm = () => {
  const [salary, setSalary] = useState(0);
  //   react-hook-form hook
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({ mode: 'onChange' });

  // Submit form data to be calculated
  const onSubmit = (data) => {
    setSalary(data.salary);
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter your salary"
          className="form__input"
          {...register('salary')}
        />
        <button
          type="submit"
          className="form__btn"
          disabled={!isDirty || !isValid}
        >
          Calculate
        </button>
      </form>
      <BreakDown salary={Number(salary)} />
    </>
  );
};

export default InputForm;
