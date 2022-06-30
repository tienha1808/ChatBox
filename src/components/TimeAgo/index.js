import React from 'react'
import { parseISO, formatDistanceToNowStrict } from 'date-fns'

function TimeAgo ({ timestamp }) {
    let timeAgo = ''
    if (timestamp) {
      const date = parseISO(timestamp)
      const timePeriod = formatDistanceToNowStrict(date)
      timeAgo = `${timePeriod} ago`
    }
  
    return (
      <div>
        &nbsp; {timeAgo}
      </div>
    )
}

export default TimeAgo