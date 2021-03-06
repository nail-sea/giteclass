import * as React from 'react';
import AntDatePicker from '@ant-design/react-native/lib/date-picker';
import { noop } from '../../utils';
function formatTimeStr(time = '') {
    const now = new Date();
    let [hour, minute] = time.split(':');
    hour = ~~hour;
    minute = ~~minute;
    now.setHours(hour, minute);
    return now;
}
export default class TimeSelector extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            pValue: null,
            value: 0,
        };
        this.onChange = (date) => {
            const { onChange = noop } = this.props;
            const hh = ('0' + date.getHours()).slice(-2);
            const mm = ('0' + date.getMinutes()).slice(-2);
            onChange({ detail: { value: `${hh}:${mm}` } });
        };
        this.onValueChange = (vals, index) => {
            const now = new Date();
            now.setHours(vals[0], vals[1]);
            this.setState({ value: now });
        };
        this.onDismiss = () => {
            const { onCancel = noop } = this.props;
            onCancel();
        };
    }
    static getDerivedStateFromProps(nextProps, lastState) {
        if (nextProps.value !== lastState.pValue) {
            const now = new Date();
            if (!nextProps.value || typeof nextProps.value !== 'string' || typeof lastState.value !== 'string') {
                return { value: lastState.value };
            }
            return { value: formatTimeStr(lastState.value) };
        }
        return null;
    }
    render() {
        const { children, start, end, disabled, } = this.props;
        const { value, } = this.state;
        return (React.createElement(AntDatePicker, { mode: 'time', value: value, minDate: formatTimeStr(start), maxDate: formatTimeStr(end), onChange: this.onChange, onValueChange: this.onValueChange, onDismiss: this.onDismiss, disabled: disabled }, children));
    }
}
TimeSelector.defaultProps = {
    value: new Date(),
};
