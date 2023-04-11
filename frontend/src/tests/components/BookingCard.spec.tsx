import { render, fireEvent } from '@testing-library/react';
import BookingCard from '../../app/components/BookingCard';

describe('BookingCard', () => {
    it('calls radioHandler when radio button is clicked', () => {
        const radioHandler = jest.fn();
        const { getByLabelText } = render(
            <BookingCard guestNumber={1} radioHandler={radioHandler} setMinusIcon={() => { }} setPlusIcon={() => { }} />
        );

        fireEvent.click(getByLabelText('Pix'));

        expect(radioHandler).toHaveBeenCalled();
    });

    it('calls setPlusIcon when plus icon is clicked', () => {
        const setPlusIcon = jest.fn();
        const { getByTestId } = render(
            <BookingCard guestNumber={1} radioHandler={() => { }} setMinusIcon={() => { }} setPlusIcon={setPlusIcon} />
        );

        fireEvent.click(getByTestId('plus-icon'));

        expect(setPlusIcon).toHaveBeenCalled();
    });

    it('calls setMinusIcon when minus icon is clicked', () => {
        const setMinusIcon = jest.fn();
        const { getByTestId } = render(
            <BookingCard guestNumber={1} radioHandler={() => { }} setMinusIcon={setMinusIcon} setPlusIcon={() => { }} />
        );

        fireEvent.click(getByTestId('minus-icon'));

        expect(setMinusIcon).toHaveBeenCalled();
    });
});