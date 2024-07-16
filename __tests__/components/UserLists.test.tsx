import UserLists, { User } from '@/components/UserLists'
import { render, screen } from '@testing-library/react'

const dummy: User[] = [{ name: 'Mosh', email: 'mosh@gmail.com' }, { name: 'mtk', email: 'mtk@gmail.com' }]
const renderComponent = () => {
    render(<UserLists users={[]} />)
}
test('it should render heading with 1 row and No users text by default', () => {
    renderComponent();
    const heading = screen.getByRole('heading', { name: /list of users/i });
    const trs = screen.getAllByRole('row');
    const noUsers = screen.getByText(/no users/i)
    expect(heading).toBeInTheDocument();
    expect(trs).toHaveLength(1);
    expect(noUsers).toBeInTheDocument();
})

test('it should render the correct name and email for each row when users(props) is provided', () => {
    render(<UserLists users={dummy} />)
    const trs = screen.getAllByRole('row');
    expect(trs).toHaveLength(dummy.length + 1);
    dummy.forEach((user) => {
        expect(screen.getByRole('cell', { name: user.name })).toBeInTheDocument()
        expect(screen.getByRole('cell', { name: user.email })).toBeInTheDocument()
    })
})

