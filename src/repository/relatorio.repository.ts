import { Injectable } from "@nestjs/common";
import { Prisma } from "../../prisma/prisma.service"
import { subMonths } from "date-fns"

@Injectable()
export class RelatorioRepository {

    gastoMensalByCategoria(idUser: number, idCategoria: number) {
        return Prisma.gastos.findMany({
            select: {
                descricao: true,
                valor: true,
                categoriaGasto: {
                    select: {
                        nome: true
                    }
                }
            },
            where: {
                dataCompra: {
                    gte: subMonths(new Date(), 1),
                    lt: new Date(), 
                },
                idCategoria: idCategoria
            }
        })
    }

    async relatorioMensal(idUser: number) {
        return Prisma.$queryRaw`
    WITH  gastosUser AS (
  SELECT gg.nome, g.valor
  FROM "gastos" g
  JOIN "categoriaGasto" gg
  ON g."idCategoria" = gg."idCategoria"
  WHERE g."idUser" = ${idUser}
)

SELECT nome AS categoria, SUM(valor) AS total
FROM gastosUser
GROUP BY(nome)
ORDER BY total DESC
  `;
}
}