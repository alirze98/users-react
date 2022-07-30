const Input = ({id,name,value,onChange,htmlFor,label}) => {
    return ( 
         <div className="mb-3">
          <label htmlFor={htmlFor}>{label}:</label>
          <input
            id={id}
            name={name}
            className="form-control"
            type="text"
            value={value}
            onChange={onChange}
          />
        </div>
     );
}
 
export default Input;