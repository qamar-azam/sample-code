import React from 'react'
import { injectIntl } from 'react-intl'
import { commarize } from '../../common/Util'
import { StatisticsList } from '../../components/statistics-list'

import {
  faSmile,
  faUsers,
  faUserClock,
  faStar
} from '@fortawesome/free-solid-svg-icons'

const Statistics = props => {
  let { intl, data } = props

  if (data === undefined || JSON.stringify(data) == '{}') {
    return null
  }

  let totalInteraction =
    data.interactions.favorites_count + data.interactions.retweets_count

  let positiveValue = 0,
    negativeValue = 0,
    totalValue = 0,
    netSentiment = ''
  data.overall_sentiment_stats.map(sentiment => {
    totalValue += sentiment.value
    if (sentiment.name === 'Negative') {
      negativeValue = sentiment.value
    }
    if (sentiment.name === 'Positive') {
      positiveValue = sentiment.value
    }
  })

  totalValue = ((positiveValue - negativeValue) / totalValue) * 100
  if (totalValue >= -100 && totalValue <= -50) {
    netSentiment = 'Negative'
  } else if (totalValue >= -49 && totalValue <= 50) {
    netSentiment = 'Neutral'
  } else if (totalValue >= 51 && totalValue <= 100) {
    netSentiment = 'Positive'
  }

  let responseRate =
    (data.questions.response_rate[0].value / data.questions.total_questions) *
    100
  let avgResponse = data.questions.response_avg_time.split(':')
  let totalPeople = commarize(data.total_people)

  const statisticsData = [
    {
      title: 'Rating',
      value: '4.2',
      icon: faStar,
      color: 'yellow'
    },
    {
      title: 'Total Number of ratings',
      value: totalPeople,
      icon: faUsers,
      color: 'orange'
    },
    {
      title: 'Total People',
      value: totalPeople,
      icon: faUsers,
      color: 'black'
    },
    {
      title: 'Net Sentiment',
      value: netSentiment,
      icon: faSmile,
      color: 'green'
    },
    {
      title: 'Response Rate',
      value: intl.formatNumber(responseRate) + '%',
      icon: faUserClock,
      color: 'blue'
    }
  ]

  return <StatisticsList title={props.title} data={statisticsData} />
}

export default injectIntl(Statistics)
