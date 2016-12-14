'use strict';

import React from 'react';

require('styles/FigureImg.scss');

let FigureImgComponent = ({arrange,data,index,handleClick}) => {

  let styleObj = {};

  if (arrange.pos) {
    styleObj = arrange.pos;
  }

  if (arrange.rotate) {
    (['Moz', 'Ms', 'Webkit', '']).forEach((value) => {
      styleObj[value + 'Transform'] = 'rotate(' + arrange.rotate + 'deg)';
    })
  }

  if (arrange.isCenter) {
    styleObj.zIndex = 11;
  }

  let imgFigureClassName = 'figure';
  imgFigureClassName += arrange.isInverse ? ' inverse ' : '';

  return (
    <div className={imgFigureClassName} style={styleObj} onClick={ e => {
         e.stopPropagation();
         e.preventDefault();
         handleClick(index);
       }}>
      <img src={data.imgUrl} alt=""/>
      <div className="figure-text">
        <h2>{data.title}</h2>
        <div className="figure-back">{data.desc}</div>
      </div>
    </div>
  );

}

FigureImgComponent.displayName = 'FigureImgComponent';

// Uncomment properties you need
// FigureImgComponent.propTypes = {};
// FigureImgComponent.defaultProps = {};

export default FigureImgComponent;
