import {LoadingButton as LabLoadingButton} from '@mui/lab';
import styled from '@mui/material/styles/styled';

const LoadingButton = styled(LabLoadingButton)`
  padding: 0.6rem 0;
  background-color: #f9d13e;
  color: #2363eb;
  font-weight: 500;

  &:hover: {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`;

export default LoadingButton;
