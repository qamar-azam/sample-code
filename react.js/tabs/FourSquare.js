import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'

// Statistics
import Statistics from '../RatingsStatistics'

// Components
import { DataOvertime } from '../../../components/data-overtime'
import { SentimentAnalysisOvertime } from '../../../components/sentiment-analysis-overtime'
import { KeywordCloud } from '../../../components/keyword-cloud'
import { PieChart } from '../../../components/pie-chart'

// Helper
import { isEmpty } from '../../../common/Util'

import PreLoader from '../../../components/pre-loader/PreLoader'

const FourSquare = props => {
  const [dailyInteraction, setDailyInteraction] = useState([])
  const [sentimentStats, setSentimentStats] = useState([])
  const [sentimentTrend, setSentimentTrend] = useState([])
  const [keywords, setKeywords] = useState([])

  useEffect(() => {
    if (!isEmpty(props.data)) {
      let metrics = props.data.Metrics
      setDailyInteraction(metrics.Interactions)
      setSentimentStats(metrics.Sentiment_Analysis)
      setSentimentTrend(metrics.Sentiment_Trend)
      setKeywords(metrics.Top_Keywords)
    }
  }, [props.data])

  if (props.isLoading) {
    return <PreLoader />
  }

  return (
    <>
      <Statistics title="Overview" />
      <DataOvertime
        title="Metrics"
        subTitle="Interactions Overtime"
        data={dailyInteraction}
      />

      <Row>
        <Col sm={4}>
          <PieChart
            subTitle="Sentiment Analysis"
            data={sentimentStats}
            color={['#89BB2A', '#E50035', '#F9A700']}
          />
        </Col>

        <Col sm={8}>
          <SentimentAnalysisOvertime
            subTitle="Sentiment Trend"
            data={sentimentTrend}
          />
        </Col>
      </Row>

      <KeywordCloud subTitle="Top Keywords" data={keywords} />
    </>
  )
}

export default FourSquare
