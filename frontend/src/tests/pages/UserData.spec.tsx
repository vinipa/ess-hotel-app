import { render, screen } from "@testing-library/react"
import UserData from "../../app/pages/UserData";

describe('User data page test suite', () => {
  it('should show mocked user data', () => {

    render(<UserData></UserData>)

    expect(screen.getByText('Tipo de usuario:')).toBeInTheDocument()

  })
})