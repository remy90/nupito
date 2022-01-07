import { Alert } from '@mui/material';
import styled from '@emotion/styled';

export const TemporaryAlert = styled(Alert)`
     animation:fadeout 1s 1;
    -webkit-animation:fadeout 1s 1;
    animation-fill-mode: forwards;
    animation-delay:9s;
    -webkit-animation-delay:9s; /* Safari and Chrome */
    -webkit-animation-fill-mode: forwards;
    @keyframes fadeout{
    from { opacity: 1; }
    to { opacity: 0; }
}

@-webkit-keyframes fadeout{
    from {opacity :1;}
    to {opacity :0;}
}
`;