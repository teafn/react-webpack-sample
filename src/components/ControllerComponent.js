'use strict';

import React from 'react';

require('styles/controller.scss');

let ControllerComponent = ({arrange,index,handleClick}) => {

    let className = arrange.isCenter? 'point center ': 'point ';
    className += arrange.isInverse? 'inverse ': '';

    return (
      <span className={className} onClick={ e => {
         e.stopPropagation();
         e.preventDefault();
         handleClick(index);
       }}>{index}</span>
    );

}

ControllerComponent.displayName = 'ControllerComponent';

// Uncomment properties you need
// ControllerComponent.propTypes = {};
// ControllerComponent.defaultProps = {};

export default ControllerComponent;
