import { Component } from 'react';
import resloader from 'resloader';
//import { imageData } from './mock'
import './index.scss'
let orange = 30, yellow = 75, green = 85
class InitLoading extends Component{
  constructor(props) {
    super(props);
    this.state = {
      barExtrendClass: '',
      proExtrendClass: '',
      percent: 0
    };
  }
  componentDidMount(){
    const _this = this
    this.setState({proExtrendClass: 'progress--active'})
    setTimeout(()=>{ this.reload()}, 5000)
  }
  reload(){
    const imageData = ['http://imgs.gmilesquan.com/XtjzNAsj.jpg?imageView2/0/f',
  'http://imgs.gmilesquan.com/KGjjQhlD.png?imageView2/0/f',
  'http://imgs.gmilesquan.com/NZCBusqM.jpg?imageView2/0/f',
  '//imgs.gmilesquan.com//uLTGkXHQ.png?imageView2/0/format/png',
  'https://img.alicdn.com/i1/2375659788/TB2TnMBC1GSBuNjSspbXXciipXa_!!2375659788.jpg_300x300q90.jpg',
  'https://img.alicdn.com/i4/3121904393/TB2sY8LxTtYBeNjy1XdXXXXyVXa_!!3121904393.jpg_300x300q90.jpg']
      const _this = this
    const options = {
      resources: imageData,
      onStart: function (total) {
        console.log('onStart:' + total)
      },
      onProgress: function (currentIndex, total) {
        const progress = parseFloat(currentIndex/total)*100
        console.log('onComplete:' + parseInt(progress))
        _this.updateProgress(parseInt(progress))
      },
      onComplete: function (total, result) {
        console.log('onComplete:' + total)
      }
    }
    resloader(options);
  }
  updateProgress( percent ) {
    let barClass = ''
    if (percent >= 100) {
      barClass = 'progress__bar--blue'
    }else if (percent >= yellow) {
      barClass = 'progress__bar--yellow'
    }else if (percent >= orange) {
      barClass = 'progress__bar--orange'
    }
    this.setState({
      percent: percent,
      barExtrendClass: barClass
    })
    console.log(percent, 'percent')
  };
  render() {
    const { barExtrendClass, proExtrendClass, percent } = this.state
    let barClass = `progress__bar ${barExtrendClass}`
    let proClass = `progress ${proExtrendClass}`
    return (
        <div className='InitLoading'>
        	<div className="htmleaf-content">
            <div className={proClass}>
              <div className={barClass} style={{width:`${parseInt(percent)}%`}}>
                <span className="progress__text">
                  Progress: <em>{percent}%</em>
                </span>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default InitLoading