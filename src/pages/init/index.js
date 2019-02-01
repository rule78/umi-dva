import { Component } from 'react';
import resloader from 'resloader';
import { imageData } from './mock'
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
    this.setState({proExtrendClass: 'progress--active'})
    setTimeout(()=>{ this.reload()}, 2000)
  }
  reload(){
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
  };
  render() {
    const { barExtrendClass, proExtrendClass, percent } = this.state
    let barClass = `progress__bar ${barExtrendClass}`
    let proClass = `progress ${proExtrendClass}`
    return (
        <div className='InitLoading'>
        <span className="progress__text">
          Progress: <em>{percent}%</em>
        </span>
        	<div className="htmleaf-content">
            <div className={proClass}>
              <div className={barClass} style={{width:`${parseInt(percent)}%`}}>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default InitLoading