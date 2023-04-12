import { render, screen, fireEvent } from "@testing-library/react"
import Modal from "../../app/components/Modal"

const mockButton = jest.fn();

describe('Testando Modal', () => {
    it('Deve ter título e descrição esperados', () => {
        render(<Modal isOpen={true} onRequestClose={() => { }} description="Descrição Teste" title="Teste"></Modal>)

        expect(screen.getByText('Teste')).toBeInTheDocument
        expect(screen.getByText('Descrição Teste')).toBeInTheDocument()
    })
    it('Deve chamar função adequadamente quando clicar em fechar', () => {
        render(<Modal isOpen={true} onRequestClose={mockButton} description="Descrição Teste" title="Teste"></Modal>)

        fireEvent.click(screen.getByText("Confirmar"));
        expect(mockButton).toHaveBeenCalled();
    })
})