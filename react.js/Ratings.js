import React, { useEffect, useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'

// Api
import {
  getSocialMediaStats,
  getMonitorStats,
  getFacebookStats
} from './RatingsApi'

// Tab Pages
import AllTab from './tabs/All'
import GoogleMap from './tabs/GoogleMap'
import FourSquare from './tabs/FourSquare'

// Fontawesome icons
import {
  faGoogle,
  faFoursquare,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'

// Subheader
import SubHeader from '../../layout/header/sub-header/index'

// Helper
import { processResult, isEmpty } from '../../common/Util'

const Ratings = () => {
  const [allData, setData] = useState({})
  const [googleMapData, setGoogleMapData] = useState({})
  const [foursquareData, setFoursquareData] = useState({})

  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('1')

  const handleActiveTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
      setIsLoading(false)

      if (tab === '1' && isEmpty(allData)) {
        fetchAllData()
      } else if (tab === '2' && isEmpty(googleMapData)) {
        fetchGoogleMapData()
      } else if (tab === '3' && isEmpty(foursquareData)) {
        fetchFoursquareData()
      }
    }
  }

  const fetchAllData = () => {
    setIsLoading(true)
    getSocialMediaStats(1).then(result => {
      if (
        result !== undefined &&
        !isEmpty(result.data) &&
        result.msg === undefined
      ) {
        let data = processResult(result)
        setData(data)
        setIsLoading(false)
      }
    })
  }

  const fetchGoogleMapData = () => {
    setIsLoading(true)
    getMonitorStats(1).then(result => {
      if (
        result !== undefined &&
        !isEmpty(result.data) &&
        result.msg === undefined
      ) {
        let data = processResult(result)
        setGoogleMapData(data)
        setIsLoading(false)
      }
    })
  }

  const fetchFoursquareData = () => {
    setIsLoading(true)
    getFacebookStats(1).then(result => {
      if (JSON.stringify(result.data) !== '{}' && result.msg === undefined) {
        setFoursquareData(result.data)
        setIsLoading(false)
      }
    })
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  return (
    <>
      <SubHeader activeTabValue="Ratings" activeFilterTab={activeTab} />
      <div className="tab-wrap clearfix">
        <div className="col-sm-8">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  handleActiveTab('1')
                }}
              >
                All
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  handleActiveTab('2')
                }}
              >
                <FontAwesomeIcon icon={faGoogle} />
                Google Map
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => {
                  handleActiveTab('3')
                }}
              >
                <FontAwesomeIcon icon={faFoursquare} />
                Foursquare
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <AllTab data={allData} isLoading={isLoading} />
        </TabPane>
        <TabPane tabId="2">
          <GoogleMap data={googleMapData} isLoading={isLoading} />
        </TabPane>
        <TabPane tabId="3">
          <FourSquare data={foursquareData} isLoading={isLoading} />
        </TabPane>
      </TabContent>
    </>
  )
}

export default Ratings
