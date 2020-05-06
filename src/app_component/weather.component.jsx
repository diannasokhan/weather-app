import React from "react";

const Weather = (props) => {
    return(
      <div className="container">
          <div className="cards">
              <h1>{props.city}, {props.country}</h1>
              <h2 className="py-4">
                  <i className={`wi ${props.icon}display-1`}></i>
              </h2>
              <h3 className="py-2">{props.celsius}&deg;</h3>
              {minMaxTemp(props.temp_min, props.temp_max)}
              <h5 className="py-2">{props.description}</h5> 
          </div>
      </div>  
    );
};

function minMaxTemp(min, max){
    return (
        <h4>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
        </h4>
    )
}

export default Weather;