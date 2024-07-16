import HomePage from '@/app/page'
import { User } from '@/components/UserLists';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

const dummy: User[] = [
    { name: 'abc', email: 'abc@gmail.com' },
    { name: 'mtk', email: 'mtk@gmail.com' }
]
test('it should render a new added row to userlists when user type 2 inputs and click submit button ', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const trs = screen.getAllByRole('row');
    expect(trs).toHaveLength(1);
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.type(nameInput, dummy[0].name);
    await user.type(emailInput, dummy[0].email);
    await user.click(submitButton);
    await waitFor(() => {
        const trLen = screen.getAllByRole('row');
        expect(trLen).toHaveLength(2);
    });
    await user.type(nameInput, dummy[1].name);
    await user.type(emailInput, dummy[1].email);
    await user.click(submitButton);
    await waitFor(() => {
        const trLen = screen.getAllByRole('row');
        expect(trLen).toHaveLength(3);
    });
    dummy.forEach((user) => {
        expect(screen.getByRole('cell', { name: user.name })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: user.email })).toBeInTheDocument();
    })
})