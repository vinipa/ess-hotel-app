import {render, screen, fireEvent, act, waitFor} from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import {ReservationForm} from "."

  
const formData ={
    "name": "Minha casa",
    "city": "Recife",
    "street": "av boa viagem",
    "streetNumber": 32,
    "cep": "23415678",
    "additionalInfo": "MASSA DEMAIS",
    "guests": 8,
    "budget": 219.12,
    "bedrooms":2,
    "beds":4,
    "bathrooms" : 3,
    "Check-in"  :"2023-04-11",
    "Check-out": "2023-04-20",
}


describe("ReservationForm", () => {


    it("should render correctly", async ()=>{
        
        render(<ReservationForm/>)

        await act(async () => {
            const elements = ["Título","Cidade","Rua","Número","CEP","Descrição","Quantidade de hóspedes","Preço da diária","Quartos","Camas","Banheiros","Check-in","Check-out","Enviar"]
            elements.forEach((element) => {
                expect(screen.getByText(element)).toBeInTheDocument();
            });
        });
    })
       
    it("Should submit the form when hits the button if all fields were answered", async ()=>{
        render(<ReservationForm  />)
      
        const elements = [
          { field: "Título", value: "Minha casa na praia" },
          { field: "Cidade", value: "Florianópolis" },
          { field: "Rua", value: "Rua das Flores" },
          { field: "Número", value: 123 },
          { field: "CEP", value: "88000-000" },
          { field: "Descrição", value: "Casa aconchegante com vista para o mar" },
          { field: "Quantidade de hóspedes", value: 4 },
          { field: "Preço da diária", value: 200.32 },
          { field: "Quartos", value: 2 },
          { field: "Camas", value: 3 },
          { field: "Banheiros", value: 2 },
          { field: "Check-in", value: "2023-04-10" },
          { field: "Check-out", value: "2023-04-15" },
        ];
        
        await act(async () => {
            elements.map(({ field, value }) => {
                const inputElement = screen.getByLabelText(new RegExp(field, 'i'));
                expect(inputElement).toBeInTheDocument();
                const stringValue = String(value)
                userEvent.type(inputElement, stringValue);
                expect(inputElement).toHaveValue()
                
            });
            const submitButton = screen.getByRole("button", { name: /enviar/i });
            userEvent.click(submitButton);    
        }) 
            
    });
       

    
 
    it("Submit button should not work, all fields must be answered", async ()=>{
        render(<ReservationForm/>)


        const elementos = [
            { field: "Título", value: ""},
            { field: "Cidade", value: "" },
            { field: "Rua", value: "" },
            { field: "Número", value: "123" },
            { field: "CEP", value: "" },
            { field: "Descrição", value: "Casa aconchegante com vista para o mar" },
            { field: "Quantidade de hóspedes", value: 4 },
            { field: "Preço da diária", value: 200.32 },
            { field: "Quartos", value: 2 },
            { field: "Camas", value: 3 },
            { field: "Banheiros", value: 2 },
            { field: "Check-in", value: "" },
            { field: "Check-out", value: "" }
          ];

        await act(async () => {
            elementos.map(({ field, value }) => {
                const inputElement = screen.getByText(new RegExp(field, 'i'));
                expect(inputElement).toBeInTheDocument();
                const stringValued = String(value)
                userEvent.type(inputElement, stringValued);
            });
        });
        const submitButton = screen.getByRole('button', { name: /Enviar/i })
        userEvent.click(submitButton);

        const erros = ["Um nome para a reserva é obrigatório","A cidade é obrigatória","O nome da rua é obrigatório","O cep é obrigatório","A data de check-in é obrigatória","A data de check-out é obrigatória" ]
        erros.forEach(erro => {
            expect(screen.getByText(erro))
        });

        
        

    })

    it("Form not submitted, data type erros", async ()=>{
        render(<ReservationForm/>)


        const elementos = [
            { field: "Título", value: "Casa massa"},
            { field: "Cidade", value: "Ilheus" },
            { field: "Rua", value: "Boa viagem" },
            { field: "Número", value: "abc" },
            { field: "CEP", value: "casas" },
            { field: "Descrição", value: "Casa aconchegante com vista para o mar" },
            { field: "Quantidade de hóspedes", value: "nove" },
            { field: "Preço da diária", value: "duzentos" },
            { field: "Quartos", value: "tres" },
            { field: "Camas", value: "nove" },
            { field: "Banheiros", value: "sete" },
            { field: "Check-in", value: "2023-04-10" },
            { field: "Check-out", value: "2023-04-15" },
          ];

        await act(async () => {
            elementos.map(({ field, value }) => {
                const inputElement = screen.getByText(new RegExp(field, 'i'));
                expect(inputElement).toBeInTheDocument();
                const stringValued = String(value)
                userEvent.type(inputElement, stringValued);
            });
        });
        const submitButton = screen.getByRole('button', { name: /Enviar/i })
        userEvent.click(submitButton);

        const erros = ["Digite o número do endereço","Digite um número válido de CEP","O número do local deve ser um número",
        "A quantidade de hóspedes deve ser um número","A quantidade de hóspedes deve ser um número","A quantidade de camas deve ser um número",
        "A quantidade de banheiros deve ser um número"]

        erros.forEach(erro => {
            expect(screen.getByText(erro)).toBeInTheDocument();
        });

        
        

    })


    

    
})