import { LabelStyle, InputStyle } from 'components/App.styled';
import { useDispatch, useSelector } from "react-redux";
import { filterSet, getFilter } from "redux/filterSlice";

export const Filter = () => {
    const dispatch = useDispatch();
    const filterPhoneBook = useSelector(getFilter);

    const onChangeFilter = (event) => {
        const { value } = event.currentTarget;
        dispatch(filterSet(value))
    };
    
    return (
        <LabelStyle>
            Find contacts by name:
            <InputStyle
                type="text"
                name="filter"
                value={filterPhoneBook}
                title="Enter the name"
                required
                onChange={onChangeFilter}
            />
        </LabelStyle>
    );
};