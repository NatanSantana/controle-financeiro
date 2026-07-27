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
    SELECT 
      CASE
        WHEN gg."nome" IS NULL THEN 'outros' ELSE gg."nome"::text END AS categoria,
      SUM(g.valor)::float AS total
    FROM "gastos" g
    LEFT JOIN "categoriaGasto" gg ON g."idCategoria" = gg."idCategoria"
    GROUP BY gg.nome
    ORDER BY total DESC
  `;
}
}