import React from 'react'
import {connect} from '@cerebral/react'
import Gradient from 'tinygradient';

import styles from './index.module.css'
import computedAuditScore from '../../../common/computed/auditorScore.js';
import {auditorRatings, auditorRatingColorScale} from '../../../config.js';

let ColorScale = Gradient(auditorRatingColorScale).rgb(101).reverse();
const increment = 100.0 / auditorRatings.length;

class RatingBar extends React.Component {
  render() {
    var desc = auditorRatings[auditorRatings.length-1];
    for (let i=auditorRatings.length; i>0; i--) {
      if (this.props.score <= i*increment) {
        desc = auditorRatings[i-1];
      }
    }
	console.log(this.props.score)
    var barColor = ColorScale[parseInt(this.props.score, 10)].setAlpha(0.6).toRgbString();
    return (
      <div className={styles.ratingBar}>
        <div className={styles.rating} style={{width: this.props.score+'%', backgroundColor: barColor}}>
          <div className={styles.ratingLabel}>{desc}</div>
        </div>
      </div>
    )
  }
}

export default connect({
  score: computedAuditScore
},
class Auditor extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.title}>
          {this.props.auditor.name + ' from ' + this.props.auditor.body}
        </div>
        <div className={styles.ratingContainer}>
          <div>{'Overall Rating:'}</div>
          <RatingBar score={this.props.score} />
        </div>
      </div>
    )
  }
})
