import * as React from 'react';
import fn from './functions'

function Color(){
const categories = ['red', 'green', 'yellow', 'blue', 'brown', 'gray', 'purple', 'pink', 'black', 'white']
const [datas, setDatas] = React.useState(Array.apply(null, {length: 40}).map( () => fn.getRandomColor())); // Generate random colors and store it in datas
const [colors, setColors] = React.useState(datas); // Give intial state of random colors
const [darkers, setDarkers] = React.useState([]); // Give intial state of random colors
const [darker, setDarker] = React.useState(false); // Give initial state of darker

React.useEffect(() => {
    setDatas(datas)
}, []) // with [], datas just render one time when page first loaded

React.useEffect(() => {
    if(darker){
        setDarkers(fn.generateDarkerColors(datas))
    }
}, [darker]) // with [darker] dependency, darkers array will be updated only when darker value is changed

  
const handleChooseCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filtered = datas.filter( (data: string) => data.includes(event.target.value) )
    setColors(filtered);
};

const handleClickSaturation = async () => {
    setDarker(!darker);    
};

  return (
    <div>   
        <div>
            <span>Filtered by category  </span>
            <select 
            onChange={handleChooseCategory}
            >
                <option value="">All</option>
                {categories.map( (category: string, index: number) => (
                <option key={index} value={category}>{category}</option>
                ))}
            </select>
        </div>
        <br/>
        <div>
            <input type="checkbox" onChange={handleClickSaturation} /> Darker
        </div>
        <div className="flex-4">
        { 
            darker ?
            darkers.filter( element => element ).map( (color: string, index: number) => (
                <div key={index} className="color-element" style={{ backgroundColor: color }} />
            ))
            :
            colors.map( (color: string, index: number) => (
            <div key={index} className="color-element" style={{ backgroundColor: color }} />
        ))
    }
        </div>
    </div>
  );
}

export default Color;
