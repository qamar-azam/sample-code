import React, { useState, useEffect } from 'react'
import { Col, Row } from 'reactstrap'

// Components
import { DataOvertime } from '../../../components/data-overtime'
import { SentimentAnalysisOvertime } from '../../../components/sentiment-analysis-overtime'
import { KeywordCloud } from '../../../components/keyword-cloud'
import { PieChart } from '../../../components/pie-chart'
import { Rating } from '../../../components/rating'

// Preloader
import PreLoader from '../../../components/pre-loader/PreLoader'

// Helper
import { isEmpty } from '../../../common/Util'

// Statistics
import Statistics from '../RatingsStatistics'
import LocationsMap from '../../../components/locations-map/LocationsMap'

const All = props => {
  const [data, setData] = useState({})
  const [dailyInteraction, setDailyInteraction] = useState([])
  const [sentimentOverTime, setSentimentOverTime] = useState({})
  const [sentimentStats, setSentimentStats] = useState([])
  const [topKeyword, setKeyword] = useState([])

  useEffect(() => {
    if (!isEmpty(props.data)) {
      setData(props.data)
      setDailyInteraction(props.data.daily_interactions)
      setSentimentOverTime(props.data.overallsentiment_overtime)
      setSentimentStats(props.data.overall_sentiment_stats)
      setKeyword(props.data.statistics.TopKeywords)
    }
  }, [props.data])

  if (props.isLoading === true) {
    return <PreLoader />
  }
  return (
    <>
      <Statistics title="Overview" data={data} />
      <DataOvertime
        title="Metrics"
        subTitle="Interactions"
        data={dailyInteraction}
      />

      <Rating subTitle="Top Rating" />

      <LocationsMap subTitle={'Locations Map'} />

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
            data={sentimentOverTime}
          />
        </Col>
      </Row>

      <KeywordCloud subTitle="Top Keywords" data={topKeyword} />
    </>
  )
}

export default All
