import { Colors, Menu } from '@blueprintjs/core';
import styled from 'styled-components';

export const NotificationWrapper = styled.div`
    border-radius: 2px;
    box-sizing: border-box;
    position: relative;
    color: ${Colors.GRAY4} !important;
    padding: 6px 7px;

    :hover {
        cursor: pointer;
        background: rgba(143, 153, 168, 0.15) !important;
    }
`;
export const NotificationWidget = styled.div`
    position: absolute;
    left: 0.571em;
    top: 0.214em;

    .HW_badge.HW_softHidden {
        background: transparent;
    }
`;
