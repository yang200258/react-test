import { useCallback, useRef, useState, useEffect } from 'react';
const Child = ({
  cRef,
}) => {
  const [value, setValue] = useState('');
  
  const getVal = useCallback(() => {
    return value;
  }, [value])

  useEffect(() => {
    if (cRef?.current) {
      cRef.current.getVal = getVal;
    }
  }, [getVal])

  const handleChange = (e) => {
    const value = e.target.value
    setValue(value)
  }

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  )
}


const Parent = () => {
  const cRef = useRef({});
  return (
    <div>
      <Child cRef={cRef} />
      <button onClick={() => alert(cRef.current.getVal())}>获取子组件状态</button>
    </div>

  )
}

export default Parent;