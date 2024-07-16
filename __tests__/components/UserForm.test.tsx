import UserForm from '@/components/UserForm'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
const renderComponent = () => {
    const user = userEvent.setup();
    const onUserAdd = jest.fn();
    render(<UserForm onUserAdd={onUserAdd} />)

    return {
        onUserAdd, user,
        nameInput: screen.getByRole('textbox', { name: /name/i }),
        emailInput: screen.getByRole('textbox', { name: /email/i }),
        submitBtn: screen.getByRole('button', { name: /submit/i })
    }
}
test('it should render heading with 2 inputs and submit button', () => {
    const { nameInput, emailInput, submitBtn } = renderComponent();
    const heading = screen.getByRole('heading', { name: /add a user/i });
    expect(heading).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
})

test('it should render the right value when user type in 2 inputs', async () => {
    const { user, nameInput, emailInput } = renderComponent();
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    await user.type(nameInput, 'mtk');
    await user.type(emailInput, 'mtk@gmail.com');
    expect(nameInput).toHaveValue('mtk');
    expect(emailInput).toHaveValue('mtk@gmail.com');
})

test('it should call the onUserAdd function with correct params when user click submit button', async () => {
    const { user, nameInput, emailInput, submitBtn, onUserAdd } = renderComponent();
    await user.type(nameInput, 'mtk');
    await user.type(emailInput, 'mtk@gmail.com');
    await user.click(submitBtn);
    expect(onUserAdd).toHaveBeenCalled();
    expect(onUserAdd).toHaveBeenCalledWith({ name: 'mtk', email: 'mtk@gmail.com' })

})

test('the 2 inputs should be clear when user click submit button', async () => {
    const { user, nameInput, emailInput, submitBtn } = renderComponent();
    await user.type(nameInput, 'mtk');
    await user.type(emailInput, 'mtk@gmail.com');
    await user.click(submitBtn);
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('')
})