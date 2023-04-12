import { render, screen } from "@testing-library/react"
import CustomButton from "../../app/components/CustomButton"

describe('Testing CustomButton', () => {
  it('should be 2', () => {
    render(<CustomButton onClick={() => {}} title="Teste"></CustomButton>)

    expect(screen.getByText('Teste')).toBeInTheDocument()
  })
})