import React from 'react';
import './index.scss'
export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0 };
  }
  componentDidMount(){
    const { time } = this.props
    let nowTime = time ? 1000 * parseInt(time): 30000;
    this.setState({ lastTime: nowTime, total: nowTime/1000 }, ()=>{ this.setTime()})
  }
  componentWillReceiveProps(nextProps){
    const { time } = nextProps
    if(time != this.props.time && time != 0){
      let nowTime = time ? 1000 * parseInt(time): 30000;
      this.setState({ lastTime: nowTime, total: nowTime/1000 }, ()=>{ this.setTime()})
    }
  }
  setTime() {
    const { onTimeout, cutdowm } = this.props
    const { lastTime } = this.state
    let _this = this
    setTimeout(() => {
      if (lastTime > 0 && !cutdowm) {
        let hours = parseInt((lastTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = parseInt((lastTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = parseInt((lastTime % (1000 * 60)) / 1000);
        _this.setState({
          lastTime: lastTime - 1000,
          hours: `${hours}`,
          minutes: `${minutes}`,
          seconds: `${seconds}`
        })
        _this.setTime()
      } else if(!cutdowm){
        _this.setState({ seconds: 0})
        onTimeout && onTimeout()
      }
    }, 1000)
  }
  formatSeconds(seconds){
    const { total } = this.state
    let initDeg = [];
    if(seconds > total/2){
      initDeg[0] = 360*parseInt(seconds)/total -270
      initDeg[1] = 270
      initDeg[2] = '#FF5C30'
    }else{
      initDeg[0] = 90
      initDeg[1] = 360*parseInt(seconds)/total + 90
      initDeg[2] = '#fff'
    }
    return initDeg
  }
  render() {
    const { seconds } = this.state
    let progressStyle = {
        backgroundImage: `linear-gradient(${this.formatSeconds(seconds)[0]}deg, ${this.formatSeconds(seconds)[2]} 50%, transparent 50%, transparent),`+
        `linear-gradient(${this.formatSeconds(seconds)[1]}deg, #FF5C30 50%, #fff 50%, #fff)`
    }
    return (
        <div className="progress-radial" style={progressStyle}>
        <div className="text">{seconds}</div></div>
    );
  }
};