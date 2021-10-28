import React,{useState} from 'react';
import Select from 'react-select';


const options = [
    { value: -1, label: 'None' },
    { value: 0, label: 'Place Markers' },
    { value: 1, label: 'Place Zone' },
];
export let opt =-1;
export default function DropDownMenu() {

    const[selectedOption,setSelectedOption] = useState(-1)
    const handleChange = selectedOption => {
        setSelectedOption(selectedOption)
        opt = selectedOption
        console.log(`Option selected:`, selectedOption);
        console.log("OPT: "+ opt.value)
    };

    return (
        <div className={'dropDown1'}>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder={"Options"}

            />
        </div>
    );

}

