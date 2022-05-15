import type React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const CopySelection = ({copyText}: ({copyText: string})) => {
  const handleClick = async () =>
    await navigator.clipboard.writeText(copyText);

  return (<ContentCopyIcon sx={{mx: '0.5rem'}} onClick={handleClick}/>);
};
