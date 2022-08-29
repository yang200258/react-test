import React, { useCallback, useImperativeHandle, useState, useRef } from 'react';
// forwardRef： 将父类的ref作为参数传入函数式组件中
// **useImperativeHandle:**在函数式组件中，用于定义暴露给父组件的ref方法，用来限制子组件对外暴露的信息，只有useImperativeHandle第二个参数定义的属性跟方法才可以在父组件获取到
const ChildInput = React.forwardRef((props, ref) => {

  const [value, setValue] = useState('');
  useImperativeHandle(ref, () => ({
    getVal,
  }));
  const getVal = useCallback(() => {
    return value;
  }, [value]);

  const handleChange = (e) => {
    const value = e.target.value
    setValue(value)
  }

  return (
    <input type="text" value={value} onChange={handleChange} />
  )
});

const Parent = () => {
  const cRef = useRef({});
  return (
    <div>
      <ChildInput ref={cRef} />
      <button onClick={() => alert(cRef.current.getVal())}>获取子组件状态</button>
    </div>

  )
}

export default Parent;
