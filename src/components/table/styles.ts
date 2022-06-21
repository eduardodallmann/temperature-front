import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {LineSeverity} from './types';

const lineSeverityToColor = (severity?: LineSeverity) => {
  switch (severity) {
    case LineSeverity.TITLE:
      return 'rgba(99, 200, 86, 0.25)';
    case LineSeverity.WARN:
      return '#FFEAEA';
    case LineSeverity.ERROR:
      return 'rgba(255, 191, 191, 0.64)';

    default:
      return '#f2f2f2';
  }
};

const ellipsis = css`
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const LineStyled = styled.div<{
  severity?: LineSeverity;
  $ellipsis?: boolean;
}>`
  display: flex;
  background-color: ${({severity}) => lineSeverityToColor(severity)};
  height: 30px;
  border-radius: 10px;

  > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 0;

    ${({$ellipsis}) => ($ellipsis ? ellipsis : '')}
  }
`;

export const TableStyled = styled.div`
  > div {
    margin-bottom: 8px;
  }
`;
