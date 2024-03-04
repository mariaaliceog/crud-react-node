import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (_: Request, res: Response<any, Record<string, any>>): Promise<any> => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao buscar usuários: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const addUser = async (req: Request, res: Response<any, Record<string, any>>): Promise<any> => {
    try {
        const newUser = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                birthDate: req.body.birthDate
            }
        });
        return res.status(200).json("Usuário criado com sucesso!");
    } catch (error) {
        console.error("Erro ao cadastrar o usuário: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const updateUser = async (req: Request, res: Response<any, Record<string, any>>): Promise<any> => {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                birthDate: req.body.birthDate
            }
        });
        return res.status(200).json("Usuário atualizado com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar o usuário: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteUser = async (req: Request, res: Response<any, Record<string, any>>): Promise<any> => {
    try {
        await prisma.user.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(200).json("Usuário deletado com sucesso!");
    } catch (error) {
        console.error("Erro ao deletar usuário: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};