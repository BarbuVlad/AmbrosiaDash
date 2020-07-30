import React,{useState} from 'react';
import Select from 'react-select';


const options = [
    { value: -1, label: 'None' },
    { value: 0, label: 'Place Markers' },
    { value: 1, label: 'Place Zone' },
];

let  DropDownMenu =()=> {

  const[selectedOption,setSelectedOption] = useState(-1)
    const handleChange = selectedOption => {
      setSelectedOption(selectedOption)
        console.log(`Option selected:`, selectedOption);
    };

        return (
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder={"Options"}
            />
        );

}

export default DropDownMenu