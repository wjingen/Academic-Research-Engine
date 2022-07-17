import React from 'react'
import NoDataSkeleton from '../../skeleton/nodataskeleton'
import { Legend, BarChart, Tooltip, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Bar } from 'recharts'

export default function MultiLineChart(props) {
  // data : (13) [{...}, {...}, {...}, {...}, ..., {...}]
  // {year: 2000, science: 1000}, ... // declare the keys here
  const dot = props.dot
  const interval = [undefined, null].includes(props.interval) ? 1 : props.interval
  const width = props.width
  const height = props.height
  const xaxisname = props.xaxisname
  const color = props.color
  const percentagetype =
    props.percentagetype !== undefined && props.percentagetype !== null
      ? props.percentagetype
      : false
  const data = props.data

  const handleData = (data) => {
    var res = []
    if (percentagetype) {
      var totalDocuments = 0
      // Calculate percentages
      Object.values(data).map((value) => {
        if (Number.isInteger(value)) {
          totalDocuments += value
        }}
      )
      Object.entries(data).map(([key, value]) => {
        var entry = {}
        var pct = Math.round((value / totalDocuments) * 100 * 100) / 100
        entry[xaxisname] = key
        entry["Documents Created"] = pct
        res.push(entry)
      })
    } else {
      // Calculate absolute values
      Object.entries(data).map(([key, value]) => {
        var entry = {}
        entry[xaxisname] = key
        entry["Documents Created"] = value
        res.push(entry)
      })
    }
    return res
  }

  return (   
    <React.Fragment>
      {data !== null && data !== undefined && data.length !== 0 ?
      <ResponsiveContainer width={width} height={height}>
        <BarChart width={1800} height={500} data={handleData(data)}
          layout="horizontal" 
          >
          <CartesianGrid strokeDasharray="10 10" />
            <XAxis
                dataKey={xaxisname}
                label={xaxisname}
                height={70}
                />
            <YAxis 
              padding={{ top: 20 }} 
              type="number"
              tickFormatter={value => (percentagetype ? value + '%' : value)}
              interval={1}
              />
            <Tooltip
              formatter={value => (percentagetype ? value + '%' : value)}
              wrapperStyle={{ fontSize: '0.9vw' }}
              />
            <Legend />
            <Bar dataKey="Documents Created" fill="#0645AD" />
        </BarChart>
      </ResponsiveContainer>
      :
      <NoDataSkeleton/>}

    </React.Fragment>       
  )
}
