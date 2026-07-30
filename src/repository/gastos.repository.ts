import { Injectable } from '@nestjs/common';
import { CreateGasto } from '../dto/create-gasto.dto';
import { Prisma } from '../../prisma/prisma.service';

@Injectable()
export class GastoRepository {
  registrarGasto(dto: CreateGasto) {
    return Prisma.gastos.create({
      data: dto,
    });
  }

  listarTodosGastosByIdUser(idUser: number) {
    return Prisma.gastos.findMany({
      where: {
        idUser: idUser,
      },
      orderBy: {
        dataCompra: 'desc',
      },
    });
  }

  excluirGasto(idUser: number, idGastos) {
    return Prisma.gastos.delete({
      where: {
        idGastos: idGastos,
        idUser: idUser,
      },
    });
  }

  ListarGastosPorMes(idUser: number, mes: string) {
    return Prisma.$queryRaw`
        SELECT "idGastos", "valor", "descricao", "dataCompra"
        FROM "gastos"
        WHERE TO_CHAR("dataCompra", 'YYYY-MM') LIKE ${mes + '%'}
        AND "idUser" = ${idUser}
        ORDER BY "dataCompra" DESC
    `;
  }

  findById(id: number) {
    return Prisma.gastos.findUnique({
      where: {
        idGastos: id,
      },
    });
  }

  listarGastosByCategoria(idCategoria: number, idUser: number) {
    return Prisma.gastos.findMany({
      select: {
        descricao: true,
        valor: true,
        dataCompra: true,
        categoriaGasto: {
          select: {
            nome: true,
          },
        },
      },
      where: {
        idCategoria: idCategoria,
      },
    });
  }
}
