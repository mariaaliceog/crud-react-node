require('dotenv').config();
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
`;	

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit}) => {
    const ref = useRef();

    useEffect(() => {
        if(onEdit){
            const user = ref.current;
            user.name.value = onEdit.name;
            user.email.value = onEdit.email;
            user.phone.value = onEdit.phone;
            user.birthDate.value = onEdit.birthDate;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if(
            !user.name.value ||
            !user.email.value ||
            !user.phone.value ||
            !user.birthDate.value
        ){
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit){
            await axios
            .put(`${process.env.API_BASE_URL}`+ onEdit.id, {
                name: user.name.value,
                email: user.email.value,
                phone: user.phone.value,
                birthDate: user.birthDate.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
            await axios
            .post(`${process.env.API_BASE_URL}`, {
                name: user.name.value,
                email: user.email.value,
                phone: user.phone.value,
                birthDate: user.birthDate.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }

        user.name.value ="";
        user.email.value ="";
        user.phone.value ="";
        user.birthDate.value ="";

        setOnEdit(null); //limpa o estado de edição e possibilita a adição de novos usuários
        getUsers();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="name"/>
            </InputArea>
            <InputArea>
                <Label>E-mail</Label>
                <Input name="email" type="email"/>
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="phone"/>
            </InputArea>
            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name="birthDate" type="date"/>
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );

};
export default Form;