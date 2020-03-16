import React, { useState, useEffect } from 'react'
import { Col, Row } from 'reactstrap'

// Helper
import { isEmpty } from '../../../common/Util'

import Statistics from '../RatingsStatistics'

// Components
import { DataOvertime } from '../../../components/data-overtime'
import { PieChart } from '../../../components/pie-chart'
import { SentimentAnalysisOvertime } from '../../../components/sentiment-analysis-overtime'
import { MediaTw } from '../../../components/media'
import { KeywordCloud } from '../../../components/keyword-cloud'
import { AuthorList } from '../../../components/author-list'
import ThemesTrends from '../../../components/themes-trends/ThemesTrends'
import PreLoader from '../../../components/pre-loader/PreLoader'
import { Rating } from '../../../components/rating'

const GoogleMap = props => {
  const [data, setData] = useState({})
  const [dailyInteraction, setDailyInteraction] = useState([])
  const [sentimentOverTime, setSentimentOverTime] = useState({})
  const [sentimentStats, setSentimentStats] = useState([])
  const [topKeyword, setKeyword] = useState([])

  useEffect(() => {
    if (!isEmpty(props.data)) {
      let data = props.data
      setData(data)
      setDailyInteraction(data.daily_interactions)
      setSentimentOverTime(data.overallsentiment_overtime)
      setSentimentStats(data.overall_sentiment_stats)
      setKeyword(data.statistics.TopKeywords)
    }
  }, [props.data])

  if (props.isLoading) {
    return <PreLoader />
  }
  return (
    <>
      <Statistics title="Overview" data={data} />
      <DataOvertime
        title="Metrics"
        subTitle="Interactions Overtime"
        data={dailyInteraction}
      />

      <Rating subTitle="Top Rating" />

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
            subTitle="Sentiment Overtime"
            data={sentimentOverTime}
          />
        </Col>
      </Row>

      <KeywordCloud subTitle="Top Keywords" data={topKeyword} />
    </>
  )
}

export default GoogleMap
