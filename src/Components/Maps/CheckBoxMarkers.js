import React, {useState} from "react";// eslint-disable-next-line
import {Multiselect} from "multiselect-react-dropdown";
const markerOption=[
    {id: 0,name :'Red'},
    {id: 1, name :'Blue'},
    {id: 2, name :'Yellow'},
    {id: 3, name :'Grey'},
    {id: 4, name :'Zone'},
    {id: 5, name:'Heatmap'}
]
export let markerList=[]; // lista cu tipurile de markerele active, care trebuie sa fie afisate pe ecran

export default function CheckboxMarker() {
    // eslint-disable-next-line
    const [selectedMarkers,setSelectedMakers] = useState(markerOption);

    const onSelect=(selectedMarkers)=>{
        markerList=selectedMarkers;
        console.log(markerList);
    }
    const onRemove=(selectedMarkers)=>{
        markerList=selectedMarkers;
    }
    return(
        <div className={'checkbox1'}>
            <Multiselect
                options={selectedMarkers}
                displayValue="name"
                placeholder={"Select the markers"}
                onSelect={onSelect}
                onRemove={onRemove}

            />
        </div>
    )
}