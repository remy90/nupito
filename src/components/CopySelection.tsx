import type React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';

export const CopySelection = ({copyText}: ({copyText: string})) => {
  const [showIsCopied, setIsCopied] = useState<boolean>(false);

  const handleClick = async () =>
  {
    await navigator.clipboard.writeText(copyText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (<>
    <ContentCopyIcon sx={{mx: '0.5rem'}} onClick={handleClick}/>
    {showIsCopied
      ? <span style={{fontSize: '1rem', paddingLeft: '0.4rem', paddingRight: '0.4rem', backgroundColor: '#7CBB7B', borderRadius: '1rem'}}>Copied</span>
      : <span style={{fontSize: '1rem', paddingLeft: '0.3rem', paddingRight: '0.3rem'}}>Copy</span>}
  </>);
};
