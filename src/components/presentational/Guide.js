import React, {Component} from 'react';

class Guide extends Component {
  render() {
    return (
      <div className="col-sm-6">
        <iframe title="guide" width="560" height="315" src="https://www.youtube.com/embed/6Gf_kRE4MJU?controls=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullscreen />
      </div>
    )
  }
}

export default Guide;