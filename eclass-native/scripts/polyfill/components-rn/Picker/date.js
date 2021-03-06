import * as React from 'react';
import AntDatePicker from '@ant-design/react-native/lib/date-picker';
import { noop } from '../../utils';
function formatTimeStr(time = '') {
    let [year, month, day] = time.split('-');
    year = ~~year || 2000;
    month = ~~month || 1;
    day = ~~day || 1;
    return new Date(`${year}/${month}/${day}`);
}
export default class DateSelector extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            pValue: null,
            value: 0,
        };
        this.onChange = (date) => {
            const { fields = 'day', onChange = noop } = this.props;
            const yyyy = date.getFullYear() + '';
            const MM = ('0' + (date.getMonth() + 1)).slice(-2);
            const dd = ('0' + date.getDate()).slice(-2);
            let ret = yyyy;
            if (fields === 'month' || fields === 'day') {
                ret += `-${MM}`;
                if (fields === 'day') {
                    ret += `-${dd}`;
                }
            }
            onChange({
                detail: {
                    value: ret
                }
            });
        };
        this.onValueChange = (vals, index) => {
            this.setState({ value: new Date(`${vals[0]}/${~~vals[1] + 1}/${vals[2] || 1}`) });
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
        const { children, start, end, fields, disabled, } = this.props;
        const { value, } = this.state;
        let mode = 'date';
        if (fields === 'year') {
            mode = 'year';
        }
        else if (fields === 'month') {
            mode = 'month';
        }
        return (React.createElement(AntDatePicker, { mode: mode, value: value, minDate: formatTimeStr(start), maxDate: formatTimeStr(end), onChange: this.onChange, onValueChange: this.onValueChange, onDismiss: this.onDismiss, disabled: disabled }, children));
    }
}
DateSelector.defaultProps = {
    value: new Date(),
    fields: 'day',
};
