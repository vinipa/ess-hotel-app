import {render, screen, fireEvent, act, waitFor} from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import {ReservationForm} from "."


const mockConsolelog = jest.spyOn(console, 'log').mockImplementation();




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
          { field: "CEP", value: "88000000" },
          { field: "Descrição", value: "Casa aconchegante com vista para o mar" },
          { field: "Quantidade de hóspedes", value: 4 },
          { field: "Preço da diária", value: 200.32 },
          { field: "Quartos", value: 2 },
          { field: "Camas", value: 3 },
          { field: "Banheiros", value: 2 },
          { field: "Check-in", value: "2023-04-20" },
          { field: "Check-out", value: "2023-04-30" },
        ];
        
        await act(async () => {
            elements.map(({ field, value }) => {
                const inputElement = screen.getByLabelText(new RegExp(field, 'i'));
                expect(inputElement).toBeInTheDocument();
                const stringValue = String(value)
                userEvent.type(inputElement, stringValue);
                expect(inputElement).toHaveValue()
                
            });
            const submitButton = screen.getByRole("button", { name: /Enviar/i });
            userEvent.click(submitButton);    
        }) 
        await waitFor(() => expect(mockConsolelog).toHaveBeenCalledWith("Formulário Submetido"));
        mockConsolelog.mockRestore();

        
            
    });
       

    
 
    it("Form was not submitted, all fields must be answered", async ()=>{
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
            expect(screen.getByText(erro)).toBeInTheDocument()
        });

        expect(mockConsolelog).not.toHaveBeenCalledWith("Formulário Submetido")
        mockConsolelog.mockRestore();

    })

    it("Form was not submitted, Check-in date cannot be in the past and Check-out must be after Check-in", async () =>{
        render(<ReservationForm/>)

        const elements = [
            { field: "Título", value: "Minha casa na praia" },
            { field: "Cidade", value: "Florianópolis" },
            { field: "Rua", value: "Rua das Flores" },
            { field: "Número", value: 123 },
            { field: "CEP", value: "88000000" },
            { field: "Descrição", value: "Casa aconchegante com vista para o mar" },
            { field: "Quantidade de hóspedes", value: 4 },
            { field: "Preço da diária", value: 200.32 },
            { field: "Quartos", value: 2 },
            { field: "Camas", value: 3 },
            { field: "Banheiros", value: 2 },
            { field: "Check-in", value: "2020-04-20" },
            { field: "Check-out", value: "2020-02-01" },
        ];
        
        await act(async () => {
            elements.map(({ field, value }) => {
                const inputElement = screen.getByText(new RegExp(field, 'i'));
                expect(inputElement).toBeInTheDocument();
                const stringValued = String(value)
                userEvent.type(inputElement, stringValued);
            });
        });

        const submitButton = screen.getByRole('button', { name: /Enviar/i })
        userEvent.click(submitButton);
        
        const erros = ["A data de check-in não pode ser no passado"]
        erros.forEach(erro => {
            expect(screen.getByText(erro)).toBeInTheDocument()
        });


        expect(mockConsolelog).not.toHaveBeenCalledWith("Formulário Submetido")
        mockConsolelog.mockRestore();

    })


    

    
})