import React,{useState} from 'react';

function Counter()

{
  const [count,setCount]= useState(0);
  const[inputValue,setInputValue]=useState('');

  function handleIncrement()
  {
      setCount(count+1);
  }

  const handleDecrement=()=>{
    setCount(count-1);
  }

  const handleReset=()=>{
      setCount(0);

  }
  const handleSetCount=()=>{
    const value=Number(inputValue);
    if(!isNaN(value))
    {
      setCount(value);
      setInputValue('');
    }
    else
    {
      alert('Enter right value');
    }
  }
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>React Counter App </h1>
        <h2 style={styles.count}>Counts:{count}</h2>
        <div style={styles.buttons}>
          <button onClick={handleIncrement} style={styles.btn}>Increment</button>
          <button onClick={handleReset} style={styles.btn}>Reset</button>
          <button onClick={handleDecrement} style={styles.btn}>Decrement</button>
        </div>
         <div style={styles.inputContainer}>
          <input 
          type='number'
          value={inputValue}
          placeholder='Set Count Value'
          onChange={(e)=>setInputValue(e.target.value)}
          style={styles.input}
          />
          <button onClick={handleSetCount} style={styles.setBtn}>Set Count</button>
         </div>

      </div>
    )
}

const styles={
  container:{
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial",
  },
  heading: {
    color: "#333",
  },
  count: {
    fontSize: "28px",
    margin: "20px 0",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  btn: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    width: "150px",
  },
  setBtn: {
    padding: "8px 16px",
    fontSize: "16px",
    cursor: "pointer",
  },
};


export default Counter;

