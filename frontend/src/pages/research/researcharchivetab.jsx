import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import researchStyles from '../../styles/research.module.css'
import VerifiedAxiosInstance from '../../components/auth/authenticatedentrypoint'
import ArticleCard from '../../components/content/articlecard'
import NoDataSkeleton from '../../components/skeleton/nodataskeleton'
import GroupedBarChart from "../../components/charting/barcharts/groupedbar"
import MultiLineChart from '../../components/charting/barcharts/multiline'

import { countArrOcurrences, getDates } from '../../functions/main'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortIcon from '@mui/icons-material/Sort';
import IconButton from '@mui/material/IconButton';

export default function ResearchArchive(props) {
  const [savedarticles, setSavedarticles] = useState()
  const [categorylist, setCategorylist] = useState()
  const [articlecards, setArticlecards] = useState()
  const [datesort, setDatesort] = useState(true) // True indicates most recently added item at top
  const [multilinechartdata, setMultilinechartdata] = useState()
  const [groupedbarchartdata, setGroupedbarchartdata] = useState(new Object())

  var access_token = localStorage.getItem('pilot_access_token')
  const user_id =
    access_token === null ? null : JSON.parse(atob(access_token.split('.')[1]))['user_id']

  function handleSort() {
    setDatesort(!datesort)
    setArticlecards(articlecards.reverse())
  }

  useEffect(() => {
    try {
      VerifiedAxiosInstance.get('research/researcharchive/', {
        params: {
          UserID: user_id
        }
      }).then(response => {
        var data = response.data
        setSavedarticles(data)
        var categories = []
        var counts = {}
        data.map(item => categories.push(...item['Category'].split(' | ')))
        for (const num of categories) {
          var cat_subcat = num.split(' - ')
          var cat = cat_subcat[0]
          var subcat = cat_subcat[1]
          if (num !== 'None') {
            // Ensure that a dict exists
            counts[cat] = counts[cat] ? counts[cat] : { [cat]: 1, all: 1 }
            counts[cat]['name'] = cat
            // Update overall counts
            counts[cat]['all'] = counts[cat]['all'] + 1
            counts[cat][subcat] = counts[cat][subcat] ? counts[cat][subcat] + 1 : 1
          } else {
            cat = 'Uncategorised'
            counts[cat] = counts[cat] ? counts[cat] : { [cat]: 1 }
            counts[cat]['all'] = counts[cat]['all'] ? counts[cat]['all'] + 1 : 1
            counts[cat]['name'] = cat
          }
        }
        var barchartdata = []
        Object.entries(counts).map(item => barchartdata.push(item[1]))
        barchartdata.sort((a, b) => b.all - a.all)
        setGroupedbarchartdata(barchartdata)
        setCategorylist(barchartdata.map(item => item['name']))

        var linechartdata = []
        // Establish date range to todays date minus 7 days
        var daterange = getDates(new Date(new Date().setDate(new Date().getDate() - 7)), new Date()).map(item => item.toISOString().split('T')[0])
        Object.entries(countArrOcurrences(data.map(el => el['DateAdded'].split("T")[0]))).map((el) => daterange.includes(el[0])  
			? linechartdata.push({ date: el[0], value: el[1] }) 
			: null)
        var availdates = linechartdata.map(item => item['date']) 
        daterange.map(item => !availdates.includes(item) ? linechartdata.push({ date: item, value: 0 }) : null)
        linechartdata.sort(function (a, b) { // sort according to yyyy-mm-dd string
          // Turn strings into dates, and then subtract them to get a value that is either negative, positive, or zero.
          return new Date(a.date) - new Date(b.date)
        });

		// Convert linechart data from:
		// [{"date":"2022-06-14","value":0},{"date":"2022-06-15","value":0}]
		// into:
		// {"1900":1016,"1910":1167,"1920":966,"1930":768,"2020":44318}

		var linechartdata_new = {}
		Object.entries(linechartdata).forEach(([key, value]) => {
			var date = value["date"]
			var occurence = value["value"]
			linechartdata_new[date] = occurence
		})

        setMultilinechartdata(linechartdata_new)

		// get article card data
        if (![null, undefined].includes(data.reverse()) && data.reverse().length !== 0) {
          var articlecard_data = data
            .reverse()
            .map((item, i) => (
              <ArticleCard
                keyid={i}
                title={item.Title}
                abstract={item.Abstract}
                citations={item.Citations}
                author={item.Author}
                category={item.Category}
                publishdate={item.PubYear}
                pubhouse={'Date Added: ' + item.DateAdded}
                url={item.Link}
                added={true}
              />
            ))
          setArticlecards(articlecard_data)
        } else {
          setArticlecards(<NoDataSkeleton />)
        }
      })
    } catch (err) { console.log("errored out at archive:" + err) }
  }, [])

  return (
    <React.Fragment>
      <Grid container style={{ paddingLeft: '2%', paddingTop: '1%' }}>
        <Grid
          container
          align="left"
          direction="row"
          style={{ fontSize: '1.3vw', color: 'grey', paddingBottom: '0.5%' }}>
          <Grid item xs={4}>
            {![undefined, null].includes(savedarticles) ? savedarticles.length : null}{' '}
            Saved Queries
          </Grid>
          <Grid item xs={6} style={{ marginLeft: '10%', fontSize: '1vw' }}>
            {![undefined, null].includes(savedarticles) ? (
              savedarticles.length !== 0 ?
                <button className={researchStyles.sortbutton} onClick={handleSort}>
                  <Grid container justifyContent="center"
                    align="center"
                    direction="row">
                    <Grid item xs={8} style={{ marginTop: '3%' }}>
                      Sort by date
                    </Grid>
                    <Grid item xs={2}>
                      <SortIcon style={{ transform: 'scale(0.8)' }} />
                    </Grid>
                    <Grid item xs={2}>
                      {datesort ? <ArrowDownwardIcon style={{ transform: 'scale(0.8)' }} /> : <ArrowUpwardIcon style={{ transform: 'scale(0.8)' }} />}
                    </Grid>
                  </Grid>
                </button> : null) : null}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={7} style={{ paddingRight: '2%' }}>
            {articlecards}
          </Grid>
          <Grid item xs={5}>
            <Tabs>
              <TabList style={{ fontSize: '0.8vw', color: 'grey' }}>
                <Tab> Read Statistics </Tab>
                <Tab> Read by Category </Tab>
              </TabList>
              <TabPanel>
                <Grid container style={{
                  borderBottom: '1px solid #efeded',
                  color: 'grey'
                }}>
                  <Grid item xs={12} style={{ paddingBottom: '1%' }}>
                    Saved Queries Over Time
                  </Grid>
                </Grid>
                <Grid container>
                  <MultiLineChart
                    dot={false}
                    height={250}
                    color={'black'}
                    interval={4}
                    xaxisname={'Date'}
                    data={multilinechartdata} />
                </Grid>
                <Grid container style={{
                  borderBottom: '1px solid #efeded',
                  color: 'grey'
                }}>
                  <Grid item xs={12} style={{ paddingBottom: '1%' }}>
                    Categorical Breakdown
                  </Grid>
                </Grid>
                <Grid
                  container
                  style={{
                    minHeight: '250px', paddingTop: '5%'
                  }}>
                  <GroupedBarChart
                    width={'100%'}
                    height={![null, undefined].includes(groupedbarchartdata.length) &&
                      ![0, undefined].includes(groupedbarchartdata.length) ? 40 + groupedbarchartdata.length * 30 : 100}
                    groupedbarchartdata={
                      ![null, undefined].includes(groupedbarchartdata.length) &&
                        ![0, undefined].includes(groupedbarchartdata.length)
                        ? groupedbarchartdata
                        : null
                    } />
					{/* {console.log("Successful groupedbarchart")} */}
                </Grid>
              </TabPanel>
              <TabPanel>
                {![undefined, null].includes(categorylist) && categorylist.length !== 0 ? (
                  <Tabs>
                    <TabList style={{ fontSize: '0.8vw', color: 'grey' }}>
                      {categorylist.map(category => (
                        <Tab>{category}</Tab>
                      ))}
                    </TabList>

                    {categorylist.map(category => (
                      <TabPanel>
                        {articlecards !== undefined
                          ? articlecards.filter((e, i) =>
                            articlecards
                              .map(item => item.props)
                              .filter(element => element.category.includes(category))
                              .map(subelement => subelement.keyid)
                              .includes(i)
                          )
                          : null}
                      </TabPanel>
                    ))}
                  </Tabs>
                ) : (
                  <Grid
                    container
                    style={{
                      minHeight: '500px'
                    }}>
                    <NoDataSkeleton />
                  </Grid>
                )}
              </TabPanel>
            </Tabs>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
