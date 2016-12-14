require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import FigureImgComponent from './FigureImgComponent';
import ControllerComponent from './ControllerComponent'
let imgData = require('../data/imgData.json');
import {randRange,randDeg} from '../utilities/index'
imgData = imgData.map((data) => {
  data.imgUrl = require('../images/'+ data.fileName);
  return data;
});

class AppComponent extends React.Component {
  constructor(props){
    super(props);
    this.Constant = {
      centerPos: { //中央位置
        left: 0,
        right: 0
      },
      hPosRange: { //水平方向（左部和右部区域）的取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: { //垂直方向（上部）
        topX: [0, 0],
        topY: [0, 0]
      }
    };

    this.state = {
      imgsArrangeArr: []
    };
  }

  inverse(index){
    let imgsArrange = this.state.imgsArrangeArr;
    imgsArrange[index].isInverse = !imgsArrange[index].isInverse;
    this.setState({imgsArrangeArr : imgsArrange});
  }

  center(index){
    this.rearrange(index);
  }

  rearrange(centerIndex){
    let imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.topX,
      imgsArrangTopArr = [],
      topImgNum = Math.floor(Math.random() * 2), //取一个或者不取
      topImgSpiceIndex = 0,
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
    //首先居中centerIndex图片 ,centerIndex图片不需要旋转
      imgsArrangeCenterArr[0] = {
        pos: centerPos,
        rotate: 0,
        isCenter: true
      }
      //取出要布局上测的图片的状态信息
      topImgSpiceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
      imgsArrangTopArr = imgsArrangeArr.splice(topImgSpiceIndex, topImgNum);
      //布局位于上侧的图片
      imgsArrangTopArr.forEach((value, index) => {
        imgsArrangTopArr[index] = {
          pos: {
            top: randRange(vPosRangeTopY[0], vPosRangeTopY[1]),
            left: randRange(vPosRangeX[0], vPosRangeX[1])
          },
          rotate: randDeg(),
          isCenter: false

        };
      });

    //布局左两侧的图片
    for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      let hPosRangeLORX = null;

      //前半部分布局左边,右边部分布局右边
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX
      }
      imgsArrangeArr[i] = {
        pos: {
          top: randRange(hPosRangeY[0], hPosRangeY[1]),
          left: randRange(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate: randDeg(),
        isCenter: false
      };
    }
    if (imgsArrangTopArr && imgsArrangTopArr[0]) {
      imgsArrangeArr.splice(topImgSpiceIndex, 0, imgsArrangTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });

  }

  handleClick(index) {
    let imgsArrange = this.state.imgsArrangeArr;
    let app = this;
    return (e) => {
      if (imgsArrange[index].isCenter) {
        app.inverse(index)
      } else {
        app.center(index);
      }
    }
  }

  componentDidMount() {
    let stageDOM = ReactDOM.findDOMNode(this.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    //拿到一个imgFigure的大小
    let imgW = 280,imgH = 320,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    //计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }
    //console.log(this.Constant.centerPos);
    //计算左侧,右侧区域图片排布的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;
    //计算上测区域图片排布的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

    this.Constant.vPosRange.topX[0] = halfStageW - imgW;
    this.Constant.vPosRange.topX[1] = halfStageW;
    let num = Math.floor(Math.random() * 10);
    this.rearrange(num);
  }

  render() {
    return (
      <div className="stage" ref={(stage) => { this.stage = stage; }}>
        <div className="front">
          {
            imgData.map( (data,index) => {
              if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                  pos: {
                    left: 0,
                    top: 0
                  },
                  rotate: 0,
                  isInverse: false,
                  isCenter: false
                }
              }

              return <FigureImgComponent key={index} data={data}  arrange={this.state.imgsArrangeArr[index]} handleClick={this.handleClick(index)}/>
            })
          }
        </div>
        <div className="controller">
          {
            imgData.map( (data,index) => {
              if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                  pos: {
                    left: 0,
                    top: 0
                  },
                  rotate: 0,
                  isInverse: false,
                  isCenter: false
                }
              }

              return <ControllerComponent key={index} index={index} data={data} arrange={this.state.imgsArrangeArr[index]} handleClick={this.handleClick(index)} />
            })
          }
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
