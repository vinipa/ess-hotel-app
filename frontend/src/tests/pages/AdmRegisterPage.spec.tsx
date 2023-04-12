import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import AdmRegisterPage from "../../app/pages/AdmRegister"

jest.mock("../../services/api/client", () => {
  return {
    APIClient: function () {
      return {
        createAdmUser: (data: any) => console.log("FUI")
      }
    },
  };
});

describe('Testing ADM Register Page', () => {

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should have all inputs needed in the page', () => {
    render(<AdmRegisterPage/>)

    const texts = [
      'INFORMAÇÕES PESSOAIS',
      'Nome Completo *',
      'Senha inicial *',
      'Email *',
      'Repetir senha inicial *',
      'Número de telefone *',
      'CPF *',
      'ENDEREÇO',
      'Estado *',
      'Rua *',
      'Cidade *',
      'Complemento *',
      'Bairro *',
      'Referência *',
      'Cadastrar Administrador'
    ]

    for(const text of texts) {
      expect(screen.getByText(text)).toBeInTheDocument()
    }
  })

  it('should show a modal with message of missing field when there is a missing field', async () => {
    render(<AdmRegisterPage/>)
    fireEvent.click(screen.getByText("Cadastrar Administrador"));
    await waitFor(() => {
      expect(screen.getByText('Campo não preenchido')).toBeInTheDocument();
    });
    expect(screen.getByText('Preencha o campo Nome completo')).toBeInTheDocument();
  })

  it('should show a modal with success the register is successfull', async () => {
    render(<AdmRegisterPage/>)

    const nameTarget = screen.getByPlaceholderText("Joaquim Pinto");
    const emailTarget = screen.getByPlaceholderText("joca@email.com");
    const phoneTarget = screen.getByPlaceholderText("(81) 9 9999-9999");
    const passwordTarget = screen.getByPlaceholderText("*********");
    const rePasswordTarget = screen.getByPlaceholderText("**********");
    const cpfTarget = screen.getByPlaceholderText("123.123.123-12");
    const stateTarget = screen.getByPlaceholderText("Pernambuco");
    const cityTarget = screen.getByPlaceholderText("Recife");
    const neighborhoodTarget = screen.getByPlaceholderText("Boa Viagem");
    const streetTarget = screen.getByPlaceholderText("Rua das alamedas");
    const complementTarget = screen.getByPlaceholderText("N 123, Apto 101");
    const referenceTarget = screen.getByPlaceholderText("Próximo a padaria Doce Pão");


    fireEvent.change(nameTarget, { target: { value: 'Joaquim' } });
    fireEvent.change(emailTarget, { target: { value: 'joca@email.com' } });
    fireEvent.change(phoneTarget, { target: { value: '(81) 9 9999-9999' } });
    fireEvent.change(passwordTarget, { target: { value: '1234' } });
    fireEvent.change(rePasswordTarget, { target: { value: '1234' } });
    fireEvent.change(cpfTarget, { target: { value: '123.123.123-12' } });
    fireEvent.change(stateTarget, { target: { value: 'Pernambuco' } });
    fireEvent.change(cityTarget, { target: { value: 'Recife' } });
    fireEvent.change(neighborhoodTarget, { target: { value: 'Boa Viagem' } });
    fireEvent.change(streetTarget, { target: { value: 'Rua das alamedas' } });
    fireEvent.change(complementTarget, { target: { value: 'N 123, Apto 101' } });
    fireEvent.change(referenceTarget, { target: { value: 'Próximo a padaria Doce Pão' } });

    fireEvent.click(screen.getByText("Cadastrar Administrador"));
    await waitFor(() => {
      expect(screen.getByText('Cadastro realizado')).toBeInTheDocument();
    });
    expect(screen.getByText('O usuário foi cadastrado com sucesso!')).toBeInTheDocument();
  })

  it('should show a error modal if passwords does not match', async () => {
    render(<AdmRegisterPage/>)

    const nameTarget = screen.getByPlaceholderText("Joaquim Pinto");
    const emailTarget = screen.getByPlaceholderText("joca@email.com");
    const phoneTarget = screen.getByPlaceholderText("(81) 9 9999-9999");
    const passwordTarget = screen.getByPlaceholderText("*********");
    const rePasswordTarget = screen.getByPlaceholderText("**********");
    const cpfTarget = screen.getByPlaceholderText("123.123.123-12");
    const stateTarget = screen.getByPlaceholderText("Pernambuco");
    const cityTarget = screen.getByPlaceholderText("Recife");
    const neighborhoodTarget = screen.getByPlaceholderText("Boa Viagem");
    const streetTarget = screen.getByPlaceholderText("Rua das alamedas");
    const complementTarget = screen.getByPlaceholderText("N 123, Apto 101");
    const referenceTarget = screen.getByPlaceholderText("Próximo a padaria Doce Pão");


    fireEvent.change(nameTarget, { target: { value: 'Joaquim' } });
    fireEvent.change(emailTarget, { target: { value: 'joca@email.com' } });
    fireEvent.change(phoneTarget, { target: { value: '(81) 9 9999-9999' } });
    fireEvent.change(passwordTarget, { target: { value: '12345' } });
    fireEvent.change(rePasswordTarget, { target: { value: '1234' } });
    fireEvent.change(cpfTarget, { target: { value: '123.123.123-12' } });
    fireEvent.change(stateTarget, { target: { value: 'Pernambuco' } });
    fireEvent.change(cityTarget, { target: { value: 'Recife' } });
    fireEvent.change(neighborhoodTarget, { target: { value: 'Boa Viagem' } });
    fireEvent.change(streetTarget, { target: { value: 'Rua das alamedas' } });
    fireEvent.change(complementTarget, { target: { value: 'N 123, Apto 101' } });
    fireEvent.change(referenceTarget, { target: { value: 'Próximo a padaria Doce Pão' } });

    fireEvent.click(screen.getByText("Cadastrar Administrador"));
    await waitFor(() => {
      expect(screen.getByText('Senhas difeentes')).toBeInTheDocument();
    });
    expect(screen.getByText('Por favor, repita as senhas igualmente')).toBeInTheDocument();
  })
})