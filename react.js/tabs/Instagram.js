import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { FormattedMessage, FormattedDate, injectIntl } from 'react-intl'

// Statistics
import Statistics from '../RatingsStatistics'

// Components
import { DataOvertime } from '../../../components/data-overtime'
import { SentimentAnalysisOvertime } from '../../../components/sentiment-analysis-overtime'
import { MediaInsta } from '../../../components/media'
import { KeywordCloud } from '../../../components/keyword-cloud'
import { PieChart } from '../../../components/pie-chart'
import { sliceData } from '../../../common/Util'
import { Entities } from '../../../components/entities'
import PreLoader from '../../../components/pre-loader/PreLoader'

const Instagram = props => {
  const [data, setData] = useState({})
  const [dailyInteraction, setDailyInteraction] = useState([])
  const [sentimentStats, setSentimentStats] = useState([])
  const [sentimentOverTime, setSentimentOverTime] = useState({})
  const [dialects, setDialects] = useState([])
  const [hashtag, setHashtag] = useState([])
  const [keyword, setKeyword] = useState([])
  const [topImages, setTopImages] = useState([])
  const [topVideos, setTopVideos] = useState([])
  const [entities, setEntities] = useState([])
  const [interactions, setInteractions] = useState([])
  const [totalEngagement, setTotalEngagement] = useState([])

  useEffect(() => {
    if (JSON.stringify(props.data) !== '{}') {
      let data = props.data
      let interactions = [
        { name: 'Like', value: data.interactions.likes_count },
        { name: 'Comments', value: data.interactions.comments_count }
      ]

      setData(data)
      setDailyInteraction(data.daily_interactions)
      setSentimentOverTime(data.overallsentiment_overtime)
      setDialects(sliceData(data.statistics.Dialects))
      setTopImages(data.statistics.TopImages)
      setTopVideos(data.statistics.TopVideos)
      setEntities(data.statistics.named_entities)
      setHashtag(data.statistics.ActiveHashtags)
      setKeyword(data.statistics.TopKeywords)
      setSentimentStats(data.overall_sentiment_stats)
      setInteractions(interactions)
      setTotalEngagement(
        data.interactions.likes_count + data.interactions.comments_count
      )
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
            subTitle="Sentiment Overtime"
            data={sentimentOverTime}
          />
        </Col>
      </Row>

      <Row>
        <Col sm={4}>
          <PieChart subTitle="Dialects" data={dialects} />
        </Col>
        <Col sm={8}>
          <Entities subTitle={'Top Entities'} data={entities} />
        </Col>
      </Row>

      <Row>
        <Col sm={4}>
          <PieChart
            subTitle={props.intl.formatMessage({ id: 'Engagement_Types' })}
            data={interactions}
            color={['#E86161', '#009CDC']}
            totalValue={totalEngagement}
            totalPreText={'Total number of engagements:'}
          />
        </Col>

        <Col sm={8}>
          <KeywordCloud subTitle="Top Keywords" data={keyword} />
        </Col>
      </Row>

      <KeywordCloud subTitle="Top Hashtags" data={hashtag} />

      <MediaInsta subTitle="Top Videos" data={topVideos} />

      <MediaInsta subTitle="Top Images" data={topImages} />
    </>
  )
}

export default injectIntl(Instagram)
