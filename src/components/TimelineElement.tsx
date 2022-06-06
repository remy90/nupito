import React from 'react';
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';

export const TimelineElement = ({name, isLast = false}: ({name: string | JSX.Element, isLast?: boolean})) =>
  <TimelineItem>
    { !isLast
      ? <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      : <TimelineDot />
    }
    <TimelineContent>{name}</TimelineContent>
  </TimelineItem>
;