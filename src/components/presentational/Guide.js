import React, {Component} from 'react';

class Guide extends Component {
  render() {
    return (
      <div className="embed-responsive embed-responsive-16by9">
        <iframe title="guide" className="embed-responsive-item" src="https://www.youtube.com/embed/6Gf_kRE4MJU?controls=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
    )
  }
}

export default Guide;